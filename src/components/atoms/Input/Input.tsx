/* eslint-disable react/jsx-props-no-spreading */
import React, { ForwardedRef, forwardRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TextInputProps
} from 'react-native';
import theme from 'components/theme/theme'
import Collapsible from 'react-native-collapsible';
import {
  Control, Controller, FieldValues, RegisterOptions
} from 'react-hook-form';
import { Touchable } from '../Touchable';
import { Container } from '../Container';
import { TextContainer } from '../../molecules/TextContainer';
import { ActionButton } from '../ActionButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONN_EYE_ON, ICONN_EYE_OFF } from 'assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CustomText } from '../CustomText';

export interface Props {
  label?: string;
  placeholder?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  autoCorrect?: TextInputProps['autoCorrect'];
  autoFocus?: TextInputProps['autoFocus'];
  blurOnSubmit?: TextInputProps['blurOnSubmit'];
  editable?: TextInputProps['editable'];
  keyboardType?: TextInputProps['keyboardType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  defaultValue?: TextInputProps['value'];
  passwordField?: boolean;
  showPasswordEnable?: boolean;
  error?: string;
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
  marginTop?: number;
  maxLength?: number;
  prefixImage?: ImageSourcePropType;
  centerElements?: boolean;
  hideLabel?: boolean;
  name: string;
  control: Control<FieldValues, object>;
  rules?: RegisterOptions;
  testID?: string;
  sufixOutIcon?: boolean;
  onPressInfo?: any;
  onChangeText?: TextInputProps['onChangeText'];
  datePicker?: boolean;
  onPressDatePickerIcon?: () => void;
  phone?: boolean
}

const Input = forwardRef(({
  label = '',
  placeholder = '',
  autoCapitalize = 'none',
  autoComplete = 'off',
  autoCorrect,
  autoFocus,
  blurOnSubmit = true,
  editable = true,
  keyboardType = 'default',
  onSubmitEditing,
  defaultValue,
  passwordField,
  showPasswordEnable = true,
  error = '',
  onFocus,
  onBlur,
  marginTop = 8,
  maxLength,
  prefixImage,
  centerElements,
  hideLabel,
  name,
  control,
  rules,
  testID,
  sufixOutIcon = false,
  onPressInfo,
  onChangeText,
  datePicker = false,
  onPressDatePickerIcon,
  phone = false
}: Props, ref: ForwardedRef<any>) => {
  const {
    inputStyle, inputContainerStyle, passwordImageStyle, prefixImageStyle
  } = styles;
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(passwordField || false);
  const [focused, setFocused] = useState<boolean>(false);

  const textInputProps: TextInputProps = {
    placeholder,
    placeholderTextColor: theme.brandColor.iconn_med_grey,
    autoCapitalize,
    autoComplete,
    autoCorrect,
    autoFocus,
    blurOnSubmit,
    editable,
    keyboardType,
    maxLength: maxLength || 100,
    onSubmitEditing,
    returnKeyType: 'done',
    underlineColorAndroid: 'transparent',
    selectionColor: theme.brandColor.iconn_accent_principal,
    onFocus: (e) => {
      if (onFocus) onFocus(e);
      setFocused(true);
    },
    onBlur: (e) => {
      if (onBlur) onBlur(e);
      setFocused(false);
    },
    secureTextEntry,
    style: [inputStyle, {
      textAlign: centerElements ? 'center' : 'left',
      textAlignVertical: 'center',
      paddingBottom: 14,
      paddingTop: hideLabel ? 2 : 14
    }],
    selection: !editable ? { start: 0, end: 0 } : undefined
  };

  const borderColor = error ? theme.brandColor.iconn_error : (focused && theme.brandColor.iconn_accent_principal) || theme.brandColor.iconn_med_grey;

  return (
    <Container testID={testID} style={{ marginTop }}>
      {!!label && !hideLabel && (
      <TextContainer
        testID={`${testID}-label`}
        text={label}
        typography="label"
        marginBottom={8}
      />
      )}
      <Container flex row space='between' center>
        <Container
          row
          center
          height={hideLabel ? 68 : undefined}
          style={{
            ...inputContainerStyle,
            borderColor,
            backgroundColor: !editable ? theme.brandColor.iconn_light_grey : undefined,
            width: sufixOutIcon ? '91%' : '100%'
          }}
        >
          {prefixImage && (
          <Image
            testID={`${testID}-prefix-image`}
            source={prefixImage}
            style={prefixImageStyle}
            resizeMode="contain"
          />
          )}
          <Container flex>
            {!!label && hideLabel && (
              <Container style={{ marginHorizontal: 12, marginTop: 12 }}>
                <Collapsible collapsed={!focused}>
                  <TextContainer
                    testID={`${testID}-hidden-label`}
                    text={label}
                    typography="label"
                  />
                </Collapsible>
              </Container>
            )}
            <Controller
              name={name}
              defaultValue={defaultValue}
              control={control}
              rules={rules}
              render={({ field }) => (
                <>
                <Container row center>
                  {phone && (<CustomText text='   +52'/>)}
                  <TextInput
                    testID={`${testID}-input`}
                    ref={ref}
                    {...textInputProps}
                    value={defaultValue ? defaultValue : field.value}
                    onChangeText={e => {
                      let isnum = /^\d+$/.test(e);
                      if(phone){
                        if (!isnum) return;
                      }
                      
                      field.value = e;                      
                      field.onChange(e);
                      if (onChangeText) {
                        onChangeText(field.value)  
                      }
                    }}
                  />
                </Container>
                </>
              )}
            />
          </Container>
          {passwordField && showPasswordEnable && (
            <Touchable testID={`${testID}-hide-password`} onPress={() => setSecureTextEntry(!secureTextEntry)} opacityEffect>
              <Image source={secureTextEntry ? ICONN_EYE_ON : ICONN_EYE_OFF} style={passwordImageStyle} />
            </Touchable>
          )}
          {datePicker && (
            <ActionButton size='xsmall' color='' onPress={onPressDatePickerIcon!}
              icon={<AntDesign
                name="calendar"
                size={24}
                color={theme.fontColor.grey} />}
            />
          )}
        </Container>
        {sufixOutIcon && (
          <ActionButton circle size='xxxsmall' color='iconn_accent_secondary' onPress={onPressInfo}
          icon={<Ionicons
            name="information"
            size={15}
            color={theme.fontColor.white} />}
          />
        )}
      </Container>
      
      {(!!error && error.length > 1) && (
      <TextContainer
        testID={`${testID}-error-label`}
        text={error}
        typography="description"
        textColor={theme.brandColor.iconn_error}
        marginTop={2}
        textAlign={centerElements ? 'center' : 'left'}
      />
      )}
    </Container>
  );
});

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

export default Input;
