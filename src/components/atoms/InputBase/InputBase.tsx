import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import theme from 'components/theme/theme';

const InputBase = (props: TextInputProps) => {
  return (
    <View style={styles.inputContainerStyle}>
      <TextInput {...props} multiline placeholder="Correos electrónicos" keyboardType="numeric" />
    </View>
  );
};

export default InputBase;

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: theme.fontSize.paragraph,
    paddingHorizontal: 12,
    width: '100%',
    color: theme.fontColor.dark
  },
  inputContainerStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.fontColor.medgrey
  },
  passwordImageStyle: {
    width: 24,
    height: 24,
    marginRight: 15,
    marginVertical: 15
  },
  prefixImageStyle: {
    width: 16,
    height: 16,
    marginLeft: 15,
    marginVertical: 15
  }
});
