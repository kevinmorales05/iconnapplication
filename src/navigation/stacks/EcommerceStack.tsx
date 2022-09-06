import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BasketCounter, EcommerceHeader } from 'components';
import { EcommerceStackParams } from 'navigation/types';
import React from 'react';
import EcommerceController from 'screens/ecommerce/EcommerceController';
import PostalCodeController from 'screens/ecommerce/postalCode/PostalCodeController';
import SearchSellerController from 'screens/ecommerce/seller/SearchSellerController';
const EcommerceStack = createNativeStackNavigator<EcommerceStackParams>();

export default () => (
  <EcommerceStack.Navigator screenOptions={{ headerShown: true }} initialRouteName="PostalCode">
    <EcommerceStack.Screen
      options={{
        headerTitle: '',
        headerLeft: () => <EcommerceHeader />,
        headerRight: () => <BasketCounter />
      }}
      name="Ecommerce"
      component={EcommerceController}
    />
    <EcommerceStack.Screen name="PostalCode" options={{ title: '' }} component={PostalCodeController} />
    <EcommerceStack.Screen name="SearchSeller" options={{ title: 'Selecciona tienda' }} component={SearchSellerController} />
  </EcommerceStack.Navigator>
);
