import {FC, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import {Comment as IComment} from '../../API';
import styles from './styles';
import dayjs from 'dayjs';
import UserAvatar from '../UserAvatar/UserAvatar';

interface CommentProps {
  comment: IComment;
  includeDetails?: boolean;
}

const Comment: FC<CommentProps> = ({comment, includeDetails = false}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => setIsLiked(prev => !prev);
  return (
    <View style={styles.comment}>
      {includeDetails && (
        <UserAvatar photoKey={comment.User?.image} style={styles.avatar} />
      )}
      <View style={styles.content}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>{' '}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {dayjs(comment.createdAt).fromNow()}
            </Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={10}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={14}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;
