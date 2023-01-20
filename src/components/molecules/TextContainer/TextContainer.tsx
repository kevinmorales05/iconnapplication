import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomTextProps, CustomText as Text } from '../../atoms/CustomText';

interface TextContainerProps extends CustomTextProps {
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
}

const TextContainer: React.FC<TextContainerProps> = ({
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  text,
  fontSize,
  fontWeight,
  typography,
  textColor,
  textAlign,
  fontBold,
  numberOfLines,
  transform,
  underline,
  allowFontScaling,
  spacing,
  lineHeight,
  testID
}: TextContainerProps) => (
  <Container
    style={{
      marginLeft, marginRight, marginTop, marginBottom, marginHorizontal, marginVertical
    }}
  >
    <Text
      testID={testID}
      text={text}
      fontSize={fontSize}
      fontWeight={fontWeight}
      typography={typography}
      textColor={textColor}
      textAlign={textAlign}
      fontBold={fontBold}
      numberOfLines={numberOfLines}
      transform={transform}
      underline={underline}
      allowFontScaling={allowFontScaling}
      spacing={spacing}
      lineHeight={lineHeight}
    />
  </Container>
);

export type { TextContainerProps }
export { TextContainer };
