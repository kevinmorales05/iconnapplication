import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import theme from '../../util/theme'
import { ButtonProps } from 'components/types/Button';

const getTextStyle = (props: ButtonProps) => {

  const textStyle: any = [
    {
      fontSize: theme.fontSize[props.size],
      margin: theme.buttonSize[props.size],
      color: theme.textColor.white,
    },
  ];
  if (props.outline || props.transparent) {
    textStyle.push({
      color: theme.brandColor[props.color],
    });
  }
  if (props.loading && props.outline) {
    textStyle.push({
      color: theme.brandColor[props.color] + '50',
    });
  }
  if (props.disabled) {
    textStyle.push({
      color: theme.textColor.disabled,
    });
  }
  return textStyle;
};

const getContainerStyle = (props: ButtonProps) => {

  const {
    outline,
    width,
    round,
    transparent,
    disabled,
    loading,
    size,
    length,
    color,
    tint,
    borderColor,
  } = props;
  
  const buttonStyles: any = [styles.container];
  buttonStyles.push({
    backgroundColor: theme.brandColor[color],
    borderWidth: 1,
    borderColor: theme.brandColor[color],
  });
  if (length === 'short') {
    buttonStyles.push({
      width: theme.buttonWidth[width],
    });
  }
  if (borderColor) {
    buttonStyles.push({
      borderColor: theme.brandColor[borderColor],
    });
  }
  if (round) {
    buttonStyles.push({
      borderRadius: theme.buttonSize[size] * 2,
    });
  }
  if (outline) {
    buttonStyles.push({
      backgroundColor: theme.brandColor[color] + (tint ? '10' : '00'),
    });
  }
  if (loading) {
    buttonStyles.push({
      borderWidth: 0,
      backgroundColor: theme.brandColor[color] + '50',
    });
  }
  if (transparent) {
    buttonStyles.push({
      borderWidth: 0,
      backgroundColor: 'transparent',
    });
  }
  if (loading && outline) {
    buttonStyles.push({
      backgroundColor: theme.brandColor[color] + '20',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.brandColor[borderColor || color] + '30',
    });
  }
  if (disabled) {
    buttonStyles.push({
      backgroundColor: theme.brandColor.disabled,
      borderColor: theme.textColor.disabled,
    });
  }
  return buttonStyles;
};

const renderChildren = (props: ButtonProps) => {
  return (
    <>
      {props.loading && !props.disabled && (
        <ActivityIndicator
          style={[styles.iconStyle]}
          color={props.indicatorColor || theme.brandColor[props.color]}
        />
      )}
      {props.leftIcon ||
        (props.icon && (
          <View
            style={[styles.iconStyle, props.leftIconStyle]}>
            {props.leftIcon || props.icon}
          </View>
        ))}
      <Text style={StyleSheet.flatten([getTextStyle(props), props.textStyle])}>
        {props.children}
      </Text>
      {props.rightIcon && (
        <View style={[styles.iconStyle, props.rightIconStyle]}>
          {props.rightIcon}
        </View>
      )}
    </>
  );
};

const Button: React.FC<ButtonProps> = ({
  style,
  children = 'Submit',
  size = 'medium',
  length = 'long',
  width = 'medium',
  color = 'iconn_orange_original',
  tint = false,
  ...props
}) => {

  ({ ...props } = { style, children, size, length, width, color, tint, ...props});
  
  const TouchableElement: any =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableElement
      {...props}
      onPress={props.onPress}
      disabled={props.disabled || props.loading}>
      <View
        style={StyleSheet.flatten([
          getContainerStyle({...props}),
          style,
        ])}>
        {renderChildren({...props})}
      </View>
    </TouchableElement>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    paddingHorizontal: 5,
  },
});

export default Button;
