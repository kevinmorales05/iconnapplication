import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { ServicePaymentQRDetailScreen } from 'components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import theme from 'components/theme/theme';

/**
 * This component is used to show a QR preview.
 * @param route
 * @returns React.FC
 */

const ServicePaymentQRDetailController: React.FC<any> = ({ route }: NativeStackScreenProps<WalletStackParams, 'ServicePaymentQRDetail'>) => {
  // console.log(route.params.qrData);
  // console.log(route.params.servicePayment);
  //   const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();

  const onPressEditButton = () => {
    route.params.servicePayment = null;
    // Debe abrir el ServicePaymentScreen en modo update.
  };

  const onPressDeleteButton = () => {
    route.params.servicePayment = null;
    // Debe ejecutarse el borrado de vtex coleccion SP y se regresa al WalletHome.
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <ServicePaymentQRDetailScreen
        onPressDeleteButton={onPressDeleteButton}
        onPressEditButton={onPressEditButton}
        servicePayment={route.params.servicePayment}
        service={route.params.qrData}
      />
    </SafeArea>
  );
};

export default ServicePaymentQRDetailController;
