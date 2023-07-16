import {View, Image, TextInput, Alert, Text} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UploadNavigationProp, UploadRouteProp} from '../../types/navigation';
import {useState} from 'react';
import Button from '../../components/Button/Button';
import {useMutation} from '@apollo/client';
import {createPost} from './queries';
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel/Carousel';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import {Storage} from 'aws-amplify';
import {v4} from 'uuid';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreatePostScreen = () => {
  const navigation = useNavigation<UploadNavigationProp>();
  const {userId} = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRoute<UploadRouteProp>();
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);
  const {image, images, video} = route.params;
  const submit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const input: CreatePostInput = {
      type: 'POST',
      userID: userId,
      description,
      nofComments: 0,
      nofLikes: 0,
      image: undefined,
      images: undefined,
      video: undefined,
    };
    try {
      if (image) {
        const imageKey = await uploadMedia(image);
        input.image = imageKey;
      } else if (images) {
        const imageKeys = await Promise.all(
          images.map(img => uploadMedia(img)),
        );
        input.images = imageKeys.filter(key => key) as string[];
      } else if (video) {
        const videoKey = await uploadMedia(video);
        input.video = videoKey;
      }
      await doCreatePost({variables: {input}});
      setDescription('');
      setIsSubmitting(false);
      navigation.popToTop();
      //@ts-ignore
      navigation.navigate('Feed');
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert('Error uploading the post', (error as Error).message);
    }
  };

  const uploadMedia = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];
      const s3Response = await Storage.put(`${v4()}.${extension}`, blob, {
        progressCallback: ({loaded, total}) => {
          setProgress(loaded / total);
        },
      });
      return s3Response.key;
    } catch (error) {
      Alert.alert('Error uploading the file', (error as Error).message);
    }
  };

  let content = null;
  if (image) {
    content = (
      <Image source={{uri: image}} style={styles.image} resizeMode="contain" />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} paused />;
  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
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
        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit'}
          onPress={submit}
        />
      </View>
      <View style={styles.progressBar}>
        {isSubmitting && (
          <View style={styles.progressContainer}>
            <View style={[styles.progress, {width: `${progress * 100}%`}]} />
            <Text>Uploading {Math.floor(progress * 100)}%</Text>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreatePostScreen;
