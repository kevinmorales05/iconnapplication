import { ICONN_CREDIT_CARD } from 'assets/images';
import { TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container } from '../Container';
import { Touchable } from 'components';

interface Props {
  showPointCardsModal: () => void;
}

const EmptyCardsCard: React.FC<Props> = ({ showPointCardsModal }) => {
  return (
    <Container center crossCenter style={styles.containerCardDot}>
      <Touchable onPress={() => showPointCardsModal()}>
        <Container center>
          <Image source={ICONN_CREDIT_CARD} style={styles.cardIcon} />
          <TextContainer text="Agregar" fontBold fontSize={16} textColor={theme.fontColor.grey} />
        </Container>
      </Touchable>
    </Container>
  );
};

export default EmptyCardsCard;

const styles = StyleSheet.create({
  containerCardDot: {
    borderColor: theme.brandColor.iconn_grey,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginHorizontal: 50,
    marginTop: 16,
    paddingTop: 50,
    paddingBottom: 50,
    height: 164
    //width: 261
  },
  cardIcon: {
    height: 32,
    width: 32
  }
});
