import React, { useEffect, useRef, useState } from 'react';
import { ActionSheetIOS, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Input } from '../Input';
import { Touchable } from '../Touchable';
import theme from '../../theme/theme';
import { Container } from '../Container';
import { TouchableText } from '../../molecules/TouchableText';
import Octicons from 'react-native-vector-icons/Octicons';

interface Props {
  label?: string;
  placeholder?: string;
  error?: string;
  options: Array<string>;
  useActionSheet?: boolean;
  actionSheetTitle?: string;
  marginTop?: number;
  androidMode?: PickerProps['mode'];
  name: string;
  control: Control<FieldValues, string>;
  rules?: RegisterOptions;
  onSelect: (value: string) => void;
  testID?: string;
}

const Select: React.FC<Props> = ({
  label,
  placeholder = '',
  error = '',
  options,
  useActionSheet,
  actionSheetTitle = placeholder,
  marginTop = 8,
  androidMode,
  name,
  control,
  rules,
  onSelect,
  testID
}) => {

  const pickerRef = useRef<any>(null);
  const sheetRef = useRef<RBSheet>(null);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    onSelect(value);
  }, [value]);

  const onPressPicker = () => {
    if (Platform.OS === 'android') {
      pickerRef.current?.focus();
    } else if (useActionSheet) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: actionSheetTitle,
          tintColor: theme.brandColor.iconn_accent_principal,
          options: [...options.map((item) => `${item}`), 'cancel'],
          cancelButtonIndex: options.length,
          userInterfaceStyle: 'light'
        },
        (buttonIndex) => {
          if (buttonIndex !== options.length) setValue(options[buttonIndex]);
        }
      );
    } else {
      sheetRef.current?.open();
    }
  };

  return (
    <>
      <Touchable testID={testID} onPress={onPressPicker}>
        {Platform.OS === 'android' && (
        <Picker
          ref={pickerRef}
          selectedValue={value}
          onValueChange={setValue}
          style={[StyleSheet.absoluteFill, { opacity: 0 }]}
          mode={androidMode}
        >
          <Picker.Item label={label} value="" color='lightgrey' />
          {options.map((element) => (<Picker.Item key={element} label={element} value={element} />))}
        </Picker>
        )}
        <Input
          placeholder={placeholder}
          error={error}
          autoCapitalize="sentences"
          marginTop={marginTop}
          name={name}
          control={control}
          rules={rules}
          renderErrorIcon={false}
        />
        <Container
          middle
          style={{
            position: 'absolute',
            right: 0,
            top: marginTop,
            bottom: error ? 20 : 0,
            paddingHorizontal: 16
          }}
        >
          <Octicons name="chevron-down" size={24} color={theme.brandColor.iconn_grey} />
        </Container>
      </Touchable>

      <RBSheet ref={sheetRef}>
        <Container style={{ backgroundColor: theme.brandColor.iconn_med_grey }}>
          <Container row space="between" style={{ paddingTop: 8 }}>
            <TouchableText
              text={`Cancelar`}
              textColor={theme.brandColor.iconn_accent_principal}
              marginLeft={16}
              onPress={() => sheetRef.current?.close()}
            />
            <TouchableText
              text={`Aceptar`}
              textColor={theme.brandColor.iconn_accent_principal}
              marginRight={16}
              onPress={() => {
                if (!value) setValue(options[0]);

                sheetRef.current?.close();
              }}
            />
          </Container>
          <Picker
            ref={pickerRef}
            selectedValue={value}
            onValueChange={setValue}
            dropdownIconRippleColor={theme.brandColor.iconn_accent_principal}
          >
            {options.map((element) => (
              <Picker.Item
                key={element}
                label={element}
                value={element}
                color={theme.brandColor.iconn_dark_grey}
              />
            ))}
          </Picker>
          <SafeAreaView />
        </Container>
      </RBSheet>
    </>
  );
};

export default Select;
