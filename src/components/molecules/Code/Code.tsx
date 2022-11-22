import { getStyles } from './Code.styles';
import { NativeSyntheticEvent, Text, TextInput, TextInputSelectionChangeEventData, TextStyle, View, ViewStyle } from 'react-native';

import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Container } from 'components/atoms';

type Props = {
  label: string;
  error?: boolean;
  style?: TextStyle;
  onChangeText?: (text: string) => void;
  caption?: string;
  lengthInput?: number;
  secureTextEntry?: boolean;
  disable?: boolean;
  testID?: string;
  accessibilityLabel?: string;
  newCode?: string;
  actionStyle?: ViewStyle;
};

const Code: FunctionComponent<Props> = ({
  label,
  style,
  error = false,
  onChangeText,
  caption,
  lengthInput,
  secureTextEntry = false,
  disable = false,
  testID = '',
  accessibilityLabel = '',
  newCode = ''
}) => {
  const styles = getStyles();
  const [fullCode, setFullCode] = useState('');
  const [code, setCode] = useState(['']);
  const [focus, setFocus] = useState([false]);
  const inputEl = useRef<(TextInput | null)[]>([]);
  const [selection, setSelection] = useState<{ start: number; end: number } | undefined>(undefined);

  const pinHolderStyle = [
    styles.pin__holder,
    style,
    error ? styles.pin__holder__error : null,
    styles.pin__code__holder,
    disable ? styles.pin__holder__disabled : null
  ];
  const pinStyle = [styles.pin, error ? styles.pin__label__error : null, styles.pin__code, disable ? styles.pin__verification__disabled : null];

  useEffect(() => {
    let newFullcode = '';
    for (let letter: number = 0; letter < code.length; letter++) {
      newFullcode += code[letter];
    }
    setFullCode(newFullcode);
    if (onChangeText) {
      onChangeText(newFullcode);
    }
  }, [code, onChangeText]);

  const keyChangeDelete = (key: string, focusedIndex: number) => {
    if (key === 'Backspace' && focusedIndex >= 0) {
      setTextCode(focusedIndex, '');
      (inputEl.current[focusedIndex - (focusedIndex === 0 ? 0 : 1)] as TextInput).focus();
    }
  };

  const focusCode = (index: number, value: boolean) => {
    let newFocus = focus;
    newFocus[index] = value;
    setFocus([...newFocus]);
  };

  const setTextCode = (index: number, text: string) => {
    let newCode = code;
    newCode[index] = text;
    setCode([...newCode]);
  };

  useEffect(() => {
    if (newCode.length > 0) {
      let fullCode = [];
      for (let letter: number = 0; letter < newCode.length; letter++) {
        fullCode[letter] = newCode[letter];
      }
      setCode([...fullCode]);
    }
  }, [newCode, setCode]);

  const cleanCode = () => {
    setCode([]);
  };

  const onFocus = (index: number) => {
    focusCode(index, true);
    if (error && fullCode.length > lengthInput - 1) {
      (inputEl.current[0] as TextInput).focus();
      cleanCode();
    }
  };

  const changeText = (index: number, text: string) => {
    if (text.length > 1) {
      const textArray = text ? text.split('') : [];
      if (text.length > 2) {
        textArray.map((char, i) => setTextCode(i, char));
      } else {
        setTextToIndex(index, textArray[1]);
      }
    } else {
      setTextToIndex(index, text);
    }
  };

  const setTextToIndex = (index: number, text: string) => {
    setTextCode(index, text);
    if (text.length === 1 && index < lengthInput - 1) {
      (inputEl.current[index + 1] as TextInput).focus();
    }
    if (index === lengthInput - 1 && text !== '') {
      (inputEl.current[index] as TextInput).blur();
    }
  };

  const inputChangeText = (index: number, text: string) => {
    /^[0-9]*$/.test(text) ? changeText(index, text) : changeText(index, text.toString().replace(/[^\d]/, ''));
  };

  const onSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    const { selection } = e.nativeEvent;
    setSelection(selection);
    setSelection(undefined);
  };

  let arrayInputs = [];
  for (let input: number = 0; input < lengthInput; input++) {
    arrayInputs.push(input);
  }

  useEffect(() => {
    inputEl.current[0]?.focus();
  }, []);

  return (
    <View style={styles.pin__container}>
      <Text style={[styles.pin__label, error ? styles.pin__label__error : null]}>{label}</Text>
      <View style={styles.pin__holder__container}>
        {arrayInputs.map((a, index) => {
          return (
            <View key={a} style={[pinHolderStyle, index === arrayInputs.length - 1 ? { marginRight: 0 } : {}, focus[index] ? styles.pin__holder__focus : null]}>
              <TextInput
                testID={`${testID}${index}`}
                accessibilityLabel={`${accessibilityLabel}${index}`}
                ref={ref => (inputEl.current[index] = ref)}
                selection={selection}
                value={code[index]}
                editable={!disable}
                autoCorrect={false}
                numberOfLines={1}
                keyboardType="numeric"
                secureTextEntry={secureTextEntry}
                onFocus={() => onFocus(index)}
                onBlur={() => focusCode(index, false)}
                onChangeText={text => inputChangeText(index, text)}
                onKeyPress={e => keyChangeDelete(e.nativeEvent.key, index)}
                onSelectionChange={onSelectionChange}
                style={pinStyle}
              />
            </View>
          );
        })}
      </View>

      {!!caption && error ? (
        <>
          <View style={styles.pin__caption__container}>
            <Text style={[styles.pin__caption, styles.pin__caption__error]}>{caption}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.pin__caption__container} />
          <Container row crossCenter style={{ marginTop: 50, marginBottom: 16 }} />
        </>
      )}
    </View>
  );
};

export default Code;
