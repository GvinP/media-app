import {View, Pressable} from 'react-native';
import {FC, useState} from 'react';
import Video from 'react-native-video';
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../../theme/colors';
import styles from './styles';

interface IVideoPlayer {
  uri: string;
  paused: boolean;
}

const VideoPlayer: FC<IVideoPlayer> = ({uri, paused}) => {
  const [muted, setMuted] = useState(true);
  return (
    <View>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={paused}
        muted={muted}
      />
      <Pressable
        style={styles.muteButton}
        onPress={() => setMuted(prev => !prev)}>
        <Octicons
          name={muted ? 'mute' : 'unmute'}
          size={20}
          color={colors.white}
        />
      </Pressable>
    </View>
  );
};

export default VideoPlayer;
