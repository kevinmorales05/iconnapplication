import React, { useState } from 'react';
import { AuthDataInterface, setShoppingCartInitialState, useAppDispatch } from 'rtk';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useToast } from 'context';
import { PartialState, StackNavigationState } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';

interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  reset: (param: StackNavigationState<HomeStackParams> | PartialState<StackNavigationState<HomeStackParams>>) => void;
  user?: AuthDataInterface;
  orderFormId: string;
}

const CheckoutScreen: React.FC<Props> = ({ onSubmit, goBack, reset, user, orderFormId }) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [ isPaySuccess, setPaySuccess ] = useState<boolean>(false);

  function onMessage(data: any) {
    toast.show({ message: `${data.nativeEvent.data}`, type: 'success' });
  }

  // TODO: relocate url to .ENV
  const onNavigationStateChange = (navState: WebViewNavigation) => {
    console.log({urlPay: navState.url})
    const paramsQuery = navState.url.split('/');
    setPaySuccess(paramsQuery.some((item) => item === 'congrats') && paramsQuery.some((item) => item === 'approved'))
    const urlParams = navState.url.split('https://nttdev--oneiconn.myvtex.com/_v/segment/admin-login/v1/login?')[1]?.split('=%2Fcheckout%2');
    if (urlParams) {
      if (urlParams[0] === 'returnUrl') {
        dispatch(setShoppingCartInitialState());
        reset({
          index: 0,
          routes: [{ name: 'Home', params: { paySuccess: isPaySuccess } }]
        });
        setPaySuccess(false);
      }
    }
  };

  // TODO: relocate url to .ENV
  return (
    <WebView
      onNavigationStateChange={onNavigationStateChange.bind(this)}
      source={{ uri: `https://nttdev--oneiconn.myvtex.com/checkout/?orderFormId=${orderFormId}#/cart` }}
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
