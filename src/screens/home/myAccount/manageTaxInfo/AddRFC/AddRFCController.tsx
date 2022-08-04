import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useAlert, useLoading, useToast } from 'context';
import { invoicingServices } from 'services';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { current } from '@reduxjs/toolkit';

const AddRFCController: React.FC = () => {
  const alert = useAlert();
  const loader = useLoading();
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();

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

  const onSubmit = async (invoiceProfile: any) => {
    loader.show();

    try {
      await invoicingServices.registerInvoicingProfile(invoiceProfile);
      toast.show({
        message: 'Datos guardados exitosamente.',
        type: 'success'
      });
      goBack();
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos. Intenta mas tarde.',
        type: 'error'
      });
    } finally {
      loader.hide();
    }
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <BillingScreen onSubmit={onSubmit} onDelete={onDelete} />
    </SafeArea>
  );
};

export default AddRFCController;
