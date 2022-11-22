import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import PostalCodeScreen from 'screens/ecommerce/postalCode/PostalCodeScreen';

const PostalCodeController: React.FC = () => {
  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <PostalCodeScreen />
    </SafeArea>
  );
};

export default PostalCodeController;
