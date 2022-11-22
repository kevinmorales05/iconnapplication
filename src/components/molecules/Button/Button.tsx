import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import theme from 'components/theme/theme'
import { ButtonProps } from 'components/types/Button';

const getTextStyle = (props: ButtonProps) => {

  const textStyle: any = [
    {
      fontSize: theme.fontSize[props.fontSize],
      margin: theme.buttonSize[props.size],
      color: theme.fontColor[props.fontColor]
    },
  ];
  
  if (props.fontColor) textStyle.push({ color: theme.fontColor[props.fontColor] });

  if (props.outline || props.transparent) textStyle.push({ color: theme.brandColor[props.color] });
  
  if (props.loading && props.outline) textStyle.push({ color: theme.fontColor.white });

  if (props.disabled) textStyle.push({ color: theme.fontColor.white });
  
  // TODO: Validate if is convenient to have a "fontWeight" in the theme interface: src/components/util/theme.ts | src/components/types/theme.d.ts
  // Could be only a boolean, as in this component.
  if (props.fontBold) textStyle.push({ fontWeight: 'bold' });
  
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
    marginBottom,
    marginLeft,
    marginRight,
    marginTop
  } = props;
  
  const buttonStyles: any = [styles.container];
  buttonStyles.push({
    backgroundColor: theme.brandColor[color],
    borderWidth: 2,
    borderColor: theme.brandColor[color],
  });
  
  if (length === 'short') buttonStyles.push({ width: theme.buttonWidth[width] });
  
  if (borderColor) buttonStyles.push({ borderColor: theme.brandColor[borderColor] });

  if (round) buttonStyles.push({ borderRadius: theme.buttonSize[size] });

  if (outline) buttonStyles.push({ backgroundColor: theme.brandColor[color] + (tint ? '10' : '00') });

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
      backgroundColor: theme.brandColor[color],
      opacity: 0.5
    });
  }
  if (marginBottom) buttonStyles.push({ marginBottom: marginBottom});
  if (marginTop) buttonStyles.push({ marginTop: marginTop});
  if (marginLeft) buttonStyles.push({ marginLeft: marginLeft});
  if (marginRight) buttonStyles.push({ marginRight: marginRight});

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
  color = 'iconn_accent_principal',
  tint = false,
  fontColor = 'white',
  ...props
}) => {

  ({ ...props } = { style, children, size, length, width, color, tint, fontColor, ...props});
  
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
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    paddingHorizontal: 0,
  },
});

export default Button;
