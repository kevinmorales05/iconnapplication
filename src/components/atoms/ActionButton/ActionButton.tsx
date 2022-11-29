import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Platform, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import theme from 'components/theme/theme';
import { ActionButtonProps } from 'components/types/ActionButton';

const getContainerStyle = (props: ActionButtonProps) => {
  const { size, color, circle } = props;

  return {
    ...styles.container,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.brandColor[color],
    width: theme.actionButtonSize[size],
    height: circle ? theme.actionButtonSize[size] : theme.actionButtonHeight[size],
    borderRadius: circle ? theme.actionButtonSize[size] / 2 : 12
  };
};

const ActionButton: React.FC<ActionButtonProps> = ({ style, size = 'medium', color = 'iconn_accent_principal', circle = false, ...props }) => {
  ({ ...props } = { style, size, color, circle, ...props });

  const TouchableElement: any = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableElement {...props} onPress={props.onPress}>
      <View style={StyleSheet.flatten([getContainerStyle({ ...props }), style])}>
        {props.icon || <Feather name="plus" size={theme.iconSize[props.size]} color={props.iconColor || theme.brandColor.white} />}
      </View>
    </TouchableElement>
  );
};

ActionButton.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        elevation: 0
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 0
      },
      web: {
        // boxShadow: `${offsetWidth}px ${offsetHeight}px ${radius}px ${rgba}`
        boxShadow: '0 3px 5px rgba(0,0,0,0.10), 1px 2px 5px rgba(0,0,0,0.10)'
      }
    })
  }
});

export default ActionButton;
