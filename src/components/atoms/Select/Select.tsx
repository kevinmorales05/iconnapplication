import React, { useEffect, useRef, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
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
  placeholderTextColor?: string;
  error?: any;
  options: Array<any>;
  optionsIdField?: string;
  optionsValueField?: string;
  actionSheetTitle?: string;
  marginTop?: number;
  androidMode?: PickerProps['mode'];
  name: string;
  control: Control<FieldValues, any>;
  rules?: RegisterOptions;
  onSelect: (value: string) => void;
  testID?: string;
  disabled?: boolean;
}

const Select: React.FC<Props> = ({
  label,
  placeholder = '',
  placeholderTextColor = '',
  error = '',
  options,
  optionsIdField = '',
  optionsValueField = '',
  marginTop = 8,
  androidMode,
  name,
  control,
  rules,
  onSelect,
  testID,
  disabled = false
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
    } else {
      sheetRef.current?.open();
    }
  };

  return (
    <>
      <Touchable testID={testID} onPress={onPressPicker} disabled={disabled}>
        {Platform.OS === 'android' && (
        <Picker
          ref={pickerRef}
          selectedValue={value}
          onValueChange={setValue}
          style={[StyleSheet.absoluteFill, { opacity: 0 }]}
          mode={androidMode}
        >
          {options.map((element) => 
            optionsIdField !== '' ?
            (
              <Picker.Item key={element[optionsIdField]} label={element[optionsValueField]} value={element[optionsIdField]} />
            ) : (
              <Picker.Item key={element} label={element} value={element} />
            ))}
        </Picker>
        )}
        <Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
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
          <Octicons name="chevron-down" size={24} color={theme.fontColor.placeholder} />
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
            {options.map(element =>
              optionsIdField !== '' ? (
                <Picker.Item
                  key={element[optionsIdField]}
                  label={element[optionsValueField]}
                  value={element[optionsIdField]}
                  color={theme.brandColor.iconn_dark_grey}
                />
              ) : (
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
