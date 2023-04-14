import {Image, View} from 'react-native';
import React, {FC} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import {Post} from '../../API';

interface IFeedGridItem {
  post: Post;
}

const FeedGridItem: FC<IFeedGridItem> = ({post}) => {
  return (
    <View style={{flex: 1, aspectRatio: 1, padding: 1, maxWidth: '33.33%'}}>
      <Image source={{uri: post.image || post.images?.[0]}} style={{flex: 1}} />
      {!!post.images?.length && (
        <MaterialIcons
          name="collections"
          size={16}
          color={colors.white}
          style={{position: 'absolute', top: 5, right: 5}}
        />
      )}
    </View>
  );
};

export default FeedGridItem;
