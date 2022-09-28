import React from 'react';
import { AuthDataInterface } from 'rtk';
import { WebView } from 'react-native-webview';

interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  user?: AuthDataInterface;
  orderFormId: string;
}

const ContactInformationScreen: React.FC<Props> = ({ onSubmit, goBack, user, orderFormId }) => {
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
  );
};

export default ContactInformationScreen;
