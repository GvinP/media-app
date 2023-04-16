import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: 200,
    aspectRatio: 1,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;
