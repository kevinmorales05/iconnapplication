import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import AddTicketSevenScreen from './AddTicketSevenScreen';
import { useLoading, useToast } from 'context';
import { FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_SEVEN_REFERENCE } from 'assets/images';
import {
  replaceTicketSevenFromList,
  addTicketSevenToList,
  InvoicingSevenTicketResponseInterface,
  RootState,
  useAppDispatch,
  useAppSelector,
  setInvoicingPaymentMethodForSevenTicketList,
  setInvoicingStoreForSevenTicketList
} from 'rtk';
import { getTicketThunk } from 'rtk/thunks/invoicing.thunks';

const AddTicketSevenController: React.FC<any> = ({ route }) => {
  const [Ticket, setTicket] = useState<InvoicingSevenTicketResponseInterface>();
  const [Position, setPosition] = useState<number>();

  useEffect(() => {
    if (route?.params) {
      setTicket(route.params.ticket);
      setPosition(route.params.position);
    }
  }, [route?.params]);

  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [helpVisible, setHelpVisible] = useState<boolean>(false);
  const toast = useToast();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading, invoicingSevenTicketList, invoicingPaymentMethodForSevenTicketList, invoicingStoreForSevenTicketList } = useAppSelector(
    (state: RootState) => state.invoicing
  );

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const isTheSameTicket = (barCode: string) => {
    const ticket = invoicingSevenTicketList.find(t => t.ticketNo === barCode);
    return !!ticket;
  };

  const onSubmit = async (fields: FieldValues) => {
    if (isTheSameTicket(fields.barCode)) {
      toast.show({ message: 'No has realizado cambios en el ticket, o el ticket ya está en el listado.', type: 'warning' });
      return;
    }
    loader.show();
    try {
      // establishment 2 = seven
      const response = await dispatch(getTicketThunk({ establishment: 2, ticket: fields.barCode })).unwrap();
      if (response.responseCode === 57) {
        if (!invoicingPaymentMethodForSevenTicketList && !invoicingStoreForSevenTicketList) {
          dispatch(setInvoicingPaymentMethodForSevenTicketList(response.data.paymentMethod));
          dispatch(setInvoicingStoreForSevenTicketList(response.data.store));
        } else {
          if (invoicingPaymentMethodForSevenTicketList !== response.data.paymentMethod) {
            toast.show({ message: 'El método de pago debe ser igual al del ticket anterior.', type: 'warning' });
            return;
          } else if (invoicingStoreForSevenTicketList !== response.data.store) {
            toast.show({ message: 'La sucursal debe ser igual a la del ticket anterior.', type: 'warning' });
            return;
          }
        }

        if (Position! >= 0) dispatch(replaceTicketSevenFromList({ ticket: response.data, position: Position! }));
        else dispatch(addTicketSevenToList(response.data));

        toast.show({ message: 'Ticket agregado correctamente.', type: 'success' });

        navigate('InvoiceTicketSeven');
      } else {
        toast.show({ message: `Error ${response.responseCode} \n ${response.responseMessage}`, type: 'error' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressHelpIcon = () => {
    setHelpVisible(true);
  };

  const onPressOut = () => {
    setHelpVisible(false);
  };

  const onPressScan = () => {
    navigate('CodeReader', {navigationDestiny: 'AddTicketSeven'});
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <AddTicketSevenScreen
        onSubmit={onSubmit}
        goBack={goBack}
        onPressScan={onPressScan}
        onPressQuestionButton={onPressHelpIcon}
        ticket={Ticket}
        position={Position}
      />
      <InvoicingHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        onUnderstood={onPressOut}
        message={`Puedes encontrar los 35 dígitos del código de\nbarras del ticket en tu comprobante físico.`}
        img={ICONN_INVOICING_SEVEN_REFERENCE}
      />
    </SafeArea>
  );
};

export default AddTicketSevenController;
