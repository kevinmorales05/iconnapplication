import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useAlert, useLoading } from 'context';
import { InvoicingProfile } from 'lib/models/InvoicingProfile';
import { invoicingServices } from 'services';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { InvoicingProfileInterface } from 'rtk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const CreateTaxProfileController: React.FC = () => {
  const alert = useAlert();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'CreateTaxProfile'>>();

  const [current, setCurrent] = useState<InvoicingProfileInterface | undefined>(undefined);

  const loader = useLoading();

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
            navigate('TaxInfo');
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

  const onSubmit = (invoicingProfile: InvoicingProfile) => {
    console.log('submit from controller:', invoicingProfile);
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
