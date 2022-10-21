import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { Image, ImageSourcePropType, StyleProp, ViewStyle, Dimensions } from 'react-native';
import theme from '../../theme/theme';
import { Touchable } from '../../atoms/Touchable';
import { moderateScale } from 'utils/scaleMetrics';

interface CardHorizontalProps {
  text: string;
  image: ImageSourcePropType;
  onPress: () => void;
}


const CardHorizontal: React.FC<CardHorizontalProps> = ({ text, image, onPress }: CardHorizontalProps) => {
  const taxInfoStyle: StyleProp<ViewStyle> = {
    borderRadius: moderateScale(10),
    marginTop: moderateScale(12),
    height: moderateScale(80),
    backgroundColor: theme.brandColor.iconn_white,
    width: moderateScale(170) 
  };

  return (
    <>
      <Touchable onPress={onPress}>
        <Container row space="between" crossCenter center style={taxInfoStyle}>
          <Container flex crossCenter height={'100%'}>
            <Container style={{ marginLeft: moderateScale(16), marginBottom: moderateScale(12) }}>
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
