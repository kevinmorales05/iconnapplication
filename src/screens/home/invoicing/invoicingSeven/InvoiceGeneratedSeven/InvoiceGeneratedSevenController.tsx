import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoiceGeneratedScreen } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface Props {}

const InvoiceGeneratedSevenController: React.FC<Props> = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const goToHome = () => navigate('Home');
  const goToNewInvoice = () => navigate('AddTicketSeven');

  return (
    <SafeArea barStyle="dark" topSafeArea={false} bottomSafeArea={false} backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceGeneratedScreen finalize={goToHome} newInvoice={goToNewInvoice} />
    </SafeArea>
  );
};

export default InvoiceGeneratedSevenController;
