import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { Touchable } from '../../atoms/Touchable';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';
import { ICONN_CARD_PETRO, ICONN_CARD_SEVEN } from 'assets/images';
import Octicons from 'react-native-vector-icons/Octicons';

export type CardBillingType = 'petro' | 'seven';

interface CardBillingProps {
  text: string;
  type: CardBillingType;
  disable?: boolean;
  onPress: () => void;
}

const CardBilling: React.FC<CardBillingProps> = ({ text, disable = false, type, onPress }: CardBillingProps) => {
  const cardBillingStyle: StyleProp<ViewStyle> = {
    opacity: disable ? 0.5 : 1,
    borderRadius: 8,
    backgroundColor: disable ? theme.brandColor.iconn_med_grey : theme.brandColor.iconn_white
  };

  const cardImageStyle: StyleProp<ImageStyle> = {
    width: type === 'petro' ? 88 : 103,
    height: type === 'petro' ? 37 : 19,
    marginRight: 25
  };

  return (
    <Touchable onPress={onPress}>
      <Container row space="between" height={86} style={cardBillingStyle} crossCenter center>
        <Container width={'85%'} flex row center space="between">
          <TextContainer text={text} marginLeft={24} />
          <Image source={type === 'petro' ? ICONN_CARD_PETRO : ICONN_CARD_SEVEN} style={cardImageStyle} />
        </Container>
        <Container width={'15%'} crossAlignment="end" style={{ marginRight: 20 }}>
          <Octicons name="chevron-right" size={24} color={theme.fontColor.dark} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default CardBilling;
