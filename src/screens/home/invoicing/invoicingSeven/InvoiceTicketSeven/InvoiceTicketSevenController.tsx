import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketSevenScreen from './InvoiceTicketSevenScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const InvoiceTicketSevenController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const onSubmit = () => {
    console.log('submit from controller Seven...');
    navigate('InvoiceGeneratedSeven');
  };

  const onPressAddNewTicket = () => {
    // console.log('TODO: navegar a agregar nuevo ticket')
    // navigate('AddTicketSeven');
    // TODO: in this case we need to research if is better a "navigate with params"...
    // rememeber that in the "Agregar Ticket Screen" we need arrive with the field empty when is the first navigation,
    // but when is a goBack the field should mantain the same value...
    goBack();
  };

  const onPressScan = () => {
    console.log('onPressScan...');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <InvoiceTicketSevenScreen onSubmit={onSubmit} goBack={goBack} onPressScan={onPressScan} onPressAddNewTicket={onPressAddNewTicket} />
    </SafeArea>
  );
};

export default InvoiceTicketSevenController;
