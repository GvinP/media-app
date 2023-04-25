import {View, Image, ActivityIndicator} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import DoublePressable from '../DoublePressable/intex';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Carousel from '../Carousel/Carousel';
import {Post} from '../../API';
import styles from './styles';
import {Storage} from 'aws-amplify';

interface IContent {
  post: Post;
  isVisible: boolean;
  toggleLike: () => void;
}

const Content: FC<IContent> = ({post, isVisible, toggleLike}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagesUri, setImagesUri] = useState<string[] | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  useEffect(() => {
    downloadImage();
  }, []);
  const downloadImage = async () => {
    if (post.image) {
      const uri = await Storage.get(post.image);
      setImageUri(uri);
    } else if (post.images) {
      const uris = await Promise.all(post.images.map(img => Storage.get(img)));
      setImagesUri(uris);
    } else if (post.video) {
      const uri = await Storage.get(post.video);
      setVideoUri(uri);
    }
  };
  if (imageUri) {
    return (
      <DoublePressable onDoublePress={toggleLike}>
        <Image source={{uri: imageUri}} style={styles.image} />
      </DoublePressable>
    );
  } else if (imagesUri) {
    return <Carousel images={imagesUri} onDoublePress={toggleLike} />;
  } else if (videoUri) {
    return (
      <DoublePressable onDoublePress={toggleLike}>
        <VideoPlayer uri={videoUri} paused={!isVisible} />
      </DoublePressable>
    );
  }
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Content;
