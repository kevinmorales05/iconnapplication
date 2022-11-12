import React from 'react';
import ServicePaymentScreen from './ServicePaymentScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import theme from 'components/theme/theme';
import { useServicesPayments } from '../../../hooks/usePaymentsServices';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';

const ServicePaymentController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { servicesPayments } = useServicesPayments();

  const onPressQuestionButton = () => {
    navigate('ServicePaymentGeneralInfo');
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <ServicePaymentScreen servicePaymentList={servicesPayments!} onSubmit={() => {}} onPressQuestionButton={onPressQuestionButton} />
    </SafeArea>
  );
};

export default ServicePaymentController;
