import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProductDetailScreen from './ProductDetailScreen';


const ProductDetailController: React.FC = () => {
  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <ProductDetailScreen/>
    </SafeArea>
  );
};

export default ProductDetailController;
