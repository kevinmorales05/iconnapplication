import React, { useState } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import AdultAgeVerificationScreen from './AdultAgeVerificationScreen';

interface AdultAgeVerificationInterface {
  visible: boolean,
  onPressOut: () => void;
}
const AdultAgeVerificationController: React.FC<AdultAgeVerificationInterface> = ({ visible, onPressOut }: AdultAgeVerificationInterface) => {

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <AdultAgeVerificationScreen onPressClose={onPressOut}
        visible={visible} />
    </SafeArea>
  );
};

export default AdultAgeVerificationController;
