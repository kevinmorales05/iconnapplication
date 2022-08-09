import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import InvoiceScreen from './InvoiceScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoicingProfileInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import theme from 'components/theme/theme';
import { resendVerificationEmailThunk } from 'rtk/thunks/invoicing.thunks';
import { useAlert, useLoading } from 'context';

const InvoiceController: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const { loading } = useAppSelector((state: RootState) => state.invoicing);  
  const alert = useAlert();
  const loader = useLoading();
  let defaultProfile: InvoicingProfileInterface;

  if (invoicingProfileList.length === 1) {
    defaultProfile = invoicingProfileList[0];
  } else {
    defaultProfile = invoicingProfileList.find(obj => obj.default === true)!;
  }

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const onSubmit = async () => navigate('CreateTaxProfile');
  const goToAddTicketPetro = async () => navigate('AddTicketPetro');
  const goToAddTicketSeven = async () => navigate('AddTicketSeven');

  const showAlert = () => {
    alert.show(
      {
        title: 'Verifica tu correo electronico',
        message: `Para facturar sólo falta verificar tu correo. Revisa tu bandeja de entrada:`,
        acceptTitle: 'Aceptar',
        secondMessage: defaultProfile.email,
        onAccept() {
          alert.hide();
        }
      },
      'success'
    );
  };

  const resendEmail = async () => {
    loader.show();
    try {
      const response = await dispatch(resendVerificationEmailThunk(defaultProfile.email)).unwrap();
      if (response.responseCode === 200) {
        showAlert();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceScreen 
        invoicingProfileList={invoicingProfileList} 
        defaultProfile={defaultProfile!} 
        onSubmit={onSubmit} 
        resendEmail={resendEmail} 
        goToAddTicketPetro={goToAddTicketPetro}
        goToAddTicketSeven={goToAddTicketSeven} />
    </SafeArea>
  );
};

export default InvoiceController;
