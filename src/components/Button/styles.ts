import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  title: {
    color: colors.black,
    fontWeight: fonts.weight.semi,
  },
});
