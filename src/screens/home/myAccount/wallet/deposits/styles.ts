import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  containerText: {
    marginTop: moderateScale(20)
  },
  containerInfo: {
    width: moderateScale(339),
    height: moderateScale(55),
    borderRadius: moderateScale(8),
    backgroundColor: theme.brandColor.yellow_container,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_warning,
    marginTop: moderateScale(40),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default styles;
