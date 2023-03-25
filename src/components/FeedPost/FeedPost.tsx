import {Image, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import styles from './styles';
import {FC, useState} from 'react';
import Comment from '../Comment';
import {IPost} from '../../types/models';
import DoublePressable from '../DoublePressable/intex';
import Carusel from '../Carousel';

interface FeedPostProps {
  post: IPost;
}

const FeedPost: FC<FeedPostProps> = ({post}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const toggleDescriptionExpanded = () =>
    setIsDescriptionExpanded(prev => !prev);
  const toddleLike = () => setIsLiked(prev => !prev);
  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toddleLike}>
        <Image source={{uri: post.image}} style={styles.image} />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carusel images={post.images} onDoublePress={toddleLike} />;
  }
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image source={{uri: post.user.image}} style={styles.avatar} />
        <Text style={styles.name}>{post.user.username}</Text>
        <Entypo name="dots-three-horizontal" style={styles.threeDots} />
      </View>
      {content}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            size={24}
            style={styles.icon}
            color={isLiked ? colors.accent : colors.black}
            onPress={toddleLike}
          />
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>username</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>
        <Text>View all {post.nofComments} comments</Text>
        {post.comments.map(comment => (
          <Comment {...{comment}} key={comment.id} />
        ))}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
