import React, { useState, useEffect, useCallback } from 'react';
import { BasketCounter, Container, CustomText, SafeArea } from 'components';
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
import { moderateScale } from 'utils/scaleMetrics';
import { StyleSheet } from 'react-native';

const PromotionsController: React.FC = ({ navigation, route }: any) => {
  
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  

  /*
  const onPressBack = () => {
    navigate('SearchProducts');
  };*/

  React.useLayoutEffect(() => {
    console.log({routeEffect: route.name})
    if (!navigation || !route) return;

    // Get stack parent by id
    const homeStack = navigation.getParent('HomeStack');

    if (homeStack) {
      // Make sure the route name is "CategoriesScreen" before turn header off
      if (route.name === 'PromosScreen') {
        homeStack.setOptions({
          headerShown: false
        });
      }
    }
    // Turn header back on when unmount
    return homeStack
      ? () => {
          homeStack.setOptions({
            headerShown: true
          });
        }
      : undefined;
  }, [navigation, route]);


  useEffect(() => {
    //fetchData();
  }, []);



  const onPressOut = () => {
 
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0, paddingTop: theme.paddingHeader }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <Container row style={styles.containerHeaderBar}>
          <Container style={{ justifyContent: 'center' }} flex={0.12}/>
          <Container flex={0.67} style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: moderateScale(50) }}> 
            <CustomText
              text='Promociones'
              fontBold
              fontSize={theme.fontSize.h3}
            />
          </Container>
          <Container width={'100%'} flex={0.23} style={{ paddingLeft: moderateScale(10), height: moderateScale(25),  justifyContent: 'center' }}>
            <BasketCounter />
          </Container>
        </Container>
      <PromotionsScreen/>
    </SafeArea>
  );
};

export default PromotionsController;

const styles = StyleSheet.create({
  containerHeaderBar: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(11),
    borderBottomWidth: 1,
    borderBottomColor: theme.brandColor.iconn_med_grey
  }
});

