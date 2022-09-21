import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { Image, ImageSourcePropType, StyleProp, ViewStyle, Dimensions } from 'react-native';
import theme from '../../theme/theme';
import { Touchable } from '../../atoms/Touchable';

interface CardHorizontalProps {
  text: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const designWidth = 375;
const scaleCoefficient = width / designWidth;
const getScaledRoundedValue = (value: number) => Math.round(value * scaleCoefficient);

const CardHorizontal: React.FC<CardHorizontalProps> = ({ text, image, onPress }: CardHorizontalProps) => {
  const taxInfoStyle: StyleProp<ViewStyle> = {
    borderRadius: getScaledRoundedValue(10),
    marginTop: getScaledRoundedValue(12),
    height: getScaledRoundedValue(80),
    backgroundColor: theme.brandColor.iconn_white,
    width: getScaledRoundedValue(165) * scaleCoefficient
  };

  return (
    <>
      <Touchable onPress={onPress}>
        <Container row space="between" crossCenter center style={taxInfoStyle}>
          <Container flex crossCenter height={'100%'}>
            <Container style={{ marginLeft: getScaledRoundedValue(16), marginBottom: getScaledRoundedValue(12) }}>
              <TextContainer text={text} typography="h5" fontBold marginTop={8} />
            </Container>
          </Container>
          <Container flex={0.5} crossCenter center height={'100%'}>
            <Image source={image} resizeMode={'contain'} style={{ width: '100%', height: '100%' }} />
          </Container>
        </Container>
      </Touchable>
    </>
  );
};

export default CardHorizontal;
