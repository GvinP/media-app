import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import Comment from '../../components/Comment';
import Input from './Input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from '@apollo/client';
import {commentsByPost} from './queries';
import {
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
} from '../../API';
import {useRoute} from '@react-navigation/native';
import {CommentsRouteProp} from '../../types/navigation';

const CommentsScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;
  const {data, loading, error, fetchMore} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
    },
  });
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const comments = data?.commentsByPost?.items.filter(
    comment => !comment?._deleted,
  );

  const nextToken = data?.commentsByPost?.nextToken;

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
  };

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
    <View style={{flex: 1, paddingBottom: insets.bottom}}>
      <FlatList
        data={comments}
        renderItem={({item}) =>
          item && <Comment comment={item} includeDetails />
        }
        keyExtractor={item => `${item?.id}`}
        showsVerticalScrollIndicator={false}
        inverted
        style={{padding: 10}}
        onEndReached={loadMore}
      />
      <Input {...{postId}} />
    </View>
  );
};

export default CommentsScreen;
