import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import AddTicketPetroScreen from './AddTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_PETRO_REFERENCE } from 'assets/images';
import { FieldValues } from 'react-hook-form';
import { useLoading, useToast } from 'context';
import {
  replaceTicketPetroFromList,
  addTicketPetroToList,
  InvoicingPetroTicketResponseInterface,
  RootState,
  useAppDispatch,
  useAppSelector,
  setInvoicingPaymentMethodForPetroTicketList,
  setInvoicingStoreForPetroTicketList
} from 'rtk';
import { getTicketThunk } from 'rtk/thunks/invoicing.thunks';
import { formatDate } from 'utils/functions';
import moment from 'moment';

const AddTicketPetroController: React.FC<any> = ({ route }) => {
  const [Ticket, setTicket] = useState<InvoicingPetroTicketResponseInterface>();
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
  const { loading, invoicingPetroTicketList, invoicingPaymentMethodForPetroTicketList, invoicingStoreForPetroTicketList } = useAppSelector(
    (state: RootState) => state.invoicing
  );

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const isTheSameTicket = (station: string, folio: string, webId: string, date: string) => {
    const ticket = invoicingPetroTicketList.find(t => t.ticketNo === folio && t.date === date && t.webId === webId && t.station === station);
    return !!ticket;
  };

  const onSubmit = async (fields: FieldValues) => {
    if (invoicingPetroTicketList.length > 0) {
      if (!!!invoicingPetroTicketList.find(t => t.station === fields.station)) {
        toast.show({ message: 'La estación debe ser igual a la del ticket anterior.', type: 'warning' });
        return;
      }
      if (!!invoicingPetroTicketList.find(t => t.ticketNo === fields.folio)) {
        toast.show({ message: 'El folio debe ser diferente al del ticket anterior.', type: 'warning' });
        return;
      }
    }
    const dateMomentObject = moment(fields.ticketDate, 'DD/MM/YYYY');
    const dateObject = dateMomentObject.toDate();

    if (isTheSameTicket(fields.station, fields.folio, fields.webId, formatDate(dateObject, "yyyy'-'MM'-'dd'T'HH':'mm':'ss"))) {
      toast.show({ message: 'No has realizado cambios en el ticket, o el ticket ya está en el listado.', type: 'warning' });
      return;
    }

    loader.show();
    try {
      // establishment 1 = petro
      const response = await dispatch(
        getTicketThunk({
          establishment: 1,
          date: formatDate(dateObject, "yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
          folio: fields.folio,
          station: fields.station,
          webId: fields.webId
        })
      ).unwrap();
      if (response.responseCode === 57) {
        if (!invoicingPaymentMethodForPetroTicketList && !invoicingStoreForPetroTicketList) {
          dispatch(setInvoicingPaymentMethodForPetroTicketList(response.data.paymentMethod));
          dispatch(setInvoicingStoreForPetroTicketList(response.data.station));
        } else if (invoicingPaymentMethodForPetroTicketList !== response.data.paymentMethod) {
          toast.show({ message: 'El método de pago debe ser igual al del ticket anterior.', type: 'warning' });
          return;
        }

        if (Position! >= 0) dispatch(replaceTicketPetroFromList({ ticket: response.data, position: Position! }));
        else dispatch(addTicketPetroToList(response.data));

        toast.show({ message: 'Ticket agregado correctamente.', type: 'success' });

        navigate('InvoiceTicketPetro');
      } else {
        toast.show({ message: `Error ${response.responseCode} \n ${response.responseMessage}`, type: 'error' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressHelpIcon = () => setHelpVisible(true);

  const onPressOut = () => setHelpVisible(false);

  const onPressScan = () => {
    console.log('onPressScan Petro...');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <AddTicketPetroScreen
        onSubmit={onSubmit}
        goBack={goBack}
        onPressQuestionButton={onPressHelpIcon}
        onPressScan={onPressScan}
        ticket={Ticket}
        position={Position}
      />
      <InvoicingHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        onUnderstood={onPressOut}
        message={`Puedes encontrar la estación, folio y el web ID\ndel ticket a facturar en tu comprobante físico.`}
        img={ICONN_INVOICING_PETRO_REFERENCE}
      />
    </SafeArea>
  );
};

export default AddTicketPetroController;
