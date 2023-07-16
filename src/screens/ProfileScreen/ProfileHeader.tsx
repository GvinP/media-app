import {View, Text} from 'react-native';
import {FC} from 'react';
import styles from './styles';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {ProfileNavigationProp} from '../../types/navigation';
import {User} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

interface IProfileHeader {
  user: User;
}

const ProfileHeader: FC<IProfileHeader> = ({user}) => {
  const {userId} = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();
  navigation.setOptions({title: user?.username || 'Profile'});
  const navigateToEditProfile = () => navigation.navigate('Edit Profile');
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <UserAvatar photoKey={user.image} style={styles.avatar} />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user?.nofPosts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user?.nofFollowers}</Text>
          <Text>Folowers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user?.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{user?.name}</Text>
      <Text>{user?.bio}</Text>
      {user.id === userId && (
        <View style={styles.row}>
          <Button title="Edit Profile" onPress={navigateToEditProfile} />
          <Button title="Sign out" onPress={() => Auth.signOut()} />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
