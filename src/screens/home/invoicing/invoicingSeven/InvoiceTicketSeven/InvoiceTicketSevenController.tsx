import React, { useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketSevenScreen from './InvoiceTicketSevenScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_PETRO_REFERENCE } from 'assets/images';

const InvoiceTicketSevenController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [helpVisible, setHelpVisible] = useState<boolean>(false);

  const onSubmit = () => {
    console.log('submit from controller...');
  };

  const onPressHelpIcon = () => {
    setHelpVisible(true);
  };

  const onPressOut = () => {
    console.log('hide modal...')        
    setHelpVisible(false);
  };

  const onPressScan = () => {
    console.log('onPressScan...')
  }

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <InvoiceTicketSevenScreen onSubmit={onSubmit} />
    </SafeArea>
  );
};

export default InvoiceTicketSevenController;
