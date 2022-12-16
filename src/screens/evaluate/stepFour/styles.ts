import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  containerStars: {
    marginTop: moderateScale(55)
  },
  containerButton: {
    marginTop: verticalScale(80),
    width: '100%'
  },
  containerStroke: {
    width: moderateScale(160),
    height: verticalScale(1),
    backgroundColor: theme.brandColor.iconn_med_grey,
    marginTop: verticalScale(50),
    marginBottom: verticalScale(40)
  },
  containerInput: {
    height: verticalScale(140)
  }
});

export default styles;
