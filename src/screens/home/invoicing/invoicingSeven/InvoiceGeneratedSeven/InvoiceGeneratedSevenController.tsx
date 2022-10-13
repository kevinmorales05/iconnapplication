import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoiceGeneratedScreen, ResendInvoice } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingProfileInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { FieldValues } from 'react-hook-form';
import { useLoading, useToast, useAlert } from 'context';
import { forwardInvoiceThunk } from 'rtk/thunks/invoicing.thunks';

const InvoiceGeneratedSevenController: React.FC<any> = ({ route }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading, invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const [defaultProfile, setDefaultProfile] = useState<InvoicingProfileInterface | null>(null);
  const [resendInvoiceVisible, setResendInvoiceVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const toast = useToast();
  const alert = useAlert();

  useEffect(() => {
    setDefaultProfile(
      invoicingProfileList.find(item => {
        return item.default === true;
      }) ?? null
    );
  }, []);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const goToHome = () => navigate('Home');
  const goToNewInvoice = () => navigate('AddTicketSeven', { ticket: undefined, position: undefined });
  const goToViewerPDF = () => navigate('ViewInvoiceGeneratedSeven', { invoiceGenerated: route.params ? route.params.invoiceGenerated : undefined });
  const onPressOut = () => setResendInvoiceVisible(false);
  const onPressResend = () => setResendInvoiceVisible(true);

  const resendGeneratedInvoice = async (fields: FieldValues) => {
    setResendInvoiceVisible(false);
    loader.show();
    try {
      const response = await dispatch(
        forwardInvoiceThunk({
          uuid: route.params ? route.params.invoiceGenerated.uuidInvoice : undefined,
          emails: fields.emailsList.split(',')
        })
      ).unwrap();
      if (response.responseCode === 901) {
        alert.show(
          {
            title: 'Factura reenviada',
            message: `Tu factura se ha enviado a: \n\n${fields.emailsList}`,
            acceptTitle: 'Aceptar',
            onAccept() {
              alert.hide();
            }
          },
          'success'
        );
      } else {
        toast.show({ message: `Error ${response.responseCode} \n ${response.responseMessage}`, type: 'error' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeArea barStyle="dark" topSafeArea={false} bottomSafeArea={false} backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceGeneratedScreen
        viewGeneratedInvoice={goToViewerPDF}
        resendGeneratedInvoice={onPressResend}
        finalize={goToHome}
        newInvoice={goToNewInvoice}
        defaultProfile={defaultProfile!}
        invoiceGenerated={route.params ? route.params.invoiceGenerated : undefined}
      />
      <ResendInvoice
        onPressOut={onPressOut}
        visible={resendInvoiceVisible}
        message={`Reenviaremos esta factura a tu email registrado.`}
        secondMessage={`Puedes agregar otros correos adicionales separándolos con un espacio.`}
        resend={resendGeneratedInvoice}
      />
    </SafeArea>
  );
};

export default InvoiceGeneratedSevenController;
