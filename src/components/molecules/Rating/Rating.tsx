import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText } from 'components/atoms';
import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';

interface RatingProps {
  ratingValue?: number;
}

const { width } = Dimensions.get('window');
const dw = 350;
const scale = (size: number) => (width / dw) * size;
const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

const Rating: React.FC<RatingProps> = ({ ratingValue }: RatingProps) => {
  const rating = ratingValue ? ratingValue : 5;
  return (
    <Container>
      <Container style={styles.containerRating}>
        <Entypo name="star" size={theme.iconSize.xxsmall} color={theme.brandColor.iconn_green_original} />
        <Container style={styles.containerText}>
          <CustomText fontSize={theme.fontSize.h6} text={`${rating}`} />
        </Container>
      </Container>
    </Container>
  );
};

export default Rating;

const styles = StyleSheet.create({
  containerRating: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(9),
    alignItems: 'center'
  },
  containerText: {
    marginLeft: moderateScale(5)
  }
});
