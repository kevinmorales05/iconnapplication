import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { moderateScale } from 'utils/scaleMetrics';
import theme from 'components/theme/theme';

const CardProductSkeleton = () => (
  <SkeletonContent
    containerStyle={{
      width: moderateScale(160),
      minHeight: moderateScale(254),
      marginTop: moderateScale(16),
      marginLeft: moderateScale(8),
      borderRadius: moderateScale(10),
      padding: moderateScale(8),
      backgroundColor: theme.brandColor.iconn_white
    }}
    isLoading
    boneColor={theme.brandColor.iconn_light_grey}
    layout={[
      {
        key: 'bone1',
        width: moderateScale(80),
        minHeight: moderateScale(88),
        borderRadius: moderateScale(2),
        alignSelf: 'center'
      },
      {
        key: 'bone2',
        width: moderateScale(120),
        minHeight: moderateScale(16),
        borderRadius: moderateScale(2),
        marginTop: moderateScale(13),
        alignSelf: 'flex-start'
      },
      {
        key: 'bone3',
        width: moderateScale(85),
        minHeight: moderateScale(16),
        borderRadius: moderateScale(2),
        marginTop: moderateScale(4),
        alignSelf: 'flex-start'
      },
      {
        key: 'bone4',
        width: moderateScale(140),
        minHeight: moderateScale(16),
        borderRadius: moderateScale(2),
        marginTop: moderateScale(12),
        alignSelf: 'flex-start'
      },
      {
        key: 'bone5',
        width: moderateScale(53),
        minHeight: moderateScale(16),
        borderRadius: moderateScale(2),
        marginTop: moderateScale(24),
        alignSelf: 'flex-start'
      }
    ]}
  ></SkeletonContent>
);

export default CardProductSkeleton;
