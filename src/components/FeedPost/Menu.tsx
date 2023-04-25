import {Text, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {FC} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import styles from './styles';
import colors from '../../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation} from '@apollo/client';
import {deletePost} from './queries';
import {DeletePostMutation, DeletePostMutationVariables, Post} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';
import {Storage} from 'aws-amplify';

interface IMenuComponent {
  post: Post;
}

const MenuComponent: FC<IMenuComponent> = ({post}) => {
  const navigation = useNavigation<FeedNavigationProp>();
  const insets = useSafeAreaInsets();
  const {userId} = useAuthContext();
  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {variables: {input: {id: post.id, _version: post._version}}});
  const isMyPost = userId === post.User?.id;
  const onDeletePost = async () => {
    try {
      if (post.image) {
        await Storage.remove(post.image);
      }
      if (post.images) {
        await Promise.all(post.images.map(image => Storage.remove(image)));
      }
      if (post.video) {
        await Storage.remove(post.video);
      }
      await doDeletePost();
    } catch (error) {
      Alert.alert('Error deliting the post', (error as Error).message);
    }
  };
  const onDeleteOptionPressed = () => {
    Alert.alert('Are you sure?', 'Deliting a post is permanent', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete post', style: 'destructive', onPress: onDeletePost},
    ]);
  };
  const onEditOptionPressed = () => {
    navigation.navigate('UpdatePost', {postId: post.id});
  };
  return (
    <Menu style={styles.threeDots} renderer={renderers.SlideInMenu}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            paddingBottom: insets.bottom,
          },
        }}>
        <MenuOption onSelect={() => Alert.alert(`Reporting...`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        {isMyPost && (
          <>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, {color: colors.accent}]}>
                Delete
              </Text>
            </MenuOption>
            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default MenuComponent;
