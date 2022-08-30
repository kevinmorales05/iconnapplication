import { SafeArea } from 'components';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Barcode } from 'vision-camera-code-scanner';
import QrReaderScreen from './CodeReaderScreen';
import { HomeStackParams } from 'navigation/types';

const CodeReaderController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const onSubmit = (code: Barcode) => {
    navigate('AddTicketSeven', { ticket: { ticketNo: code }, position: undefined });
  };

  return (
    <SafeArea barStyle="dark">
      <QrReaderScreen onPressOk={onSubmit} />
    </SafeArea>
  );
};

export default CodeReaderController;
