import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoiceGeneratedScreen } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingProfileInterface, RootState, useAppSelector } from 'rtk';

const InvoiceGeneratedSevenController: React.FC<any> = ({ route }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const [defaultProfile, setDefaultProfile] = useState<InvoicingProfileInterface | null>(null);

  useEffect(() => {
    setDefaultProfile(
      invoicingProfileList.find(item => {
        return item.default === true;
      }) ?? null
    );
  }, []);

  const goToHome = () => navigate('Home');
  const goToNewInvoice = () => navigate('AddTicketSeven', { ticket: undefined, position: undefined });
  const goToViewerPDF = () => navigate('ViewInvoiceGeneratedSeven', { invoiceGenerated: route.params ? route.params.invoiceGenerated : undefined });

  const resendGeneratedInvoice = () => {
    console.log('Aqui se va a reenviar la factura Seven....');
    // TODO integrate endpoint to resend generated invoice.
  };

  return (
    <SafeArea barStyle="dark" topSafeArea={false} bottomSafeArea={false} backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceGeneratedScreen
        viewGeneratedInvoice={goToViewerPDF}
        resendGeneratedInvoice={resendGeneratedInvoice}
        finalize={goToHome}
        newInvoice={goToNewInvoice}
        defaultProfile={defaultProfile!}
        invoiceGenerated={route.params ? route.params.invoiceGenerated : undefined}
      />
    </SafeArea>
  );
};

export default InvoiceGeneratedSevenController;
