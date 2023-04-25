import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {FC, useState} from 'react';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {DEFAULT_USER_IMAGE} from '../../config';
import useCommentService from '../../services/CommentService/CommentService';

interface IInput {
  postId: string;
}

const Input: FC<IInput> = ({postId}) => {
  const [newComment, setNewComment] = useState('');
  const {onCreateComment} = useCommentService(postId);

  const onPost = async () => {
    onCreateComment(newComment);
    setNewComment('');
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: DEFAULT_USER_IMAGE,
        }}
        style={styles.image}
      />
      <TextInput
        placeholder="Write tour comment"
        style={styles.input}
        value={newComment}
        onChangeText={setNewComment}
        multiline
      />
      <Pressable onPress={onPost} style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </Pressable>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingRight: 50,
    marginLeft: 5,
  },
  button: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  buttonText: {
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.bold,
    textTransform: 'uppercase',
    color: colors.primary,
  },
});
