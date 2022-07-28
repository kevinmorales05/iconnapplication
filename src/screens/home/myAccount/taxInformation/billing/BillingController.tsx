import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useAlert } from 'context';

const BillingController: React.FC = () => {
  const alert = useAlert();

  const showAlert = () => {
    alert.show({
      title: 'Eliminar perfil fiscal',
      message: 'Puedes registrarlo de nuevo en otro momento.',
      acceptTitle: 'Entendido',
      onAccept() {
        alert.hide();
      }
    });
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <BillingScreen showAlert={showAlert} />
    </SafeArea>
  );
};

export default BillingController;
