import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText } from 'components/atoms';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';
import { moderateScale } from 'utils/scaleMetrics';

interface PriceWithDiscountProps {
  price: number;
  oldPrice?: number;
}

const PriceWithDiscount: React.FC<PriceWithDiscountProps> = ({ price, oldPrice }: PriceWithDiscountProps) => {
  return (
    <Container>
      <Container style={styles.container}>
        <CustomText fontSize={theme.fontSize.h5} fontWeight={'900'} text={`$${price}`} />
        {oldPrice && oldPrice != price && (
          <Container style={styles.containerText}>
            <CustomText fontSize={theme.fontSize.h6} textColor={theme.fontColor.placeholder} text={`$${oldPrice}`} />
            <Container style={styles.containerLine} />
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default PriceWithDiscount;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(9),
    alignItems: 'center'
  },
  containerText: {
    marginLeft: moderateScale(5)
  },
  containerLine: {
    width: '100%',
    height: moderateScale(0.8),
    position: 'absolute',
    top: '45%',
    backgroundColor: theme.fontColor.placeholder
  }
});
