import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import WalletHomeController from 'screens/home/wallet/WalletHome/WalletHomeController';

const WalletStack: React.FC = () => {
  const Stack = createNativeStackNavigator<WalletStackParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id="WalletStack" initialRouteName="WalletHome">
      <Stack.Screen options={{ title: 'Wallet' }} name="WalletHome" component={WalletHomeController} />
    </Stack.Navigator>
  );
};

export default WalletStack;
