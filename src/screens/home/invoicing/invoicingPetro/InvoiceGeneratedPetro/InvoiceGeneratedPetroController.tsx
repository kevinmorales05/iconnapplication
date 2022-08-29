import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoiceGeneratedScreen, ResendInvoice } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingProfileInterface, RootState, useAppSelector } from 'rtk';
import { FieldValues } from 'react-hook-form';

const InvoiceGeneratedPetroController: React.FC<any> = ({ route }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const [defaultProfile, setDefaultProfile] = useState<InvoicingProfileInterface | null>(null);
  const [resendInvoiceVisible, setResendInvoiceVisible] = useState<boolean>(false);

  useEffect(() => {
    setDefaultProfile(
      invoicingProfileList.find(item => {
        return item.default === true;
      }) ?? null
    );
  }, []);

  const goToHome = () => navigate('Home');
  const goToNewInvoice = () => navigate('AddTicketPetro', { ticket: undefined, position: undefined });
  const goToViewerPDF = () => navigate('ViewInvoiceGeneratedPetro', { invoiceGenerated: route.params ? route.params.invoiceGenerated : undefined });
  const onPressOut = () => setResendInvoiceVisible(false);
  const onPressResend = () => setResendInvoiceVisible(true);

  const resendGeneratedInvoice = (fields: FieldValues) => {
    console.log('Aqui se va a reenviar la factura Petro....', fields);
    // TODO integrate endpoint to resend generated invoice.
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

export default InvoiceGeneratedPetroController;
