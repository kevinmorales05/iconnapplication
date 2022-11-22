import theme from 'components/theme/theme';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerModal: {
    width: moderateScale(280),
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    paddingTop: verticalScale(15),
    overflow: 'hidden'
  },
  containerButtonClose: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(15)
  },
  buttonClose: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: theme.brandColor.iconn_warm_grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerText: {
    width: '100%',
    alignItems: 'center',

    marginTop: verticalScale(5)
  },
  containerImage: {
    width: moderateScale(280),
    height: verticalScale(160),
    marginTop: verticalScale(15)
  },
  containerSubText: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(15)
  },
  containerDots: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(15),
    flexDirection: 'row'
  },
  dot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(4),
    backgroundColor: theme.brandColor.iconn_light_grey
  },
  dotSelect: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(4),
    backgroundColor: theme.brandColor.accent_secondary
  },
  image: {
    width: '100%',
    height: '100%'
  },
  containerSkip: {
    marginTop: moderateScale(30),
    width: '100%',
    height: verticalScale(70),
    backgroundColor: theme.brandColor.iconn_background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonSkip: {
    textDecorationLine: 'underline',
    textDecorationColor: theme.brandColor.iconn_accent_principal,
    fontSize: theme.fontSize.h5,
    fontWeight: 'bold',
    color: theme.fontColor.green
  }
});

export default styles;
