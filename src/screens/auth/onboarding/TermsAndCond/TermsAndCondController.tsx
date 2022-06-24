import React from 'react';
import TermsAndCondScreen from './TermsAndCondScreen';
import { SafeArea } from 'components/atoms/SafeArea';

const TermsAndCondController: React.FC = () => {
  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor="white"
      barStyle="dark"
    >
      <TermsAndCondScreen />
    </SafeArea>
  );
};

export default TermsAndCondController;
