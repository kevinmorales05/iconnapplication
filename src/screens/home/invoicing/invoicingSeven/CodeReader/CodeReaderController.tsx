import { SafeArea } from 'components';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Barcode } from 'vision-camera-code-scanner';
import QrReaderScreen from './CodeReaderScreen';
import { HomeStackParams } from 'navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
interface Props {
  navigationDestiny: string;
}
const CodeReaderController: React.FC<Props> = ({navigationDestiny}) => {
  const route = useRoute<RouteProp<HomeStackParams, 'CodeReader'>>();
  const { params } = route;
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const onSubmit = (code: Barcode) => {
    navigate(params.navigationDestiny, { ticket: { ticketNo: code }, position: undefined });
  };

  return (
    <SafeArea barStyle="dark">
      <QrReaderScreen onPressOk={onSubmit} />
    </SafeArea>
  );
};

export default CodeReaderController;
