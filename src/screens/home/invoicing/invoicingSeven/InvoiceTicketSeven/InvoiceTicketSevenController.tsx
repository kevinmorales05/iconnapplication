import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketSevenScreen from './InvoiceTicketSevenScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingSevenTicketResponseInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { deleteTicketSevenFromList } from 'rtk/slices/invoicingSlice';

const InvoiceTicketSevenController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingSevenTicketList } = useAppSelector((state: RootState) => state.invoicing);
  const dispatch = useAppDispatch();

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

  const editTicket: any = (ticket: any) => {
    console.log('Editing ticket...', ticket);
  };

  const deleteTicket: any = (ticket: any, index: number) => {
    console.log('Deleting ticket...', ticket);
    console.log('Position...', index);
    dispatch(deleteTicketSevenFromList(index));
  };

  // Harcoded list:
  // const ticketsList: InvoicingSevenTicketResponseInterface[] = [
  //   { paymentMethod: 'Cash', status: 3, store: 'tienda', ticketNo: '11112345645698712345698712345678999', ticketTotal: '345.56' },
  //   { paymentMethod: 'TDC', status: 3, store: 'tiendita', ticketNo: '22225645645698712345698712345678888', ticketTotal: '987.36' },
  //   { paymentMethod: 'Cash', status: 3, store: 'tienda', ticketNo: '11112345645698712345698712345678999', ticketTotal: '345.56' }
  // ];

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
