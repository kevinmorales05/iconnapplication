import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketPetroScreen from './InvoiceTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { deleteTicketPetroFromList, RootState, useAppDispatch, useAppSelector } from 'rtk';

const InvoiceTicketPetroController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingPetroTicketList } = useAppSelector((state: RootState) => state.invoicing);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    console.log('submit from controller Petro...');
    navigate('InvoiceGeneratedPetro');
  };

  const onPressAddNewTicket = () => navigate('AddTicketPetro');

  const editTicket: any = (ticket: any) => {
    console.log('Editing ticket Petro...', ticket);
  };

  const deleteTicket: any = (ticket: any, index: number) => {
    console.log('Deleting ticket...', ticket);
    console.log('Position...', index);
    dispatch(deleteTicketPetroFromList(index));
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <InvoiceTicketPetroScreen
        ticketsList={invoicingPetroTicketList}
        onPressEditTicket={editTicket}
        onPressDeleteTicket={deleteTicket}
        onSubmit={onSubmit}
        goBack={goBack}
        onPressAddNewTicket={onPressAddNewTicket}
      />
    </SafeArea>
  );
};

export default InvoiceTicketPetroController;
