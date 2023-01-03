import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_med_grey,
    backgroundColor: theme.brandColor.iconn_white,
    marginRight: moderateScale(10),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10)
  },
  containerSelect: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_accent_principal,
    backgroundColor: theme.brandColor.iconn_green_original_opacity,
    marginRight: moderateScale(10),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10)
  }
});

export default styles;
