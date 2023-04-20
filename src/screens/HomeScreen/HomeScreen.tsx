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
import {postsByDate} from './queries';
import {
  ModelSortDirection,
  PostsByDateQuery,
  PostsByDateQueryVariables,
} from '../../API';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const {data, loading, error, refetch, fetchMore} = useQuery<
    PostsByDateQuery,
    PostsByDateQueryVariables
  >(postsByDate, {
    variables: {type: 'POST', sortDirection: ModelSortDirection.DESC, limit: 2},
  });
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const posts = data?.postsByDate?.items.filter(post => !post?._deleted);
  const nextToken = data?.postsByDate?.nextToken;
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
        //@ts-ignore
        item && <FeedPost post={item} isVisible={activePostId === item.id} />
      }
      keyExtractor={item => `${item?.id}`}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      onRefresh={refetch}
      refreshing={loading}
      onEndReached={loadMore}
    />
  );
};

export default HomeScreen;
