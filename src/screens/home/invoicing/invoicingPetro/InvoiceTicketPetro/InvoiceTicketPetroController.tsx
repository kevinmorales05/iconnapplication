import React, { useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketPetroScreen from './InvoiceTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_PETRO_REFERENCE } from 'assets/images';

const InvoiceTicketPetroController: React.FC = () => {
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
      <InvoiceTicketPetroScreen onSubmit={onSubmit} />
    </SafeArea>
  );
};

export default InvoiceTicketPetroController;
