import React from 'react';
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
import ServicePaymentAddController from 'screens/home/myAccount/wallet/servicePayment/ServicePaymentAdd/ServicePaymentAddController';
import ServicePaymentController from 'screens/home/myAccount/wallet/servicePayment/ServicesPayments/ServicesPaymentsController';
import ServicePaymentGeneralInfoController from 'screens/home/myAccount/wallet/servicePayment/ServicePaymentGeneralInfo/ServicePaymentGeneralInfoController';
import ServicePaymentQRDetailController from 'screens/home/myAccount/wallet/servicePayment/ServicePaymentQRDetail/ServicePaymentQRDetailController';
import theme from 'components/theme/theme';
import UpdatePaybackController from 'screens/home/pointCards/payback/update/UpdatePaybackController';
import UpdatePreferredController from 'screens/home/pointCards/preferente/update/UpdatePreferredController';
import WalletHomeController from 'screens/home/myAccount/wallet/WalletHome/WalletHomeController';

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
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="UpdatePreferred"
        component={UpdatePreferredController}
        options={{
          headerTitle: 'Editar tarjeta',
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Payback"
        component={PaybackController}
        options={{
          headerTitle: 'Monedero PAYBACK',
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="UpdatePayback"
        component={UpdatePaybackController}
        options={{
          headerTitle: 'Editar tarjeta',
          headerBackTitleVisible: false
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
                navigate('Preferred', { addOrShow: 0, cardNumberToShow: '' });
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
                navigate('Payback', { addOrShow: 0, cardNumberToShow: '' });
              }}
            >
              <Icon name="close" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
      <Stack.Screen options={{ title: 'Pago de Servicios', headerBackTitleVisible: false }} name="ServicePayment" component={ServicePaymentController} />
      <Stack.Screen options={{ headerShown: false }} name="ServicePaymentGeneralInfo" component={ServicePaymentGeneralInfoController} />
      <Stack.Screen options={{ title: 'Agregar servicio', headerBackTitleVisible: false }} name="ServicePaymentAdd" component={ServicePaymentAddController} />
      <Stack.Screen options={{ title: 'QR', headerBackTitleVisible: false }} name="ServicePaymentQRDetail" component={ServicePaymentQRDetailController} />
    </Stack.Navigator>
  );
};

export default WalletStack;
