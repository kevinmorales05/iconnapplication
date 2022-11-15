import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { ServicePaymentQRDetailScreen } from 'components';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { WalletStackParams } from 'navigation/types';

/**
 * This component is used to show a QR preview.
 * @param
 * @returns React.FC
 */

// const ServicePaymentQRDetailController: React.FC<any> = ({ route }: NativeStackScreenProps<WalletStackParams, 'ServicePaymentQRDetail'>) => {
const ServicePaymentQRDetailController: React.FC<any> = () => {
  // console.log(route.params.qrData);
  // console.log(route.params.servicePayment);

  //   const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();

  //   const onSubmit = () => {
  //     navigate('TODO');
  //   };

  return (
    <SafeArea barStyle="dark">
      <ServicePaymentQRDetailScreen />
    </SafeArea>
  );
};

export default ServicePaymentQRDetailController;
