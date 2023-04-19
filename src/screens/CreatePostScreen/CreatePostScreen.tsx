import {View, Image, TextInput, Alert} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UploadNavigationProp, UploadRouteProp} from '../../types/navigation';
import {useState} from 'react';
import Button from '../../components/Button/Button';
import {useMutation} from '@apollo/client';
import {createPost} from './queries';
import {CreatePostMutation, CreatePostMutationVariables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel/Carousel';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const CreatePostScreen = () => {
  const navigation = useNavigation<UploadNavigationProp>();
  const {userId} = useAuthContext();
  const route = useRoute<UploadRouteProp>();
  const [description, setDescription] = useState('');
  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);
  const {image, images, video} = route.params;
  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            type: 'POST',
            userID: userId,
            description,
            nofComments: 0,
            nofLikes: 0,
            image,
            images,
            video,
          },
        },
      });
      console.log(response);
      setDescription('');
      navigation.popToTop();
      //@ts-ignore
      navigation.navigate('Feed');
    } catch (error) {
      Alert.alert('Error uploading the post', (error as Error).message);
    }
  };
  let content = null;
  if (image) {
    content = <Image source={{uri: image}} style={styles.image} />;
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} paused />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>{content}</View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <View style={{flexDirection: 'row'}}>
        <Button title="Submit" onPress={submit} />
      </View>
    </View>
  );
};

export default CreatePostScreen;
