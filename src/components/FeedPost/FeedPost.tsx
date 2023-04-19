import {Image, Text, View} from 'react-native';
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
import useLikeService from '../../services/LikeService';
import dayjs from 'dayjs';

interface FeedPostProps {
  post: Post;
  isVisible: boolean;
}

const FeedPost: FC<FeedPostProps> = ({post, isVisible}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const navigation = useNavigation<FeedNavigationProp>();
  const postLikes = post.Likes?.items.filter(like => !like?._deleted) || [];
  const {userLike, toddleLike} = useLikeService(post);

  const toggleDescriptionExpanded = () =>
    setIsDescriptionExpanded(prev => !prev);

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
  const navigateToLikes = () =>
    navigation.navigate('PostLikes', {postId: post.id});
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
            name={userLike ? 'heart' : 'hearto'}
            size={24}
            style={styles.icon}
            color={userLike ? colors.accent : colors.black}
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
        {postLikes.length === 0 ? (
          <Text>Be the first to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )}
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
        <Text>{dayjs(post.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
