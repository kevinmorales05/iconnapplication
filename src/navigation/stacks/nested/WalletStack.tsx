import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { Touchable } from 'components';
import PaybackController from 'screens/home/pointCards/payback/PaybackController';
import PaybackHelpScreen from 'screens/home/pointCards/payback/help/PaybackHelpScreen';
import PreferredController from 'screens/home/pointCards/preferente/PreferredController';
import PreferredHelpScreen from 'screens/home/pointCards/preferente/help/PreferredHelpScreen';
import UpdatePaybackController from 'screens/home/pointCards/payback/update/UpdatePaybackController';
import UpdatePreferredController from 'screens/home/pointCards/preferente/update/UpdatePreferredController';
import WalletHomeController from 'screens/home/wallet/WalletHome/WalletHomeController';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';

const WalletStack: React.FC = () => {
  const Stack = createNativeStackNavigator<WalletStackParams>();
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id="WalletStack" initialRouteName="WalletHome">
      <Stack.Screen options={{ title: 'Wallet' }} name="WalletHome" component={WalletHomeController} />
      <Stack.Screen
        name="Preferred"
        component={PreferredController}
        options={{
          headerTitle: 'ICONN Preferente',
          headerBackTitleVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                navigate('PreferredHelp');
              }}
            >
              <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
      <Stack.Screen
        name="UpdatePreferred"
        component={UpdatePreferredController}
        options={{
          headerTitle: 'Editar tarjeta',
          headerBackTitleVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                navigate('PreferredHelp');
              }}
            >
              <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
      <Stack.Screen
        name="Payback"
        component={PaybackController}
        options={{
          headerTitle: 'Monedero PAYBACK',
          headerBackTitleVisible: false,
          headerRight: () => (
            <Touchable
              onPress={() => {
                navigate('PaybackHelp');
              }}
            >
              <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
      <Stack.Screen
        name="UpdatePayback"
        component={UpdatePaybackController}
        options={{
          headerTitle: 'Editar tarjeta',
          headerBackTitleVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                navigate('PaybackHelp');
              }}
            >
              <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
      <Stack.Screen
        name="PreferredHelp"
        component={PreferredHelpScreen}
        options={{
          headerTitle: 'ICONN Preferente',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                navigate('Preferred');
              }}
            >
              <Icon name="close" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
      <Stack.Screen
        name="PaybackHelp"
        component={PaybackHelpScreen}
        options={{
          headerTitle: 'Monedero PAYBACK',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerRight: () => (
            <Touchable
              onPress={() => {
                navigate('Payback');
              }}
            >
              <Icon name="close" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
    </Stack.Navigator>
  );
};

export default WalletStack;
