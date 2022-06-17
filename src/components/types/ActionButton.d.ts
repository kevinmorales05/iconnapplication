import React from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { IconNode } from './icon-type';
import { SizeType } from './size-type';
import { BrandColorTypes } from './brand-color-type';

interface ActionButtonProps extends ViewProps {
  size?: SizeType;
  onPress: () => void;
  iconColor?: BrandColorTypes;
  color?: BrandColorTypes;
  icon?: IconNode;
  style?: StyleProp<ViewStyle>;
}

export const ActionButton: React.FC<ActionButtonProps>;
