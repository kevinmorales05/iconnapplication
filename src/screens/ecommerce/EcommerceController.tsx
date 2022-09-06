import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import EcommerceScreen from 'screens/ecommerce/EcommerceScreen';

const EcommerceController: React.FC = () => {
  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <EcommerceScreen />
    </SafeArea>
  );
};

export default EcommerceController;
