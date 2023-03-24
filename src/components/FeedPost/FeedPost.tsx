import {Image, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import styles from './styles';
import {FC} from 'react';
import Comment from '../Comment';
import {IPost} from '../../types/models';

interface FeedPostProps {
  post: IPost;
}

const FeedPost: FC<FeedPostProps> = ({post}) => {
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image source={{uri: post.user.image}} style={styles.avatar} />
        <Text style={styles.name}>{post.user.username}</Text>
        <Entypo name="dots-three-horizontal" style={styles.threeDots} />
      </View>
      <Image source={{uri: post.image}} style={styles.image} />
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={false ? 'heart' : 'hearto'}
            size={24}
            style={styles.icon}
            color={colors.black}
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
        <Text style={styles.text}>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          {post.description}
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
