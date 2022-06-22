import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
  StyleSheet
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from 'components/theme/theme';
import { CheckBoxProps } from 'components/types/CheckBox';

const getTextStyle = (props: CheckBoxProps) => {
  const { fontSize, textColor, iconRight } = props;

  const textStyle = [
    {
      fontSize: theme.fontSize[fontSize],
      color: theme.fontColor[textColor],
      marginLeft: 5
    }
  ];
  if (iconRight) {
    textStyle.push({
      marginLeft: 0,
      marginRight: 5
    });
  }
  return textStyle;
};

const renderIcon = (props: CheckBoxProps) => {
  const { style, size, color } = props;

  if (props.checked) {
    return (
      props.checkedIcon || (
        <MaterialIcons
          name="check-box"
          size={theme.size[size] * 1.5}
          color={theme.brandColor[color]}
        />
      )
    );
  } else {
    return (
      props.uncheckedIcon || (
        <MaterialIcons
          name="check-box-outline-blank"
          size={theme.size[size] * 1.5}
          color={theme.brandColor[color]}
        />
      )
    );
  }
};

const CheckBox: React.FC<CheckBoxProps> = ({
  size = 'medium',
  color = 'iconn_accent_principal',
  textColor = 'dark',
  fontSize = 'h4',
  style,
  textStyle,
  ...props
}) => {
  ({ ...props } = { size, color, textColor, style, textStyle, ...props });

  const TouchableElement: any =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableElement {...props} disabled={false} onPress={props.onPress}>
      <View style={StyleSheet.flatten([styles.container, style])}>
        {!props.iconRight && renderIcon(props)}
        <Text style={StyleSheet.flatten([getTextStyle(props), textStyle])}>
          {props.children}
        </Text>
        {props.iconRight && renderIcon(props)}
      </View>
    </TouchableElement>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default CheckBox;
