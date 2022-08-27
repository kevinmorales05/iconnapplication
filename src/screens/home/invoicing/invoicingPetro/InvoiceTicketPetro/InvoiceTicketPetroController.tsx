import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketPetroScreen from './InvoiceTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import {
  deleteTicketPetroFromList,
  RootState,
  useAppDispatch,
  useAppSelector,
  InvoicingProfileInterface,
  setInvoicingPaymentMethodForPetroTicketList,
  setInvoicingStoreForPetroTicketList
} from 'rtk';
import { useAlert, useLoading, useToast } from 'context';
import { getInvoiceThunk } from 'rtk/thunks/invoicing.thunks';

const InvoiceTicketPetroController: React.FC = () => {
  const { navigate, goBack, push } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading, invoicingProfileList, invoicingPetroTicketList, invoicingPaymentMethodForPetroTicketList, invoicingStoreForPetroTicketList } =
    useAppSelector((state: RootState) => state.invoicing);
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const loader = useLoading();
  const toast = useToast();
  const [defaultProfile, setDefaultProfile] = useState<InvoicingProfileInterface | null>(null);

  useEffect(() => {
    setDefaultProfile(
      invoicingProfileList.find(item => {
        return item.default === true;
      }) ?? null
    );
  }, [invoicingProfileList]);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  useEffect(() => {
    if (invoicingPetroTicketList.length === 0) {
      dispatch(setInvoicingPaymentMethodForPetroTicketList(''));
      dispatch(setInvoicingStoreForPetroTicketList(''));
    }
  }, [invoicingPetroTicketList]);

  // TODO: add double check to this!!
  const onSubmit = async (cfdi: string, paymentMethod: string) => {
    // TODO: remove this "if":
    // if (true) {
    //   navigate('InvoiceGeneratedPetro');
    //   return;
    // }

    console.log('establishment: ', 2);
    console.log('rfc: ', defaultProfile?.rfc);
    console.log('zipCode: ', defaultProfile?.zip_code);
    console.log('taxRegime: ', defaultProfile?.tax_code_key);
    console.log('businessName: ', defaultProfile?.business_name);
    console.log('methodOfPayment: ', invoicingPaymentMethodForPetroTicketList);
    console.log('store: ', invoicingStoreForPetroTicketList);
    console.log('invoicingProfileId: ', defaultProfile?.invoicing_profile_id);
    console.log('cfdiUse: ', cfdi);
    console.log(
      'tickets: ',
      invoicingPetroTicketList.map(t => {
        const { ticketNo: folio, station, webId, date } = t;
        return { folio, station, webId, date };
      })
    );

    loader.show();
    try {
      const response = await dispatch(
        getInvoiceThunk({
          establishment: 1,
          rfc: defaultProfile?.rfc!,
          zipCode: defaultProfile?.zip_code!,
          taxRegime: defaultProfile?.tax_code_key!,
          businessName: defaultProfile?.business_name!,
          methodOfPayment: invoicingPaymentMethodForPetroTicketList,
          store: invoicingStoreForPetroTicketList,
          invoicingProfileId: defaultProfile?.invoicing_profile_id!,
          cfdiUse: cfdi,
          tickets: invoicingPetroTicketList.map(t => {
            const { ticketNo: folio, station, webId, date } = t;
            return { folio, station, webId, date };
          })
        })
      ).unwrap();
      if (response.responseCode === 75) {
        navigate('InvoiceGeneratedPetro');
      } else {
        toast.show({ message: `Error ${response.responseCode} \n ${response.responseMessage}`, type: 'error' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressAddNewTicket = () => push('AddTicketPetro', { ticket: null, position: undefined });

  const editTicket: any = (ticket: any, position: number) => push('AddTicketPetro', { ticket, position });

  const deleteTicket: any = (ticket: any, index: number) => {
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
          toast.show({ message: 'Ticket borrado correctamente.', type: 'success' });
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
        invoicingProfileList={invoicingProfileList}
        defaultProfile={defaultProfile!}
        ticketsList={invoicingPetroTicketList}
        onPressEditTicket={editTicket}
        onPressDeleteTicket={deleteTicket}
        onSubmit={onSubmit}
        goBack={goBack}
        onPressAddNewTicket={onPressAddNewTicket}
        paymentMethod={invoicingPaymentMethodForPetroTicketList}
      />
    </SafeArea>
  );
};

export default InvoiceTicketPetroController;
