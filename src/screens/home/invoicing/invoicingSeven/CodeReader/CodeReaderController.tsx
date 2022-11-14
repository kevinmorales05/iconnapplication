import { SafeArea } from 'components';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Barcode } from 'vision-camera-code-scanner';
import QrReaderScreen from './CodeReaderScreen';
import { HomeStackParams } from 'navigation/types';
interface Props {
  navigationDestiny: string;
}
const CodeReaderController: React.FC = (navigationDestiny) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const onSubmit = (code: Barcode) => {
    navigate(navigationDestiny, { ticket: { ticketNo: code }, position: undefined });
  };

  return (
    <SafeArea barStyle="dark">
      <QrReaderScreen onPressOk={onSubmit} />
    </SafeArea>
  );
};

export default CodeReaderController;
