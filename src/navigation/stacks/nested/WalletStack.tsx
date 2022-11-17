import React from 'react';
import { BackButton, RechargeHelpScreen } from 'components';
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
import WalletHomeController from 'screens/home/myAccount/wallet/WalletHome/WalletHomeController';
import ServicePaymentGeneralInfoController from 'screens/home/myAccount/wallet/servicePayment/ServicePaymentGeneralInfo/ServicePaymentGeneralInfoController';
import RechargesController from 'screens/home/myAccount/wallet/recharges/RechargesController';
import RechargeOperatorController from 'screens/home/myAccount/wallet/recharges/rechargeOperator/RechargeOperatorController';
import RechargeAmountController from 'screens/home/myAccount/wallet/recharges/rechargeAmounts/RechargeAmountController';
import RechargeQRController from 'screens/home/myAccount/wallet/recharges/rechargeQR/RechargeQRController';
import ServicePaymentController from 'screens/home/myAccount/wallet/servicePayment/ServicesPayments/ServicesPaymentsController';
import ServicePaymentAddController from 'screens/home/myAccount/wallet/servicePayment/ServicePaymentAdd/ServicePaymentAddController';
import ServicePaymentQRDetailController from 'screens/home/myAccount/wallet/servicePayment/ServicePaymentQRDetail/ServicePaymentQRDetailController';
import ServicePaymentEditController from 'screens/home/myAccount/wallet/servicePayment/ServicePaymentEdit/ServicePaymentEditController';

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
      <Stack.Screen options={{ title: 'Editar servicio', headerBackTitleVisible: false }} name="ServicePaymentEdit" component={ServicePaymentEditController} />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.servicePayment.slug, headerBackTitleVisible: false })}
        name="ServicePaymentQRDetail"
        component={ServicePaymentQRDetailController}
      />
      <Stack.Screen options={{ title: 'Recargas Tiempo Aire', headerBackTitleVisible: false }} name="Recharge" component={RechargesController} />
      <Stack.Screen
        name="RechargeHelp"
        component={RechargeHelpScreen}
        options={{
          headerTitle: 'Recargas',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerRight: () => (
            <Touchable
              onPress={() => {
                navigate('Recharge');
              }}
            >
              <Icon name="close" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
      />
      <Stack.Screen options={{ title: 'Agregar recarga', headerBackTitleVisible: false }} name="RechargeOperator" component={RechargeOperatorController} />
      <Stack.Screen options={{ title: 'Monto de recarga', headerBackTitleVisible: false }} name="RechargeAmounts" component={RechargeAmountController} />
      <Stack.Screen
        options={{
          headerTitle: 'Recarga',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <Touchable
              onPress={() => {
                navigate('WalletHome');
              }}
            >
              <Icon name="arrowleft" size={20} color={theme.brandColor.iconn_dark_grey} />
            </Touchable>
          )
        }}
        name="RechargeQR"
        component={RechargeQRController}
      />
    </Stack.Navigator>
  );
};

export default WalletStack;
