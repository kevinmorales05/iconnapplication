import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  containerStars: {
    marginTop: moderateScale(55)
  },
  containerButton: {
    marginTop: verticalScale(300),
    width: '100%'
  }
});

export default styles;
