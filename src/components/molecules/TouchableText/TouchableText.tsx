import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextContainer, TextContainerProps } from '../TextContainer';

export interface TouchableTextProps extends TextContainerProps {
  onPress: () => void;
}

const TouchableText: React.FC<TouchableTextProps> = ({
  onPress,
  text,
  textAlign,
  textColor,
  typography,
  fontSize,
  transform,
  fontBold,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  underline,
  allowFontScaling,
  spacing,
  lineHeight
}: TouchableTextProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      marginBottom, marginLeft, marginRight, marginTop
    }}
  >
    <TextContainer
      text={text}
      textAlign={textAlign}
      textColor={textColor}
      typography={typography}
      fontSize={fontSize}
      fontBold={fontBold}
      transform={transform}
      underline={underline}
      allowFontScaling={allowFontScaling}
      spacing={spacing}
      lineHeight={lineHeight}
    />
  </TouchableOpacity>
);

export default TouchableText;
