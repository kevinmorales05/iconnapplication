import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import LegalScreen from './LegalScreen';

const LegalController: React.FC = () => {
  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <LegalScreen />
    </SafeArea>
  );
};

export default LegalController;
