import {View, Text, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
import Input, {EditableUser} from './Input';
import {useEffect, useState} from 'react';
import {useMutation, useQuery, useLazyQuery} from '@apollo/client';
import {deleteUser, getUser, updateUser, usersByUsername} from './queries';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth, Storage} from 'aws-amplify';
import {v4} from 'uuid';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

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
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const {control, handleSubmit, setValue} = useForm<EditableUser>();
  const [doUpdateUser, {loading: updateLoading, error: updateError}] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);
  const [doDeleteUser, {loading: deleteLoading, error: deleteError}] =
    useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);
  const [getUsersByUsername] = useLazyQuery<
    UsersByUsernameQuery,
    UsersByUsernameQueryVariables
  >(usersByUsername);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('bio', user.bio);
      setValue('website', user.website);
    }
  }, [user, setValue]);

  const uploadMedia = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];
      const s3Response = await Storage.put(`${v4()}.${extension}`, blob);
      return s3Response.key;
    } catch (error) {
      Alert.alert('Error uploading the photo', (error as Error).message);
    }
  };

  const onSubmit = async (data: EditableUser) => {
    let photoKey;
    if (selectedPhoto) {
      photoKey = await uploadMedia(selectedPhoto);
    }
    doUpdateUser({
      variables: {
        input: {id: userId, ...data, image: photoKey, _version: user?._version},
      },
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, assets}) => {
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

  const validateUsername = async (username: string) => {
    try {
      const response = await getUsersByUsername({variables: {username}});
      if (response.error) {
        Alert.alert('Failed to fetch username');
        return 'Failed to fetch username';
      }
      const users = response.data?.usersByUsername?.items;
      if (users && users.length > 0 && users[0]?.id !== userId) {
        return 'Username is already taken';
      }
    } catch (error) {
      Alert.alert('Failed to fetch username');
    }
    return true;
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
      <UserAvatar
        photoKey={user?.image}
        photoUri={selectedPhoto}
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
          validate: validateUsername,
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
