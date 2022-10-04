import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProductDetailScreen from './ProductDetailScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';

interface Props {
  productIdentifier?: string;
}

const ProductDetailController: React.FC<Props> = (productIdentifier) => {
  const route = useRoute<RouteProp<HomeStackParams, 'ProductDetail'>>();
  const {params} = route;
  console.log('identifier:::',params.productIdentifier);
  console.log(JSON.stringify(route,null,4));

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <ProductDetailScreen productIdentifier={params.productIdentifier} />
    </SafeArea>
  );
};

export default ProductDetailController;
