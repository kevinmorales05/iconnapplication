import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';
import { HomeStackParams } from 'navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import LiveStatusWidgetScreen from './LiveStatusWidgetScreen';

const LiveStatusWidgetController: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'LiveStatusWidget'>>();
  const { urlLive } = route.params;

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: moderateScale(0) }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <LiveStatusWidgetScreen urlLive={urlLive} />
    </SafeArea>
  );
};

export default LiveStatusWidgetController;
