import React from 'react';
import { CheckBoxProps } from 'components/types/CheckBox';
import { View, TouchableOpacity, TouchableNativeFeedback, Platform, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from 'components/theme/theme';

const getTextStyle = (props: CheckBoxProps) => {
  const { fontSize, textColor, iconRight } = props;

  const textStyle: any = [
    {
      fontSize: theme.fontSize[fontSize!],
      color: theme.fontColor[textColor!],
      marginLeft: 5
    }
  ];
  if (iconRight) {
    textStyle.push({ marginLeft: 0, marginRight: 5 });
  }
  return textStyle;
};

const renderIcon = (props: CheckBoxProps) => {
  const { color } = props;
  return <Ionicons name={props.checked ? 'ios-checkbox' : 'ios-square-outline'} size={30} color={theme.brandColor[color]} />;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  size = 'medium',
  color = 'iconn_accent_principal',
  textColor = 'dark',
  fontSize = 'h5',
  style,
  textStyle,
  ...props
}) => {
  ({ ...props } = { size, color, textColor, fontSize, style, textStyle, ...props });

  const TouchableElement: any = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableElement {...props} disabled={false} onPress={props.onPress}>
      <View style={StyleSheet.flatten([styles.container, style])}>
        {!props.iconRight && renderIcon(props)}
        <Text style={StyleSheet.flatten([getTextStyle(props), textStyle])}>{props.children}</Text>
        {props.iconRight && renderIcon(props)}
      </View>
    </TouchableElement>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  }
});

export default CheckBox;
