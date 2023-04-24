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
    width: '100%',
    aspectRatio: 1,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  progressBar: {
    paddingHorizontal: 10,
    width: '100%',
  },
  progressContainer: {
    backgroundColor: colors.lightgrey,
    width: '100%',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 10,
  },
  progress: {
    backgroundColor: colors.primary,
    position: 'absolute',
    height: '100%',
    alignSelf: 'flex-start',
    borderRadius: 12,
  },
});

export default styles;
