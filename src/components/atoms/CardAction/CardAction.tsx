import React from 'react';
import { Container } from '../../atoms/Container';
import { Touchable } from '../../atoms/Touchable';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import { TextContainer } from '../../molecules/TextContainer';

interface CardActiongProps {
  text: string;
  onPress: () => void;
  icon: React.ReactNode;
}

const CardAction: React.FC<CardActiongProps> = ({ text, onPress, icon }: CardActiongProps) => {
  const CardActiongPropsStyle: StyleProp<ViewStyle> = {
    borderRadius: 8,
    backgroundColor: 'white'
  };
  const IconStyle: StyleProp<ImageStyle> = {
    paddingHorizontal: 12
  };

  return (
    <Touchable onPress={onPress}>
      <Container row height={73} style={CardActiongPropsStyle} crossCenter center>
        <Container width={'100%'} flex row center style={IconStyle}>
          {icon}
          <TextContainer text={text} marginLeft={8} fontSize={theme.fontSize.h4} />
        </Container>
        <Container width={'15%'} crossAlignment="end" style={{ marginRight: 20 }}>
          <Octicons name="chevron-right" size={26} color={theme.fontColor.dark} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default CardAction;
