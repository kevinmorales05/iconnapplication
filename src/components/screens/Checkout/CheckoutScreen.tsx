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

  // function onMessage(data: any) {
  //   toast.show({ message: `${data.nativeEvent.data}`, type: 'success' });
  // }

  // TODO: relocate url to .ENV

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
      dispatch(setShoppingCartInitialState());
      reset({
        index: 0,
        routes: [{ name: 'Home', params: { paySuccess: true } }]
      });
    }
  };

  // TODO: relocate url to .ENV
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
    //     <WebView
    //         scalesPageToFit={false}
    //         mixedContentMode="compatibility"
    //         onMessage={onMessage}
    //         source={{
    //           html: `
    //           <html>
    //           <head>
    //             <meta name="viewport" content="width=device-width, initial-scale=1" />
    //           </head>
    //           <body
    //             style="
    //               display: flex;
    //               justify-content: center;
    //               flex-direction: column;
    //               align-items: center;
    //             "
    //           >
    //             <button
    //             onclick="sendDataToReactNativeApp()"
    //               style="
    //                 padding: 20;
    //                 width: 200;
    //                 font-size: 20;
    //                 color: white;
    //                 background-color: #6751ff;
    //               "
    //             >
    //               Send Data To React Native App
    //             </button>
    //             <script>
    //               const sendDataToReactNativeApp = async () => {
    //                 window.ReactNativeWebView.postMessage('Hello!!! Data from WebView / Website');
    //               };
    //             </script>
    //           </body>
    //         </html>
    // `,
    //         }}
    //       />
  );

  // https://nttdev--oneiconn.myvtex.com/_v/segment/admin-login/v1/login?returnUrl=%2F%3F
};

export default CheckoutScreen;

//
