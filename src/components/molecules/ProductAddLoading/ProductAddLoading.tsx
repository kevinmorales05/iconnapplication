import React from 'react';
import { Container } from '../../atoms/Container';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import AnimatedLottieView from 'lottie-react-native';

interface ProductAddLoadingProps {
  isWhite: boolean;
}

const ProductAddLoading: React.FC<ProductAddLoadingProps> = ({ isWhite }: ProductAddLoadingProps) => {
  if (isWhite) {
    return (
      <Container style={styles.container}>
        <AnimatedLottieView
          style={{ width: moderateScale(150), height: verticalScale(150) }}
          source={require('../../../assets/images/loading-dots-green.json')}
          autoPlay
          loop
        />
      </Container>
    );
  } else {
    return (
      <Container style={styles.containerGreen}>
        <AnimatedLottieView
          style={{ width: moderateScale(150), height: verticalScale(150) }}
          source={require('../../../assets/images/loading-dots-white.json')}
          autoPlay
          loop
        />
      </Container>
    );
  }
};

export default ProductAddLoading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: moderateScale(10),
    padding: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.brandColor.iconn_med_grey,
    borderWidth: moderateScale(1),
    height: verticalScale(40)
  },
  containerGreen: {
    width: '100%',
    borderRadius: moderateScale(10),
    padding: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.brandColor.iconn_accent_principal,
    height: verticalScale(40)
  }
});
