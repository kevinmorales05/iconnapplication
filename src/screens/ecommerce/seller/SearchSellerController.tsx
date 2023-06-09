import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import SearchSellerScreen from 'screens/ecommerce/seller/SearchSellerScreen';

const SearchSellerController: React.FC = () => {
  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <SearchSellerScreen />
    </SafeArea>
  );
};

export default SearchSellerController;
