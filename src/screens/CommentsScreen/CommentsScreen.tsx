import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React from 'react';
import Comment from '../../components/Comment';
import Input from './Input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from '@apollo/client';
import {commentsByPost} from './queries';
import {CommentsByPostQuery, CommentsByPostQueryVariables} from '../../API';
import {useRoute} from '@react-navigation/native';
import {CommentsRouteProp} from '../../types/navigation';

const CommentsScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;
  const {data, loading, error} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {variables: {postID: postId}});

  const comments = data?.commentsByPost?.items.filter(
    comment => !comment?._deleted,
  );

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
        style={{padding: 10}}
      />
      <Input {...{postId}} />
    </View>
  );
};

export default CommentsScreen;
