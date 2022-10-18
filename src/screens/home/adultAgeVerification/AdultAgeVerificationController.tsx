import React, { useState } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import AdultAgeVerificationScreen from './AdultAgeVerificationScreen';

const AdultAgeVerificationController: React.FC = () => {
  const [helpVisible, setHelpVisible] = useState<boolean>(false);

  const onPressOut = () => {
    setHelpVisible(true);
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <AdultAgeVerificationScreen onPressClose={onPressOut}
        visible={helpVisible} />
    </SafeArea>
  );
};

export default AdultAgeVerificationController;
