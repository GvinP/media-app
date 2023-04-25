import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FC} from 'react';
import {User} from '../../API';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {UserProfileNavigationProp} from '../../types/navigation';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

interface IUserListItem {
  user: User;
}

const UserListItem: FC<IUserListItem> = ({user}) => {
  const navigation = useNavigation<UserProfileNavigationProp>();

  const goToUserScreen = () =>
    navigation.navigate('UserProfile', {userId: user?.id});
  return (
    <Pressable style={styles.container} onPress={goToUserScreen}>
      <UserAvatar photoKey={user.image} style={styles.image} />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: fonts.weight.bold,
    marginBottom: 5,
  },
  username: {
    color: colors.grey,
  },
});
