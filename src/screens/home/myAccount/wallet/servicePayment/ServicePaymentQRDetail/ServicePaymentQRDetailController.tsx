import React from 'react';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeArea } from 'components/atoms/SafeArea';
import { ServicePaymentQRDetailScreen } from 'components';
import { useAlert, useLoading, useToast } from 'context';
import { useNavigation } from '@react-navigation/native';
import { vtexServicesPayments } from 'services';
import { WalletStackParams } from 'navigation/types';
import theme from 'components/theme/theme';

/**
 * This component is used to show a QR preview.
 * @param route
 * @returns React.FC
 */

const ServicePaymentQRDetailController: React.FC<any> = ({ route }: NativeStackScreenProps<WalletStackParams, 'ServicePaymentQRDetail'>) => {
  const loader = useLoading();
  const toast = useToast();
  const alert = useAlert();
  // console.log(route.params.qrData);
  // console.log(route.params.servicePayment);
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();

  const onPressEditButton = () => {
    navigate('ServicePaymentEdit', { qrData: route.params.qrData, servicePayment: route.params.servicePayment });
  };

  const deleteServicePayment = async () => {
    const vtexResponse = await vtexServicesPayments.deleteBillFromVtex(route.params.qrData.id);
    if (typeof vtexResponse === 'string') {
      toast.show({ message: 'Servicio eliminado exitosamente.', type: 'success' });
      navigate('WalletHome');
    } else {
      toast.show({ message: 'No se pudo eliminar el servicio.\nIntenta más tarde.', type: 'warning' });
    }
  };

  const onPressDeleteButton = () => {
    loader.show();
    try {
      alert.show(
        {
          title: 'Eliminar servicio',
          message: `¿Estás seguro que quieres eliminar el\nservicio de CFE con alias ${route.params.qrData.alias}?\n Puedes volver a darlo de alta en cualquier momento.`,
          acceptTitle: 'Eliminar',
          cancelTitle: 'Cancelar',
          cancelOutline: 'iconn_med_grey',
          cancelTextColor: 'iconn_dark_grey',
          onCancel() {
            alert.hide();
          },
          onAccept() {
            alert.hide();
            deleteServicePayment();
          }
        },
        'error',
        undefined,
        true
      );
    } catch (error) {
      toast.show({ message: 'No se pudo eliminar el servicio.\nIntenta más tarde.', type: 'error' });
    } finally {
      loader.hide();
    }
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
