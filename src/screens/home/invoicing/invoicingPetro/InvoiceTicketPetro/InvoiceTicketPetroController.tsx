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
  setInvoicingStoreForPetroTicketList,
  resetInvoicingPetroTicketList
} from 'rtk';
import { useAlert, useLoading, useToast } from 'context';
import { forwardInvoiceThunk, getInvoiceThunk } from 'rtk/thunks/invoicing.thunks';
import { logEvent } from 'utils/analytics';

const InvoiceTicketPetroController: React.FC = () => {
  const { navigate, goBack, push } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading, invoicingProfileList, invoicingPetroTicketList, invoicingPaymentMethodForPetroTicketList, invoicingStoreForPetroTicketList } =
    useAppSelector((state: RootState) => state.invoicing);
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const loader = useLoading();
  const toast = useToast();
  const [defaultProfile, setDefaultProfile] = useState<InvoicingProfileInterface | null>(null);
  const { user } = useAppSelector((state: RootState) => state.auth);

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
  const onSubmit = async (cfdi: string) => {
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
          }),
          address: defaultProfile?.Address!
        })
      ).unwrap();
      // TODO we need add a ternary to convert establishment from 1 to petro
      // remove this "if":
      // if (response.responseCode !== 75) {
      //   navigate('InvoiceGeneratedPetro', { invoiceGenerated: { emissionDate: 'qwqwe', uuidInvoice: '123ASD', establishment: 'petro', total: '57.00' } });
      // }
      // return;
      if (response.responseCode === 75) {
        await dispatch(
          forwardInvoiceThunk({
            uuid: response.data.uuidInvoice ? response.data.uuidInvoice : undefined,
            emails: [defaultProfile?.email]
          })
        ).unwrap();
        dispatch(resetInvoicingPetroTicketList());
        navigate('InvoiceGeneratedPetro', { invoiceGenerated: response.data });
      } else {
        toast.show({ message: `${response.responseMessage}`, type: 'error' });
      }
    } catch (error) {
      // console.warn(error);
      // navigate('InvoiceGeneratedPetro', { invoiceGenerated: { emissionDate: 'qwqwe', uuidInvoice: '123ASD', establishment: 'petro', total: '57.00' } });
    }
  };

  const onPressAddNewTicket = () => {
    push('AddTicketPetro', { ticket: null, position: undefined });
    logEvent('invAddTicket', {
      id: user.id,
      description: 'Añadir otro ticket',
      origin: 'noFirst',
      type: 'Petro7'
    });
  };

  const editTicket: any = (ticket: any, position: number) => push('AddTicketPetro', { ticket, position });

  const deleteTicket: any = (ticket: any, index: number) => {
    logEvent('invRemoveTicket', {
      id: user.id,
      description: 'Quitar ticket Petro7',
      type: 'Petro7'
    });
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
          logEvent('invRemoveTicketYes', {
            id: user.id,
            description: 'Quitar ticket Petro7 "Si"',
            type: 'Petro7'
          });
        },
        onAccept() {
          alert.hide();
          logEvent('invRemoveTicketNo', {
            id: user.id,
            description: 'Quitar ticket Petro7 "No"',
            type: 'Petro7'
          });
        }
      },
      'error'
    );
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <InvoiceTicketPetroScreen
        invoicingProfileList={invoicingProfileList.filter(profile => profile.verified_mail === true)}
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
