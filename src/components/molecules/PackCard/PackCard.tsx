import { Container, Touchable } from 'components/atoms';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { RechargeAmount } from 'rtk';
import { TextContainer } from '../TextContainer';

interface Props {
  isSelect: boolean;
  amount: RechargeAmount;
  parentImage: string;
  onPress: (id: string) => void;
}

const PackCard: React.FC<Props> = ({ isSelect, amount, parentImage, onPress }) => {
  return (
    <Container
      row
      backgroundColor={isSelect ? '#E1ECE8' : theme.brandColor.iconn_white}
      style={isSelect ? styles.containerSelect : styles.containerNoSelect}
      space="between"
    >
      <Image source={{ uri: amount.imageUrl === null ? parentImage : amount.imageUrl }} style={{ height: 33, width: 96 }} />
      <Container row style={{ marginTop: 4 }}>
        <TextContainer text={'$' + amount.ammount} marginRight={40} marginTop={4} />
        <Touchable onPress={() => onPress(amount.id)}>
          <Container circle style={isSelect ? styles.circleSelect : styles.circleNoSelect}>
            {isSelect ? <Container circle style={styles.circleInteriorSelect} /> : null}
          </Container>
        </Touchable>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  circleNoSelect: {
    borderColor: theme.brandColor.iconn_med_grey,
    borderWidth: 1,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleSelect: {
    borderColor: theme.brandColor.iconn_green_original,
    borderWidth: 1,
    width: 24,
    height: 24,
    backgroundColor: theme.brandColor.iconn_white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerNoSelect: {
    borderRadius: 8,
    paddingVertical: 11,
    paddingLeft: 8,
    paddingRight: 16,
    marginBottom: 12
  },
  containerSelect: {
    borderRadius: 8,
    paddingVertical: 11,
    paddingLeft: 8,
    paddingRight: 16,
    marginBottom: 12,
    borderColor: theme.brandColor.iconn_green_original,
    borderWidth: 1
  },
  circleInteriorSelect: {
    width: 16,
    height: 16,
    backgroundColor: theme.brandColor.iconn_green_original
  }
});

export default PackCard;
