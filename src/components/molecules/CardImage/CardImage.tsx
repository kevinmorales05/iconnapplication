import React from 'react';
import { Container } from '../../atoms/Container';
import { Touchable } from '../../atoms/Touchable';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';

interface CardImageProps {
  image: string;
  disable?: boolean;
  onPress: () => void;
  position: number;
}

/**
 * Used component mainly in the ServicePaymentScreen.
 * @param CardImageProps
 * @returns A touchable container with an image using 2 columns, each one uses 50% of the main container.
 */
const CardImage: React.FC<CardImageProps> = ({ image, disable = false, onPress, position }: CardImageProps) => {
  const cardImageStyle: StyleProp<ImageStyle> = {
    width: '100%',
    height: '100%'
  };

  const cardContainerStyle: StyleProp<ViewStyle> = {
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    padding: 8
  };

  // TODO: We can implement "onError" for Image, in case the image cannot be obtained.
  return (
    <Touchable onPress={onPress} disabled={disable} marginLeft={position % 2 !== 0 ? '4%' : 0} marginBottom={16} width={'48%'}>
      <Container row space="between" height={80} style={cardContainerStyle} crossCenter center>
        <Image source={{ uri: image }} style={cardImageStyle} resizeMode="cover" />
      </Container>
    </Touchable>
  );
};

export default CardImage;
