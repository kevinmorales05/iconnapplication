import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketPetroScreen from './InvoiceTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { deleteTicketPetroFromList, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { useAlert } from 'context';

const InvoiceTicketPetroController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingPetroTicketList } = useAppSelector((state: RootState) => state.invoicing);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const onSubmit = async (cfdi: string, paymentMethod: string) => {
    console.log('los campos para facturar Petro son:', cfdi, paymentMethod);
    navigate('InvoiceGeneratedPetro');
  };

  const onPressAddNewTicket = () => navigate('AddTicketPetro');

  const editTicket: any = (ticket: any) => {
    console.log('Editing ticket Petro...', ticket);
  };

  const deleteTicket: any = (ticket: any, index: number) => {
    console.log('Deleting ticket...', ticket);
    console.log('Position...', index);
    alert.show(
      {
        title: 'Borrar ticket',
        message: 'Deseas borrar el ticket capturado.',
        acceptTitle: 'Cancelar',
        cancelTitle: 'Borrar',
        cancelOutline: 'iconn_error',
        cancelTextColor: 'iconn_error',
        onCancel() {
          alert.hide();
          dispatch(deleteTicketPetroFromList(index));
        },
        onAccept() {
          alert.hide();
        }
      },
      'error'
    );
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
