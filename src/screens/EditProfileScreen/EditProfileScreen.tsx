import {View, Text, Image} from 'react-native';
import {useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
import user from '../../assets/data/user.json';
import Input, {EditableUser} from './Input';
import {useState} from 'react';

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(user.image);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
    },
  });
  const onSubmit = (data: EditableUser) => console.log('submit', data);
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
  return (
    <View style={styles.container}>
      <Image source={{uri: selectedPhoto}} style={styles.avatar} />
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
        Submit
      </Text>
    </View>
  );
};

export default EditProfileScreen;
