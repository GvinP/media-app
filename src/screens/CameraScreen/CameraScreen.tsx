import {useState, useEffect, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Camera,
  CameraPictureOptions,
  CameraRecordingOptions,
  CameraType,
  FlashMode,
  VideoQuality,
} from 'expo-camera';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {UploadNavigationProp} from '../../types/navigation';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const flashModes = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon = {
  [FlashMode.off]: 'flash-off' as const,
  [FlashMode.on]: 'flash-on' as const,
  [FlashMode.auto]: 'flash-auto' as const,
  [FlashMode.torch]: 'highlight' as const,
};

const CameraScreen = () => {
  const insets = useSafeAreaInsets();
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef<Camera>(null);
  const navigation = useNavigation<UploadNavigationProp>();
  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microfonPermission =
        await Camera.requestMicrophonePermissionsAsync();
      setHasPermissions(
        cameraPermission.status === 'granted' &&
          microfonPermission.status === 'granted',
      );
    };
    getPermission();
  }, []);

  const flipCamera = () =>
    setCameraType(prevType =>
      prevType === CameraType.back ? CameraType.front : CameraType.back,
    );

  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameraReady || !camera.current || isRecording) return;
    const options: CameraPictureOptions = {
      quality: 0.5,
      base64: true,
      skipProcessing: true,
    };
    const result = await camera.current.takePictureAsync(options);
    navigation.navigate('CreatePost', {
      image: result.uri,
    });
  };

  const startRecording = async () => {
    if (!isCameraReady || !camera.current || isRecording) return;
    const options: CameraRecordingOptions = {
      quality: VideoQuality['480p'],
      maxDuration: 60,
      maxFileSize: 10 * 1024 * 1024,
      mute: false,
    };
    setIsRecording(true);
    try {
      const result = await camera.current.recordAsync(options);
    } catch (error) {
      console.log(error);
    }
  };
  const stopRecording = async () => {
    if (isRecording) {
      camera.current?.stopRecording();
      setIsRecording(false);
    }
  };
  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 3},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          if (assets.length === 1) {
            navigation.navigate('CreatePost', {
              image: assets[0].uri,
            });
          } else {
            navigation.navigate('CreatePost', {
              images: assets.map(asset => String(asset.uri)),
            });
          }
        }
      },
    );
  };

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }
  if (hasPermissions === false) {
    return <Text>No access to the camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={[styles.buttonContainer, {top: 10 + insets.top}]}>
        <MaterialIcons name="close" size={30} color="#fff" />
        <Pressable onPress={flipFlash}>
          <MaterialIcons name={flashModeToIcon[flash]} size={30} color="#fff" />
        </Pressable>
        <MaterialIcons name="settings" size={30} color="#fff" />
      </View>
      <View style={[styles.buttonContainer, {bottom: 10}]}>
        <Pressable onPress={openImageGallery}>
          <MaterialIcons name="photo-library" size={30} color="#fff" />
        </Pressable>
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                {backgroundColor: isRecording ? '#f00' : '#fff'},
              ]}
            />
          </Pressable>
        )}
        <Pressable onPress={flipCamera}>
          <MaterialIcons name="flip-camera-ios" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default CameraScreen;
