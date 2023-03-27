import {FC} from 'react';
import {Pressable, Text} from 'react-native';
import styles from './styles';

interface IButton {
  title?: string;
  onPress?: () => void;
}

const Button: FC<IButton> = ({title = '', onPress = () => {}}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;
