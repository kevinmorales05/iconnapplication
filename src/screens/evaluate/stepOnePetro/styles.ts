import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: verticalScale(45),
    paddingBottom: verticalScale(100)
  },
  containerDiv: {
    width: '100%',
    marginTop: verticalScale(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerStroke: {
    width: moderateScale(120),
    height: verticalScale(1),
    backgroundColor: theme.brandColor.iconn_light_grey
  }
});

export default styles;
