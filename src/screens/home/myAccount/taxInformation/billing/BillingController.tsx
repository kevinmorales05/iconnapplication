import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import BillingScreen from './BillingScreen';
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
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <BillingScreen showAlert={showAlert} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default BillingController;