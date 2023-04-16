import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FeedPost from '../../components/FeedPost';
import {useQuery} from '@apollo/client';
import {listPosts} from './queries';
import {ListPostsQuery, ListPostsQueryVariables} from '../../API';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const {data, loading, error, refetch} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);
  const posts = data?.listPosts?.items.filter(post => !post?._deleted);
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id || 0);
      }
    },
    [],
  );
  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !posts) {
    return (
      <View>
        <Text>{error?.message}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={posts}
      renderItem={({item}) =>
        item && <FeedPost post={item} isVisible={activePostId === item.id} />
      }
      keyExtractor={item => `${item?.id}`}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default HomeScreen;
