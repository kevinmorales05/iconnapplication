import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import InvoiceScreen from './InvoiceScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoicingProfileInterface, RootState, useAppSelector } from 'rtk';
import theme from 'components/theme/theme';

const InvoiceController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const onSubmit = async () => navigate('CreateTaxProfile');

  let defaultProfile: InvoicingProfileInterface;

  if (invoicingProfileList.length === 1) {
    defaultProfile = invoicingProfileList[0];
  } else {
    defaultProfile = invoicingProfileList.find((obj) => obj.default === true)!;
  }  

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceScreen invoicingProfileList={invoicingProfileList} defaultProfile={defaultProfile!} onSubmit={onSubmit} />
    </SafeArea>
  );
};

export default InvoiceController;
