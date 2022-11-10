import React from 'react';
// import ServicePaymentController from 'screens/home/wallet/servicePayment/ServicePayment/ServicePaymentController';
import { BackButton } from 'components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Touchable } from 'components';
import { useNavigation } from '@react-navigation/native';
import { WalletStackParams } from 'navigation/types';
import Icon from 'react-native-vector-icons/AntDesign';
import PaybackController from 'screens/home/pointCards/payback/PaybackController';
import PaybackHelpScreen from 'screens/home/pointCards/payback/help/PaybackHelpScreen';
import PreferredController from 'screens/home/pointCards/preferente/PreferredController';
import PreferredHelpScreen from 'screens/home/pointCards/preferente/help/PreferredHelpScreen';
import theme from 'components/theme/theme';
import UpdatePaybackController from 'screens/home/pointCards/payback/update/UpdatePaybackController';
import UpdatePreferredController from 'screens/home/pointCards/preferente/update/UpdatePreferredController';
import WalletHomeController from 'screens/home/wallet/WalletHome/WalletHomeController';

const WalletStack: React.FC = () => {
  const Stack = createNativeStackNavigator<WalletStackParams>();
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { color: 'black', fontWeight: 'bold' },
        headerTintColor: `${theme.brandColor.iconn_accent_secondary}`,
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        headerBackImageSource: require('../../../assets/images/back-button/left_arrow.png')
      }}
      id="WalletStack"
      initialRouteName="WalletHome"
    >
      <Stack.Screen options={{ headerShown: true, title: 'Wallet', headerLeft: () => <BackButton /> }} name="WalletHome" component={WalletHomeController} />

      <Stack.Screen
        name="Preferred"
        component={PreferredController}
        options={{
          headerTitle: 'ICONN Preferente',
          headerBackTitleVisible: false,
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
                navigate('Preferred',{addOrShow:0, cardNumberToShow: ''});
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
                navigate('Payback',{addOrShow:0, cardNumberToShow: ''});
              }}
            >
              <Icon name="close" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />

      {/* <Stack.Screen options={{ title: 'Pago de Servicios' }} name="ServicePayment" component={ServicePaymentController} /> */}
    </Stack.Navigator>
  );
};

export default WalletStack;
