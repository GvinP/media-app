import {Alert, Image, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import styles from './styles';
import {FC, useState} from 'react';
import Comment from '../Comment';
import {Post} from '../../API';
import DoublePressable from '../DoublePressable/intex';
import Carusel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';
import {DEFAULT_USER_IMAGE} from '../../config';
import Menu from './Menu';

interface FeedPostProps {
  post: Post;
  isVisible: boolean;
}

const FeedPost: FC<FeedPostProps> = ({post, isVisible}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation<FeedNavigationProp>();
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
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toddleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }
  const navigateToUser = () =>
    post.User && navigation.navigate('UserProfile', {userId: post.User?.id});
  const navigateToComments = () =>
    //@ts-ignore
    navigation.navigate('Comments', {postId: post.id});
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image
          source={{uri: post.User?.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />
        <Text onPress={navigateToUser} style={styles.name}>
          {post.User?.username}
        </Text>
        <Menu post={post} />
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
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {post.Comments?.items.map(
          comment => comment && <Comment {...{comment}} key={comment?.id} />,
        )}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
