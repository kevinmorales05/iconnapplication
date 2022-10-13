import React, { useEffect, useState } from 'react';
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
  const { invoicingProfileList, invoicingSevenTicketList, invoicingPetroTicketList } = useAppSelector((state: RootState) => state.invoicing);
  const { loading } = useAppSelector((state: RootState) => state.invoicing);
  const alert = useAlert();
  const loader = useLoading();
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

  const onSubmit = async () => {
    if (defaultProfile) {
      navigate('CreateTaxProfile');
    } else {
      navigate('AddRFC');
    }
  };

  const goToAddTicketPetro = async () => {
    if (invoicingPetroTicketList.length > 0) navigate('InvoiceTicketPetro');
    else navigate('AddTicketPetro', { ticket: undefined, position: undefined });
  };
  const goToAddTicketSeven = async () => {
    if (invoicingSevenTicketList.length > 0) navigate('InvoiceTicketSeven');
    else navigate('AddTicketSeven', { ticket: undefined, position: undefined });
  };

  const showAlert = () => {
    alert.show(
      {
        title: 'Verifica tu correo electronico',
        message: `Para facturar sólo falta verificar tu correo. Revisa tu bandeja de entrada:`,
        acceptTitle: 'Aceptar',
        secondMessage: defaultProfile?.email,
        onAccept() {
          alert.hide();
        }
      },
      'warning'
    );
  };

  const resendEmail = async () => {
    loader.show();
    try {
      const response = await dispatch(resendVerificationEmailThunk(defaultProfile?.email as string)).unwrap();
      if (response.responseCode === 200) {
        showAlert();
      }
    } catch (error) {
      console.warn(error);
    } finally {
      loader.hide();
    }
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceScreen
        invoicingProfileList={invoicingProfileList}
        defaultProfile={defaultProfile!}
        onSubmit={onSubmit}
        resendEmail={resendEmail}
        goToAddTicketPetro={goToAddTicketPetro}
        goToAddTicketSeven={goToAddTicketSeven}
      />
    </SafeArea>
  );
};

export default InvoiceController;
