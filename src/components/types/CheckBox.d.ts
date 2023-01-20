import React from 'react';
import { AccessibilityProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { BrandColorTypes } from './brand-color-type';
import { FontColorTypes } from './font-color-type';
import { SizeType } from './size-type';
import { TypographyTypes } from './typography-type';

interface CheckBoxProps extends AccessibilityProps {
  checked?: boolean;
  checkedIcon?: React.ReactElement;
  children: string;
  color?: BrandColorTypes;
  fontSize?: TypographyTypes;
  iconRight?: boolean;
  onPress?: () => void;
  size?: SizeType;
  style?: StyleProp<ViewStyle>;
  textColor?: FontColorTypes;
  textStyle?: StyleProp<TextStyle>;
  uncheckedIcon?: React.ReactElement;
}

export const CheckBox: React.FC<CheckBoxProps>;
