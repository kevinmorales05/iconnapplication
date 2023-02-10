import React from 'react';
import ServicePaymentScreen from './ServicesPaymentsScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import theme from 'components/theme/theme';
import { useServicesPayments } from '../../../hooks/usePaymentsServices';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import { RootState, ServicePaymentInterface, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';

const ServicesPaymentsController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { servicesPayments } = useServicesPayments();

  const onPressQuestionButton = () => {
    navigate('ServicePaymentGeneralInfo');
    logEvent('walServicesModuleHelp', {
      id: user.id,
      description: 'Tocar el botón de ayuda al abrir el módulo de servicios disponibles'
    });
  };

  const onSubmit = (servicePayment: ServicePaymentInterface) => {
    navigate('ServicePaymentAdd', { servicePayment });
    logEvent('walSelectServicePaymentSupplier', {
      id: user.id,
      description: 'Seleccionar un proveedor',
      serviceProviderId: servicePayment.billerId
    });
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <ServicePaymentScreen servicePaymentList={servicesPayments!} onSubmit={onSubmit} onPressQuestionButton={onPressQuestionButton} />
    </SafeArea>
  );
};

export default ServicesPaymentsController;
