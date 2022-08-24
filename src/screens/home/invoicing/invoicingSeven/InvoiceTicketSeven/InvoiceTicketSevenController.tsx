import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketSevenScreen from './InvoiceTicketSevenScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { deleteTicketSevenFromList } from 'rtk/slices/invoicingSlice';

const InvoiceTicketSevenController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingSevenTicketList } = useAppSelector((state: RootState) => state.invoicing);
  const dispatch = useAppDispatch();

  const onSubmit = async (cfdi: string, paymentMethod: string) => {
    console.log('los campos para facturar seven son:', cfdi, paymentMethod);
    navigate('InvoiceGeneratedSeven');
  };

  const onPressAddNewTicket = () => navigate('AddTicketSeven');

  const editTicket: any = (ticket: any) => {
    console.log('Editing ticket...', ticket);
  };

  const deleteTicket: any = (ticket: any, index: number) => {
    console.log('Deleting ticket...', ticket);
    console.log('Position...', index);
    dispatch(deleteTicketSevenFromList(index));
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <InvoiceTicketSevenScreen
        ticketsList={invoicingSevenTicketList}
        onPressEditTicket={editTicket}
        onPressDeleteTicket={deleteTicket}
        onSubmit={onSubmit}
        goBack={goBack}
        onPressAddNewTicket={onPressAddNewTicket}
      />
    </SafeArea>
  );
};

export default InvoiceTicketSevenController;
