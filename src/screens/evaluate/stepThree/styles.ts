import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const styles = StyleSheet.create({
  containerPills: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: moderateScale(20)
  },
  containerButton: {
    marginTop: verticalScale(250),
    width: '100%'
  }
});

export default styles;
