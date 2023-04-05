import {View, Text, Image} from 'react-native';
import {FC} from 'react';
import styles from './styles';
import Button from '../../components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';

interface IProfileHeader {
  user: any;
}

const ProfileHeader: FC<IProfileHeader> = ({user}) => {
  const route = useRoute();
  const navigation = useNavigation();
  navigation.setOptions({title: route.params?.user.username});
  const navigateToEditProfile = () => navigation.navigate('EditProfile');
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={{uri: user.image}} style={styles.avatar} />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Folowers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button title="Edit Profile" onPress={navigateToEditProfile} />
        <Button title="Another Button" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ProfileHeader;
