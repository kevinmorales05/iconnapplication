import React from 'react';
import {
  AccessibilityProps,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import { SizeType } from './size-type';
import { TypographyTypes } from './typography-type';
import { BrandColorTypes } from './brand-color-type';
import { FontColorTypes } from './font-color-type'

interface CheckBoxProps extends AccessibilityProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: string;
  checked?: boolean;
  iconRight?: boolean;
  color?: BrandColorTypes;
  textColor?: FontColorTypes;
  size?: SizeType;
  onPress: () => void;
  checkedIcon?: React.ReactElement;
  uncheckedIcon?: React.ReactElement;
  fontSize?: TypographyTypes;
}

export const CheckBox: React.FC<CheckBoxProps>;
