import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useAlert, useLoading, useToast } from 'context';
import { invoicingServices } from 'services';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { InvoicingProfileInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setInvoicingProfilesList } from 'rtk/slices/invoicingSlice';
import { logEvent } from 'utils/analytics';

const CreateTaxProfileController: React.FC = () => {
  const alert = useAlert();
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'CreateTaxProfile'>>();
  const toast = useToast();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [current, setCurrent] = useState<InvoicingProfileInterface | undefined>(undefined);
  const [resetFields, setResetFields] = useState<boolean>(false);

  const loader = useLoading();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrent(route.params);
  }, [route]);

  const onDelete = async (invoiceProfile: InvoicingProfileInterface) => {
    alert.show(
      {
        title: 'Eliminar perfil fiscal',
        message: 'Puedes registrarlo de nuevo en otro momento.',
        acceptTitle: 'Cancelar',
        cancelTitle: 'Eliminar',
        cancelOutline: 'iconn_error',
        cancelTextColor: 'iconn_error',
        async onAccept() {
          alert.hide();
          logEvent('invRemoveInvoicingProfileNo', {
            id: user.id,
            description: 'Remover perfil fiscal "No"'
          });
        },
        async onCancel() {
          loader.show();
          try {
            await invoicingServices.deleteInvoicingProfile(invoiceProfile);

            const newList = invoicingProfileList.filter(item => {
              return item.invoicing_profile_id !== invoiceProfile.invoicing_profile_id;
            });
            dispatch(setInvoicingProfilesList(newList));
            setResetFields(true);
            setCurrent(undefined);
            navigate('TaxInfo');
            setResetFields(false);
            alert.hide();
          } catch (error) {
            // console.log('error:', error);
          } finally {
            loader.hide();
          }
          logEvent('invRemoveInvoicingProfileYes', {
            id: user.id,
            description: 'Remover perfil fiscal "Si"'
          });
        }
      },
      'error'
    );
  };

  const onSubmit = async (invoicingProfile: InvoicingProfileInterface) => {
    loader.show();
    try {
      const data = await invoicingServices.updateInvoicingProfile({ ...invoicingProfile, invoicing_profile_id: current!.invoicing_profile_id });

      if (data.responseCode === 49) {
        toast.show({
          message: data.responseSubject,
          type: 'success'
        });
        const updated = data.data as InvoicingProfileInterface;

        const newList = invoicingProfileList.map(item => {
          if (item.invoicing_profile_id === updated.invoicing_profile_id) {
            return updated;
          }
          return item;
        });
        setResetFields(true);
        dispatch(setInvoicingProfilesList(newList));
        goBack();
        setResetFields(false);
      } else {
        toast.show({
          message: data.responseSubject,
          type: 'error'
        });
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos. /n Intenta más tarde.',
        type: 'error'
      });
    } finally {
      loader.hide();
    }
  };

  const onBack = () => {
    alert.show(
      {
        title: '¿Salir sin guardar cambios?',
        message: 'Tienes cambios no guardados.',
        acceptTitle: 'Volver',
        cancelTitle: 'Salir sin guardar',
        cancelOutline: 'iconn_warning',
        cancelTextColor: 'iconn_warning',
        async onAccept() {
          alert.hide();
        },
        async onCancel() {
          alert.hide();
        }
      },
      'warning'
    );
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <BillingScreen onSubmit={onSubmit} onDelete={onDelete} onBack={onBack} current={current} isReset={resetFields} />
    </SafeArea>
  );
};

export default CreateTaxProfileController;
