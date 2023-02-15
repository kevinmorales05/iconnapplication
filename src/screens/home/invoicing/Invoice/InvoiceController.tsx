import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import InvoiceScreen from './InvoiceScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { InvoicingProfileInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import theme from 'components/theme/theme';
import { getInvoicingProfileListThunk, resendVerificationEmailThunk } from 'rtk/thunks/invoicing.thunks';
import { useAlert, useLoading, useToast } from 'context';
import { invoicingServices } from 'services';
import { logEvent } from 'utils/analytics';

const InvoiceController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const {
    loading: invoicingLoading,
    invoicingProfileList,
    invoicingSevenTicketList,
    invoicingPetroTicketList
  } = useAppSelector((state: RootState) => state.invoicing);
  const [intervalId, setIntervalId] = useState<any>();

  const alert = useAlert();
  const loader = useLoading();
  const toast = useToast();
  const [defaultProfile, setDefaultProfile] = useState<InvoicingProfileInterface | null>(null);

  useEffect(() => {
    if (invoicingLoading === false) loader.hide();
  }, [invoicingLoading]);

  /**
   * Load Invocing Profile List and store it in the redux store.
   */
  const fetchInvoicingProfileList = useCallback(async () => {
    loader.show();
    await dispatch(getInvoicingProfileListThunk(user.userId!));
  }, []);

  /**
   * We get the invoicing profile list just if there isn`t any profile.
   */
  useEffect(() => {
    if (user.userId && invoicingProfileList.length === 0) fetchInvoicingProfileList();
  }, [fetchInvoicingProfileList]);

  // Monitors if user has verified his email from web.
  useEffect(() => {
    let interval = setInterval(async () => {
      await dispatch(getInvoicingProfileListThunk(user.userId!));
    }, 10000);

    setIntervalId(interval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Clear interval
  useEffect(() => {
    if (defaultProfile?.verified_mail === true) {
      clearInterval(intervalId);
    }
  }, [defaultProfile]);

  useEffect(() => {
    if (invoicingProfileList && invoicingProfileList.length > 0) {
      const tem: InvoicingProfileInterface | null =
        invoicingProfileList.find(item => {
          return item.default === true;
        }) ?? null;
      if (!tem?.rfc) {
        if (invoicingProfileList.length) {
          invoicingServices.selectDefault(invoicingProfileList[0].invoicing_profile_id);
          setTimeout(() => {
            fetchInvoicingProfileList();
          }, 500);
        }
      } else {
        setDefaultProfile(tem);
      }
    } else {
      setDefaultProfile(null);
    }
  }, [invoicingProfileList]);

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
    logEvent('invMakeInvoice', {
      id: user.id,
      description: 'Facturar',
      type: 'petro7'
    });
  };
  const goToAddTicketSeven = async () => {
    if (invoicingSevenTicketList.length > 0) navigate('InvoiceTicketSeven');
    else navigate('AddTicketSeven', { ticket: undefined, position: undefined });
    logEvent('invMakeInvoice', {
      id: user.id,
      description: 'Facturar',
      type: '7Eleven'
    });
  };

  const showAlert = () => {
    alert.show(
      {
        title: 'Verifica tu correo electronico',
        message: 'Para facturar sólo falta verificar tu correo. Revisa tu bandeja de entrada:',
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
      const response = await dispatch(
        resendVerificationEmailThunk({ email: defaultProfile?.email!, invoicingProfileId: defaultProfile?.invoicing_profile_id! })
      ).unwrap();
      if (response.responseCode === 200) {
        showAlert();
      } else {
        toast.show({
          message: 'No se pudo enviar el\n correo electrónico.',
          type: 'error'
        });
      }
    } catch (error) {
      // console.warn(error);
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
