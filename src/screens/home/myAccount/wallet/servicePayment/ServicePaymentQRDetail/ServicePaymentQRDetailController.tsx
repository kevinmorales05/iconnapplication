import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { ServicePaymentQRDetailScreen } from 'components';

/**
 * This component is used to show a QR preview.
 * @param route
 * @returns React.FC
 */
const ServicePaymentQRDetailController: React.FC<any> = () => {
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
