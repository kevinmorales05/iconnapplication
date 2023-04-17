import React from 'react';
import { AuthDataInterface, setShoppingCartInitialState, useAppDispatch } from 'rtk';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { PartialState, StackNavigationState } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import config from 'react-native-config';
import { Platform } from 'react-native';

interface Props {
  reset: (param: StackNavigationState<HomeStackParams> | PartialState<StackNavigationState<HomeStackParams>>) => void;
  user?: AuthDataInterface;
  orderFormId: string;
}

const CheckoutScreen: React.FC<Props> = ({ reset, user, orderFormId }) => {
  const dispatch = useAppDispatch();
  const { CHECKOUT_WEBVIEW } = config;

  const evaluateAndroid = (url: string) => {
    const paramsQuery = url.split('/');
    if (paramsQuery.some(param => param === 'checkout') && paramsQuery.some(param => param === 'orderPlaced')) {
      const orderId = paramsQuery[5].split('=');
      if (orderId[0] === '?og') {
        return true;
      }
    }
    return false;
  };

  const evaluateiOS = (url: string) => {
    const paramsQuery = url.split('/');
    if (
      paramsQuery.some(param => param === 'checkout') &&
      paramsQuery.some(param => param === 'gatewayCallback') &&
      paramsQuery.some(param => param === 'Success')
    ) {
      return true;
    }
    return false;
  };

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    let isSuccess: boolean;
    if (Platform.OS === 'android') {
      isSuccess = evaluateAndroid(navState.url);
    } else {
      isSuccess = evaluateiOS(navState.url);
    }
    if (isSuccess) {
      reset({
        index: 0,
        routes: [{ name: 'Home', params: { paySuccess: true } }]
      });
    }
  };

  console.log('authcookie ', user?.authCookie?.Name);
  console.log('authcookie value ', user?.authCookie?.Value);
  console.log('account authcookie ', user?.accountAuthCookie?.Name);
  console.log('account authcookie value ', user?.accountAuthCookie?.Value);

  return (
    <WebView
      onNavigationStateChange={onNavigationStateChange.bind(this)}
      source={{
        uri: `${CHECKOUT_WEBVIEW!}${orderFormId}#/payment`,
        headers: {
          Cookie: user?.authCookie?.Name + '=' + user?.authCookie?.Value + '; ' + user?.accountAuthCookie?.Name + '=' + user?.accountAuthCookie?.Value + ';'
        }
      }}
      bounces={false}
    />
  );
};

export default CheckoutScreen;

//
