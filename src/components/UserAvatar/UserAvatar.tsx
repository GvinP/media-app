import {Image, ImageStyle, StyleProp} from 'react-native';
import {FC, useEffect, useState} from 'react';
import {Storage} from 'aws-amplify';
import {DEFAULT_USER_IMAGE} from '../../config';

interface IUserAvatar {
  photoKey?: string | null;
  photoUri?: string | null;
  style?: StyleProp<ImageStyle>;
}

const UserAvatar: FC<IUserAvatar> = ({photoKey, photoUri, style}) => {
  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    downloadImage();
  }, []);
  const downloadImage = async () => {
    if (photoKey) {
      const uri = await Storage.get(photoKey);
      setPhoto(uri);
    }
  };
  return (
    <Image
      source={{uri: photoUri || photo || DEFAULT_USER_IMAGE}}
      style={style}
    />
  );
};

export default UserAvatar;
