import React from 'react';
import ServicePaymentScreen from './ServicesPaymentsScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import theme from 'components/theme/theme';
import { useServicesPayments } from '../../../hooks/usePaymentsServices';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import { ServicePaymentInterface } from 'rtk';

const ServicesPaymentsController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { servicesPayments } = useServicesPayments();

  const onPressQuestionButton = () => {
    navigate('ServicePaymentGeneralInfo');
  };

  const onSubmit = (servicePayment: ServicePaymentInterface) => {
    navigate('ServicePaymentAdd', { servicePayment });
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <ServicePaymentScreen servicePaymentList={servicesPayments!} onSubmit={onSubmit} onPressQuestionButton={onPressQuestionButton} />
    </SafeArea>
  );
};

export default ServicesPaymentsController;
