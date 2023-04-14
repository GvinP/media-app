import {StyleSheet, Text, View, TextInput} from 'react-native';
import {FC} from 'react';
import colors from '../../theme/colors';
import {Control, Controller} from 'react-hook-form';
import {User} from '../../API';

export type EditableUser = Pick<User, 'name' | 'bio' | 'username' | 'website'>;
interface IInput {
  control: Control<EditableUser, object>;
  label: string;
  name: keyof EditableUser;
  multiline?: boolean;
  rules?: object;
}

const Input: FC<IInput> = ({
  control,
  label,
  name,
  multiline = false,
  rules = {},
}) => {
  return (
    <Controller
      {...{name, control, rules}}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              {...{value, onBlur, multiline}}
              onChangeText={onChange}
              placeholder={label}
              style={[
                styles.input,
                {borderBottomColor: error ? colors.accent : colors.border},
              ]}
            />
            {error && (
              <Text style={{color: colors.accent}}>
                {error.message || 'error'}
              </Text>
            )}
          </View>
        </View>
      )}
    />
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
    borderBottomWidth: 1,
  },
});
