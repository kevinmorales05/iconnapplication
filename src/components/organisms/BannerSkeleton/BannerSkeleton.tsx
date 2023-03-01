import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { moderateScale } from 'utils/scaleMetrics';
import theme from 'components/theme/theme';
import { useWindowDimensions } from 'react-native';

interface CardSkeletonProps {
  notMarinLeft: boolean;
}

const BannerSkeleton = ({ notMarinLeft }: CardSkeletonProps) => {
  const { width } = useWindowDimensions();
  return (
    <SkeletonContent
      containerStyle={{
        width: width - moderateScale(10),
        height: moderateScale(160),
        marginTop: moderateScale(16),
        marginLeft: moderateScale(notMarinLeft ? 0 : 8),
        borderRadius: moderateScale(10),
        padding: moderateScale(8),
        backgroundColor: theme.brandColor.iconn_white
      }}
      isLoading
      boneColor={theme.brandColor.iconn_light_grey}
      layout={[
        {
          key: 'bone1',
          width: '100%',
          minHeight: moderateScale(100),
          borderRadius: moderateScale(2),
          alignSelf: 'center'
        },
        {
          key: 'bone2',
          width: '100%',
          minHeight: moderateScale(16),
          borderRadius: moderateScale(2),
          marginTop: moderateScale(13),
          alignSelf: 'flex-start'
        },
        {
          key: 'bone3',
          width: '100%',
          minHeight: moderateScale(16),
          borderRadius: moderateScale(2),
          marginTop: moderateScale(8),
          alignSelf: 'flex-start'
        }
      ]}
    />
  );
};

export default BannerSkeleton;
