import React from 'react';
import theme from 'components/theme/theme';
import { Container, Touchable } from 'components/atoms';
import { TextContainer } from '../TextContainer';
import Feather from 'react-native-vector-icons/Feather';
import { ICONN_INVOICING_GENERATED_INVOICE_PETRO, ICONN_INVOICING_GENERATED_INVOICE_SEVEN } from 'assets/images';
import { StyleProp, ViewStyle, Image, ImageStyle } from 'react-native';

export type CardDividedPropsType = 'petro' | 'seven';

interface CardDividedProps {
  typeImage?: CardDividedPropsType;
  onPressButtonRigth: () => void;
  onPressButtonLeft: () => void;
  textButtonRigth: string;
  textButtonLeft: string;
  actionText: string;
  textCard: string;
  rfcText: string;
}

const CardDivided: React.FC<CardDividedProps> = ({
  rfcText,
  actionText,
  textCard,
  typeImage,
  textButtonLeft,
  textButtonRigth,
  onPressButtonLeft,
  onPressButtonRigth
}: CardDividedProps) => {
  const TopContainer: StyleProp<ViewStyle> = {
    backgroundColor: theme.brandColor.iconn_white,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingHorizontal: 25,
    paddingTop: 18,
    paddingBottom: 15
  };

  const LowerContainer: StyleProp<ViewStyle> = {
    backgroundColor: theme.brandColor.iconn_white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderTopColor: theme.brandColor.iconn_light_grey
  };

  const CardDividedImageStyle: StyleProp<ImageStyle> = {
    width: typeImage === 'petro' ? 43 : 54,
    height: typeImage === 'petro' ? 52 : 54
  };

  const LowerLeftRightContainer: StyleProp<ViewStyle> = {
    paddingTop: 15,
    paddingBottom: 13
  };

  const Icon: StyleProp<ViewStyle> = {
    marginTop: 3,
    right: 6
  };

  return (
    <Container>
      <Container row center style={TopContainer}>
        <Image
          source={typeImage === 'petro' ? ICONN_INVOICING_GENERATED_INVOICE_PETRO : ICONN_INVOICING_GENERATED_INVOICE_SEVEN}
          style={CardDividedImageStyle}
        />
        <Container style={{ marginLeft: 22, marginBottom: 10 }}>
          <TextContainer text={rfcText} typography="h3" fontBold />
          <Container row>
            <TextContainer text={textCard} typography="h5" marginTop={6} />
            <TextContainer text={actionText} typography="h5" fontBold textColor={theme.brandColor.iconn_orange_original} marginTop={6} marginLeft={8} />
          </Container>
        </Container>
      </Container>
      <Container row style={LowerContainer}>
        <Touchable onPress={onPressButtonLeft} width="50%">
          <Container style={LowerLeftRightContainer} row middle>
            <Feather name="eye" size={24} color={theme.brandColor.iconn_dark_grey} style={Icon} />
            <TextContainer fontSize={theme.fontSize.h4} text={textButtonLeft} />
          </Container>
        </Touchable>
        <Container style={{ width: 1, backgroundColor: theme.brandColor.iconn_light_grey }} />
        <Touchable onPress={onPressButtonRigth} width="50%">
          <Container style={LowerLeftRightContainer} row middle>
            <Feather name="send" size={24} color={theme.brandColor.iconn_dark_grey} style={Icon} />
            <TextContainer fontSize={theme.fontSize.h4} text={textButtonRigth} />
          </Container>
        </Touchable>
      </Container>
    </Container>
  );
};

export default CardDivided;
