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

const CreateTaxProfileController: React.FC = () => {
  const alert = useAlert();
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'CreateTaxProfile'>>();
  const toast = useToast();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);

  const [current, setCurrent] = useState<InvoicingProfileInterface | undefined>(undefined);

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
        },
        async onCancel() {
          loader.show();
          try {
            await invoicingServices.deleteInvoicingProfile(invoiceProfile);

            const newList = invoicingProfileList.filter(item => {
              return item.invoicing_profile_id !== invoiceProfile.invoicing_profile_id;
            });
            dispatch(setInvoicingProfilesList(newList));
            navigate('TaxInfo');
            alert.hide();
          } catch (error) {
            console.log('error:', error);
          } finally {
            loader.hide();
          }
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

        dispatch(setInvoicingProfilesList(newList));

        goBack();
      } else {
        toast.show({
          message: data.responseSubject,
          type: 'error'
        });
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos. Intenta mas tarde.',
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
      <BillingScreen onSubmit={onSubmit} onDelete={onDelete} onBack={onBack} current={current} />
    </SafeArea>
  );
};

export default CreateTaxProfileController;
