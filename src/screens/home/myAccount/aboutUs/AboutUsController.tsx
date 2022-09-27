import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import AboutUsScreen from './AboutUsScreen';

const AboutUsController: React.FC = () => {
  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <AboutUsScreen />
    </SafeArea>
  );
};

export default AboutUsController;
