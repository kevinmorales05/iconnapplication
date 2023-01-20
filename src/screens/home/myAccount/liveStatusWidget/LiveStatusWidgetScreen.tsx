import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import WebView from 'react-native-webview';

interface Props {
  urlLive: string;
}

const LiveStatusWidgetScreen: React.FC<Props> = ({ urlLive }) => {
  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: moderateScale(0), paddingBottom: verticalScale(10) }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <WebView style={{ flex: 1 }} source={{ uri: urlLive }} />
    </SafeArea>
  );
};

export default LiveStatusWidgetScreen;
