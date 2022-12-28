import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketSevenScreen from './InvoiceTicketSevenScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  deleteTicketSevenFromList,
  InvoicingProfileInterface,
  setInvoicingPaymentMethodForSevenTicketList,
  setInvoicingStoreForSevenTicketList,
  resetInvoicingSevenTicketList
} from 'rtk';
import { useAlert, useLoading, useToast } from 'context';
import { getInvoiceThunk } from 'rtk/thunks/invoicing.thunks';

const InvoiceTicketSevenController: React.FC = () => {
  const { navigate, goBack, push } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading, invoicingProfileList, invoicingSevenTicketList, invoicingPaymentMethodForSevenTicketList, invoicingStoreForSevenTicketList } =
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
    if (invoicingSevenTicketList.length === 0) {
      dispatch(setInvoicingPaymentMethodForSevenTicketList(''));
      dispatch(setInvoicingStoreForSevenTicketList(''));
    }
  }, [invoicingSevenTicketList]);

  const onSubmit = async (cfdi: string, paymentMethod: string) => {
    // TODO: remove this "if":
    // if (true) {
    //   navigate('InvoiceGeneratedSeven');
    //   return;
    // }

    console.log('establishment: ', 2);
    console.log('rfc: ', defaultProfile?.rfc);
    console.log('zipCode: ', defaultProfile?.zip_code);
    console.log('taxRegime: ', defaultProfile?.tax_code_key);
    console.log('businessName: ', defaultProfile?.business_name);
    console.log('methodOfPayment: ', invoicingPaymentMethodForSevenTicketList);
    console.log('store: ', invoicingStoreForSevenTicketList);
    console.log('invoicingProfileId: ', defaultProfile?.invoicing_profile_id);
    console.log('cfdiUse: ', cfdi);
    console.log(
      'tickets: ',
      invoicingSevenTicketList.map(t => t.ticketNo)
    );

    loader.show();
    try {
      const response = await dispatch(
        getInvoiceThunk({
          establishment: 2,
          rfc: defaultProfile?.rfc!,
          zipCode: defaultProfile?.zip_code!,
          taxRegime: defaultProfile?.tax_code_key!,
          businessName: defaultProfile?.business_name!,
          methodOfPayment: invoicingPaymentMethodForSevenTicketList,
          store: invoicingStoreForSevenTicketList,
          invoicingProfileId: defaultProfile?.invoicing_profile_id!,
          cfdiUse: cfdi,
          tickets: invoicingSevenTicketList.map(t => t.ticketNo),
          address: defaultProfile?.Address!,
        })
      ).unwrap();
      // TODO we need add a ternary to convert establishment from 2 to seven
      // remove this "if":
      // if (response.responseCode !== 75) {
      //   navigate('InvoiceGeneratedSeven', { invoiceGenerated: { emissionDate: 'qwqwe', uuidInvoice: '123ASD', establishment: 'seven', total: '17.00' } });
      // }
      // return;
      if (response.responseCode === 75) {
        dispatch(resetInvoicingSevenTicketList());
        navigate('InvoiceGeneratedSeven', { invoiceGenerated: response.data });
      } else {
        toast.show({ message: `Error ${response.responseCode} \n ${response.responseMessage}`, type: 'error' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressAddNewTicket = () => push('AddTicketSeven', { ticket: null, position: undefined });

  const editTicket: any = (ticket: any, position: number) => push('AddTicketSeven', { ticket, position });

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
          dispatch(deleteTicketSevenFromList(index));
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
      <InvoiceTicketSevenScreen
        invoicingProfileList={invoicingProfileList}
        defaultProfile={defaultProfile!}
        ticketsList={invoicingSevenTicketList}
        onPressEditTicket={editTicket}
        onPressDeleteTicket={deleteTicket}
        onSubmit={onSubmit}
        goBack={goBack}
        onPressAddNewTicket={onPressAddNewTicket}
        paymentMethod={invoicingPaymentMethodForSevenTicketList}
      />
    </SafeArea>
  );
};

export default InvoiceTicketSevenController;
