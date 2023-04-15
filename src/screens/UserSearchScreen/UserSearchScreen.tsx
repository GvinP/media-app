import {FlatList, Text, View} from 'react-native';
import UserListItem from './UserListItem';
import {useQuery} from '@apollo/client';
import {listUsers} from './queries';
import {ListUsersQuery, ListUsersQueryVariables} from '../../API';
import {ActivityIndicator} from 'react-native';

const UserSearchScreen = () => {
  const {data, loading, error, refetch} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);

  const users =
    data?.listUsers?.items.filter(user => user && !user._deleted) || [];

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={({item}) => item && <UserListItem user={item} />}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default UserSearchScreen;
