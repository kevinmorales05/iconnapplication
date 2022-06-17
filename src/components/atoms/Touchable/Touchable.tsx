import React, { ReactNode } from 'react';
import {
  ColorValue,
  Platform, Pressable, TouchableOpacity, View, ViewStyle
} from 'react-native';
import theme from 'components/theme/theme';

export interface TouchableProps {
  children?: ReactNode;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  marginVertical?: ViewStyle['marginVertical'];
  marginHorizontal?: ViewStyle['marginHorizontal'];
  marginLeft?: ViewStyle['marginLeft'];
  marginRight?: ViewStyle['marginRight'];
  marginTop?: ViewStyle['marginTop'];
  marginBottom?: ViewStyle['marginBottom'];
  rounded?: boolean;
  flex?: boolean | number;
  effectEnable?: boolean;
  opacityEffect?: boolean;
  androidRippleColor?: ColorValue;
  hitSlop?: number;
  testID?: string;
}

const Touchable: React.FC<TouchableProps> = ({
  children,
  onPress,
  onPressIn,
  onPressOut,
  disabled,
  rounded,
  marginBottom,
  flex,
  marginTop,
  marginRight,
  marginLeft,
  marginHorizontal,
  marginVertical,
  effectEnable = true,
  opacityEffect,
  androidRippleColor = theme.brandColor.iconn_accent_principal,
  hitSlop,
  testID
}: TouchableProps) => (
  Platform.OS === 'ios' || opacityEffect ? (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={{
        bottom: hitSlop, left: hitSlop, right: hitSlop, top: hitSlop
      }}
      activeOpacity={effectEnable ? 0.2 : 1}
      style={{
        flex: typeof flex === 'boolean' && flex ? 1 : flex || 0,
        marginVertical,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        zIndex: 2
      }}
    >
      <View pointerEvents="none">
        {children}
      </View>
    </TouchableOpacity>
  ) : (
    <Pressable
      testID={testID}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      hitSlop={hitSlop}
      android_ripple={effectEnable ? {
        borderless: rounded,
        color: androidRippleColor,
        foreground: true
      } : null}
      style={{
        marginVertical,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom
      }}
    >
      <View pointerEvents="none" style={{ backgroundColor: 'transparent' }}>
        {children}
      </View>
    </Pressable>
  )
);

export default Touchable;
