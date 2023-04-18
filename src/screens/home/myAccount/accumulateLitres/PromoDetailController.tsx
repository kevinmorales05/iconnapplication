import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import React from 'react';
import PromoDetailScreen from './promoDetail/PromoDetailScreen';

const PromoDetailController: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'PromoDetailLitres'>>();
  const { params } = route;

  return <PromoDetailScreen promo={params.promo} />;
};

export default PromoDetailController;
