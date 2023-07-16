import {View, Text, Image, TextInput, ActivityIndicator} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UpdateRouteProp, UploadNavigationProp} from '../../types/navigation';
import {useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import {useMutation, useQuery} from '@apollo/client';
import {getPost, updatePost} from './queries';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import Carousel from '../../components/Carousel/Carousel';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const UpdatePostScreen = () => {
  const navigation = useNavigation<UploadNavigationProp>();
  const route = useRoute<UpdateRouteProp>();
  const {postId} = route.params;
  const {data, loading, error} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {variables: {id: postId}},
  );

  const [description, setDescription] = useState('');
  const [doUpdatePost, {data: updateData, error: updateError}] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  useEffect(() => {
    setDescription(data?.getPost?.description || '');
  }, [data]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [updateData, navigation]);

  const submit = () =>
    doUpdatePost({
      variables: {
        input: {
          id: postId,
          _version: data?.getPost?._version,
          description,
        },
      },
    });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError || !data?.getPost) {
    return (
      <View>
        <Text>
          {error?.message || updateError?.message || "The post didn't find"}
        </Text>
      </View>
    );
  }

  const {image, images, video} = data?.getPost;
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
      <View style={styles.row}>
        <Button title="Submit" onPress={submit} />
      </View>
    </View>
  );
};

export default UpdatePostScreen;
