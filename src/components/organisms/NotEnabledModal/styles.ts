import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(40)
  },
  containerModal: {
    width: '100%',
    borderRadius: moderateScale(15),
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  containerButtonClose: {
    width: '100%',
    paddingHorizontal: moderateScale(15),
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  buttonClose: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    marginLeft: moderateScale(70),
    backgroundColor: theme.brandColor.iconn_warm_grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerText: {
    width: '100%',
    alignItems: 'center',
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(16)
  },
  containerButtons: {
    width: '100%',
    paddingBottom: verticalScale(15),
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(35),
    alignItems: 'center'
  },
  containerAir: {
    width: '100%',
    marginBottom: verticalScale(50)
  },
  containerHeader: {
    width: '100%',
    backgroundColor: theme.brandColor.iconn_error,
    height: moderateScale(15)
  }
});

export default styles;
