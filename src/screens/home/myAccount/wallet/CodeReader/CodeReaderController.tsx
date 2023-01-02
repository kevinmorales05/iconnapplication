import { SafeArea } from 'components';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Barcode } from 'vision-camera-code-scanner';
import QrReaderScreen from './CodeReaderScreen';
import { WalletStackParams } from 'navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
interface Props {
  navigationDestiny: string;
}
const CodeReaderController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<WalletStackParams, 'CodeReader'>>();
  const { params } = route;
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();

  const onSubmit = (code: Barcode) => {
    navigate(params.navigationDestiny, { barcode: code });
  };

  return (
    <SafeArea barStyle="dark">
      <QrReaderScreen onPressOk={onSubmit} />
    </SafeArea>
  );
};

export default CodeReaderController;
