import React, { useState, useEffect, useCallback } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import PromotionsScreen from './PromotionsScreen';
import { vtexPromotionsServices } from 'services/vtexPromotions.services';
import { getProductDetailById, getSkuFilesById } from 'services/vtexProduct.services';
import PriceWithDiscount from '../../../components/molecules/PriceWithDiscount/PriceWithDiscount';
import { RootState, useAppSelector } from 'rtk';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';
import { vtexProductsServices } from 'services';

const PromotionsController: React.FC = () => {
  
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  

  /*
  const onPressBack = () => {
    navigate('SearchProducts');
  };*/



  useEffect(() => {
    //fetchData();
  }, []);



  const onPressOut = () => {

  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PromotionsScreen onPressClose={onPressOut}
      />
    </SafeArea>
  );
};

export default PromotionsController;
