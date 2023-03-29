import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import user from '../../assets/data/user.json';
import Input from './Input';

const EditProfileScreen = () => {
  const onSubmit = () => console.log('submit');
  return (
    <View style={styles.container}>
      <Image source={{uri: user.image}} style={styles.avatar} />
      <Text style={styles.button}>Change profile photo</Text>
      <Input label="Name" />
      <Input label="Username" />
      <Input label="Website" />
      <Input label="Bio" multiline />
      <Text style={styles.button} onPress={onSubmit}>
        Submit
      </Text>
    </View>
  );
};

export default EditProfileScreen;
