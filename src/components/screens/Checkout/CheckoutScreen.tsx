import React from 'react';
import { AuthDataInterface } from 'rtk';
import { WebView } from 'react-native-webview';
import { useToast } from 'context';

interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  user?: AuthDataInterface;
  orderFormId: string;
}

const ContactInformationScreen: React.FC<Props> = ({ onSubmit, goBack, user, orderFormId }) => {
  const toast = useToast();

  function onMessage(data: any) {
    toast.show({ message: `${data.nativeEvent.data}`, type: 'success' });
  }

  const onNavigationStateChange = (navState: any) => {
    console.log('navState from webview:');
    console.log(navState);
  };

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
};

export default ContactInformationScreen;
