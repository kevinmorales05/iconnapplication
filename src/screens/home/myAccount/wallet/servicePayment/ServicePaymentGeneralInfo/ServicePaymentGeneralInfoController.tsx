import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import ServicePaymentGeneralInfoScreen from './ServicePaymentGeneralInfoScreen';

const ServicePaymentGeneralInfoController: React.FC<any> = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return <ServicePaymentGeneralInfoScreen goBack={goBack} />;
};

export default ServicePaymentGeneralInfoController;
