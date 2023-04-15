import {View, Text, Image, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
import Input, {EditableUser} from './Input';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {deleteUser, getUser, updateUser} from './queries';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useAuthContext} from '../../contexts/AuthContext';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i;

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const {userId, user: authUser} = useAuthContext();
  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId}},
  );
  const user = data?.getUser;
  const [selectedPhoto, setSelectedPhoto] = useState(user?.image);
  const {control, handleSubmit, setValue} = useForm<EditableUser>();
  const [doUpdateUser, {loading: updateLoading, error: updateError}] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);
  const [doDeleteUser, {loading: deleteLoading, error: deleteError}] =
    useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('bio', user.bio);
      setValue('website', user.website);
    }
  }, [user]);

  const onSubmit = (data: EditableUser) => {
    doUpdateUser({
      variables: {input: {id: userId, ...data, _version: user?._version}},
    });
    navigation.goBack();
  };
  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode) {
          setSelectedPhoto(assets?.[0].uri || '');
        }
      },
    );
  };

  const comfirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your user profile is permanent', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes delete', style: 'destructive', onPress: onDeleteUser},
    ]);
  };

  const onDeleteUser = () => {
    doDeleteUser({variables: {input: {id: userId, _version: user?._version}}});
    authUser?.deleteUser(err => {
      if (err) {
        console.log(err);
      }
      Auth.signOut();
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError || deleteError) {
    return (
      <View>
        <Text>
          {error?.message || updateError?.message || deleteError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: selectedPhoto || DEFAULT_USER_IMAGE}}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.button}>
        Change profile photo
      </Text>
      <Input
        name="name"
        label="Name"
        rules={{required: 'Name is required'}}
        {...{control}}
      />
      <Input
        name="username"
        label="Username"
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be more than 3 characters',
          },
        }}
        {...{control}}
      />
      <Input
        name="website"
        label="Website"
        rules={{
          pattern: {
            value: URL_REGEX,
            message: 'Invalid url',
          },
        }}
        {...{control}}
      />
      <Input
        name="bio"
        label="Bio"
        multiline
        rules={{
          maxLength: {
            value: 200,
            message: 'Bio should be less than 200 characters',
          },
        }}
        {...{control}}
      />
      <Text style={styles.button} onPress={handleSubmit(onSubmit)}>
        {updateLoading ? 'Submitting' : 'Submit'}
      </Text>
      <Text style={styles.buttonDelete} onPress={comfirmDelete}>
        {deleteLoading ? 'Deleting' : 'Delete user'}
      </Text>
    </View>
  );
};

export default EditProfileScreen;
