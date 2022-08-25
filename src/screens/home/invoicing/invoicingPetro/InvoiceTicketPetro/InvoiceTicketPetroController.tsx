import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceTicketPetroScreen from './InvoiceTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { deleteTicketPetroFromList, RootState, useAppDispatch, useAppSelector, InvoicingProfileInterface } from 'rtk';
import { useAlert, useLoading, useToast } from 'context';
import { getInvoiceThunk } from 'rtk/thunks/invoicing.thunks';

const InvoiceTicketPetroController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading, invoicingProfileList, invoicingPetroTicketList } = useAppSelector((state: RootState) => state.invoicing);
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

  const manageGetInvoiceResponseCode = (responseCode: number): string => {
    switch (responseCode) {
      case 592:
        return 'El ticket no existe en el sistema.';
      case 580:
        return 'Ticket facturado anteriormente.';
      default:
        return 'unknown';
    }
  };

  // TODO: add double check to this!!
  const onSubmit = async (cfdi: string, paymentMethod: string) => {
    // TODO: remove this if:
    if (true) {
      navigate('InvoiceGeneratedPetro');
      return;
    }

    loader.show();
    try {
      const response = await dispatch(
        getInvoiceThunk({
          rfc: defaultProfile?.rfc.toString()!,
          establishment: 2,
          zipCode: defaultProfile?.zip_code.toString()!,
          taxRegime: defaultProfile?.tax_code_key.toString()!,
          businessName: defaultProfile?.business_name.toString()!,
          methodOfPayment: paymentMethod,
          invoicingProfileId: defaultProfile?.invoicing_profile_id.toString()!,
          tickets: invoicingPetroTicketList.map(t => t.ticketNo),
          store: '01'
        })
      ).unwrap();
      if (response.responseCode === 65) {
        navigate('InvoiceGeneratedPetro');
      } else {
        const errorMessage = manageGetInvoiceResponseCode(response.responseCode);
        if (errorMessage !== 'unknown') {
          toast.show({ message: errorMessage, type: 'error' });
          return;
        }
        console.log('un codigo nuevo en respuesta al getInvoice en Petro, agregalo!!! ===> ', response.responseCode);
        toast.show({ message: response.responseMessage, type: 'warning' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressAddNewTicket = () => navigate('AddTicketPetro', { ticket: undefined, position: undefined });
  const editTicket: any = (ticket: any, position: number) => navigate('AddTicketPetro', { ticket, position });

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
      />
    </SafeArea>
  );
};

export default InvoiceTicketPetroController;
