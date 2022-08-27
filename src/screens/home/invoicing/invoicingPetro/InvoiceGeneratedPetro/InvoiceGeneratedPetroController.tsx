import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoiceGeneratedScreen } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingProfileInterface, RootState, useAppSelector } from 'rtk';

interface Props {}

const InvoiceGeneratedPetroController: React.FC<Props> = () => {
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
  const goToNewInvoice = () => navigate('AddTicketPetro', { ticket: undefined, position: undefined });

  return (
    <SafeArea barStyle="dark" topSafeArea={false} bottomSafeArea={false} backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceGeneratedScreen finalize={goToHome} newInvoice={goToNewInvoice} defaultProfile={defaultProfile!} />
    </SafeArea>
  );
};

export default InvoiceGeneratedPetroController;
