import {StyleSheet, Text, View, TextInput} from 'react-native';
import {FC} from 'react';
import colors from '../../theme/colors';

interface IInput {
  label: string;
  multiline?: boolean;
}

const Input: FC<IInput> = ({label, multiline = false}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={label}
        style={styles.input}
        multiline={multiline}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
  },
  input: {
    flex: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});
