import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';
import React, {useCallback, useState} from 'react';
import FeedPost from '../../components/FeedPost';
import posts from '../../assets/data/posts.json';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
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
  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={activePostId === item.id} />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

export default HomeScreen;
