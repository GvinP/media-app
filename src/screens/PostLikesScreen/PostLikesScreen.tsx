import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {PostLikesRouteProp} from '../../types/navigation';
import {useQuery} from '@apollo/client';
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import {likesForPostByUser} from './queries';
import UserListItem from '../UserSearchScreen/UserListItem';

const PostLikesScreen = () => {
  const route = useRoute<PostLikesRouteProp>();
  const {data, loading, error, refetch} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: route.params.postId}});
  const likes = (data?.likesForPostByUser?.items || []).filter(
    like => !like?._deleted,
  );
  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View>
        <Text>{error?.message}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={likes}
      renderItem={({item}) =>
        item?.User ? <UserListItem user={item?.User} /> : null
      }
      keyExtractor={item => `${item?.id}`}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default PostLikesScreen;
