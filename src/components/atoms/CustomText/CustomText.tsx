import React from 'react';
import {
  Text, TextStyle, StyleProp, StyleSheet, FlexAlignType
} from 'react-native';
import theme from 'components/theme/theme';
import { TypographyTypes } from '../../types/typography-type';

interface CustomTextProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
  textColor?: TextStyle['color'];
  typography?: TypographyTypes;
  fontBold?: boolean;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  numberOfLines?: number;
  transform?: TextStyle['textTransform'];
  underline?: boolean;
  allowFontScaling?: boolean;
  spacing?: number;
  lineHeight?: number;
  alignSelf?: FlexAlignType;
  testID?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  typography = 'paragraph',
  textColor,
  textAlign,
  fontBold,
  fontSize,
  fontWeight,
  numberOfLines,
  transform,
  underline,
  allowFontScaling,
  spacing,
  lineHeight,
  alignSelf,
  testID
}: CustomTextProps) => {
  const textStyle: StyleProp<TextStyle> = [];
  switch (typography) {
    case 'h1': textStyle.push(styles.h1); break;
    case 'h2': textStyle.push(styles.h2); break;
    case 'h3': textStyle.push(styles.h3); break;
    case 'h4': textStyle.push(styles.h4); break;
    case 'h5': textStyle.push(styles.h5); break;
    case 'h6': textStyle.push(styles.h6); break;
    case 'buttonDark': textStyle.push(styles.buttonDark); break;
    case 'buttonWhite': textStyle.push(styles.buttonWhite); break;
    case 'link': textStyle.push(styles.link); break;
    case 'paragraph': textStyle.push(styles.paragraph); break;
    case 'placeholder': textStyle.push(styles.placeholder); break;
    case 'description': textStyle.push(styles.description); break;
    case 'label': textStyle.push(styles.label); break;
    default: break;
  }

  if (fontSize) textStyle.push({ fontSize });
  if (textColor) textStyle.push({ color: textColor });
  if (fontBold) textStyle.push({ fontWeight: 'bold' });
  if (fontWeight) textStyle.push({ fontWeight });

  return (
    <Text
      testID={testID}
      style={[textStyle, {
        textAlign,
        textTransform: transform,
        textDecorationLine: underline ? 'underline' : 'none',
        letterSpacing: spacing,
        lineHeight,
        alignSelf
      }]}
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: theme.fontSize.h1,
    color: theme.fontColor.dark
  },
  h2: {
    fontSize: theme.fontSize.h2,
    color: theme.fontColor.dark
  },
  h3: {
    fontSize: theme.fontSize.h3,
    color: theme.fontColor.dark
  },
  h4: {
    fontSize: theme.fontSize.h4,
    color: theme.fontColor.dark
  },
  h5: {
    fontSize: theme.fontSize.h5,
    color: theme.fontColor.dark
  },
  h6: {
    fontSize: theme.fontSize.h6,
    color: theme.fontColor.dark
  },
  buttonDark: {
    fontSize: theme.fontSize.buttonDark,
    color: theme.fontColor.dark
  },
  buttonWhite: {
    fontSize: theme.fontSize.buttonWhite,
    color: theme.fontColor.dark
  },
  link: {
    fontSize: theme.fontSize.link,
    color: theme.fontColor.dark
  },    
  paragraph: {
    fontSize: theme.fontSize.paragraph,
    color: theme.fontColor.dark
  },
  placeholder: {
    fontSize: theme.fontSize.placeholder,
    color: theme.fontColor.dark
  },
  description: {
    fontSize: theme.fontSize.description,
    color: theme.fontColor.dark
  },
  label: {
    fontSize: theme.fontSize.label,
    color: theme.fontColor.dark
  }
});

export type { CustomTextProps };
export { CustomText };
