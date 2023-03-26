import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';
import React, {useCallback, useState} from 'react';
import FeedPost from '../../components/FeedPost';

const posts = [
  {
    id: '5',
    createdAt: '19 December 2021',
    video:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
      username: 'vadimnotjustdev',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
    ],
  },
  {
    id: '1',
    createdAt: '19 December 2021',
    images: [
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
      username: 'vadimnotjustdev',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
    ],
  },
  {
    id: '2',
    createdAt: '19 December 2021',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
      username: 'vadimnotjustdev',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
    ],
  },
  {
    id: '3',
    createdAt: '19 December 2021',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg',
      username: 'vadimnotjustdev',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
    ],
  },
  {
    id: '4',
    createdAt: '19 December 2021',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg',
      username: 'vadimnotjustdev',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
        },
      },
    ],
  },
];

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
