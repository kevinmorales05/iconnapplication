import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  containerLogos: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(30)
  },
  containerLogoSelect: {
    width: moderateScale(156),
    height: verticalScale(80),
    borderRadius: moderateScale(10),
    backgroundColor: theme.brandColor.iconn_green_original_opacity,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_green_original,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerLogo: {
    width: moderateScale(156),
    height: verticalScale(80),
    borderRadius: moderateScale(10),
    backgroundColor: theme.brandColor.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_med_grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '60%',
    height: '60%'
  },
  containerOptions: {
    width: '100%'
  }
});

export default styles;
