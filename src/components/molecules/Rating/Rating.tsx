import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText } from 'components/atoms';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';
import { StarSvg } from 'components/svgComponents';
import { moderateScale } from 'utils/scaleMetrics';

interface RatingProps {
  ratingValue?: number;
}

const Rating: React.FC<RatingProps> = ({ ratingValue }: RatingProps) => {
  const rating = ratingValue ? ratingValue : 5;
  const arr: number[] = [1, 2, 3, 4, 5];
  const ratingToFill = Number.parseInt(rating + '');

  return (
    <Container>
      <Container style={styles.containerRating}>
        <Container row>
          {arr.map((value, idx) => {
            console.log(arr, 'Rating');
            return (
              <Container style={{ marginRight: moderateScale(2) }}>
                <StarSvg size={theme.iconSize.xsmall} color={value <= ratingToFill ? theme.brandColor.yellow_star : theme.brandColor.iconn_grey} />
              </Container>
            );
          })}
        </Container>
        <Container style={styles.containerText}>
          <CustomText fontSize={theme.fontSize.h5} text={`${rating}`} />
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
