import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useAlert } from 'context';
import { InvoicingProfile } from 'lib/models/InvoicingProfile';
import { invoicingServices } from 'services';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { InvoicingProfileInterface } from 'rtk';

const CreateTaxProfileController: React.FC = () => {
  const alert = useAlert();

  const route = useRoute<RouteProp<HomeStackParams, 'CreateTaxProfile'>>();

  const [current, setCurrent] = useState<InvoicingProfileInterface | undefined>(undefined);

  useEffect(() => {
    setCurrent(route.params);
  }, [route]);

  const onDelete = async () => {
    alert.show({
      title: 'Eliminar perfil fiscal',
      message: 'Puedes registrarlo de nuevo en otro momento.',
      acceptTitle: 'Entendido',
      onAccept() {
        alert.hide();

        try {
          // const data = await invoicingServices.deleteInvoicingProfile(invoicingProfile);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const onSubmit = (invoicingProfile: InvoicingProfile) => {
    console.log('submit from controller:', invoicingProfile);
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <BillingScreen onSubmit={onSubmit} onDelete={onDelete} current={current} />
    </SafeArea>
  );
};

export default CreateTaxProfileController;
