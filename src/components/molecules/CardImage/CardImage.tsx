import React from 'react';
import { Container } from '../../atoms/Container';
import { Touchable } from '../../atoms/Touchable';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';

interface CardImageProps {
  image: string;
  disable?: boolean;
  onPress: () => void;
}

const CardImage: React.FC<CardImageProps> = ({ image, disable = false, onPress }: CardImageProps) => {
  const cardImageStyle: StyleProp<ImageStyle> = {
    width: 80,
    height: 156
  };

  const cardContainerStyle: StyleProp<ViewStyle> = {
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white
  };

  return (
    <Touchable onPress={onPress} disabled={disable}>
      <Container row space="between" height={86} style={cardContainerStyle} crossCenter center>
        <Image source={{ uri: image }} style={cardImageStyle} />
      </Container>
    </Touchable>
  );
};

export default CardImage;
