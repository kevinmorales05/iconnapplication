import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: '100%',
    fontSize: theme.fontSize.h5,
    color: theme.fontColor.dark
  },
  containerInput: {
    width: '100%',
    height: verticalScale(120),
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_med_grey,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(14)
  }
});

export default styles;
