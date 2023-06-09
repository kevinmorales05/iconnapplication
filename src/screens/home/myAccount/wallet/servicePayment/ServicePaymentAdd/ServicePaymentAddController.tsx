import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { FieldValues } from 'react-hook-form';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { QRInterface, RootState, useAppSelector } from 'rtk';
import { SafeArea } from 'components/atoms/SafeArea';
import { ServicePaymentHelper, ServicePaymentScreen } from 'components';
import { useLoading, useToast } from 'context';
import { useNavigation } from '@react-navigation/native';
import { vtexServicesPayments } from 'services';
import { WalletStackParams } from 'navigation/types';
import { logEvent } from 'utils/analytics';

/**
 * This is a component with typing for route, this is the best way for this kind of typing.
 * @param route
 * @returns React.FC
 */
const ServicePaymentAddController: React.FC<any> = ({ route }: NativeStackScreenProps<WalletStackParams, 'ServicePaymentAdd'>) => {
  const loader = useLoading();
  const toast = useToast();
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [helpVisible, setHelpVisible] = useState<boolean>(false);

  /**
   * Show helper modal.
   */
  const onPressQuestionButton = () => {
    setHelpVisible(true);
    logEvent('walServicesHelp', {
      id: user.id,
      description: 'Tocar el botón de ayuda al ingresar el número de servicio',
      serviceProviderId: route.params.servicePayment.billerId
    });
  };

  /**
   * Hide helper modal.
   */
  const onPressOut = () => {
    setHelpVisible(false);
  };

  /**
   * 1. Register a service in Arcus
   * 2. Save a service in vtex collection "SP"
   * @param service FieldValues of ReactHookForm
   */
  const onSubmit = async (service: FieldValues) => {
    loader.show();
    try {
      // 1. Register a service payment in Arcus api.
      const arcusResponse = await vtexServicesPayments.createBillIntoArcus({
        biller_id: route.params.servicePayment.billerId,
        account_number: service.contractNumber
      });

      const { balance, id, due_date, balance_updated_at } = arcusResponse;

      // 2. Save a QR data into vtex collection ("SP").
      const vtexResponse = await vtexServicesPayments.saveBillIntoVtex({
        label: service.alias,
        reference: service.contractNumber,
        type: route.params.servicePayment.supplierName,
        userId: user.id!, // Note: Even if you send userId, vtex change in backend and put the "id" automatically.
        billId: id
      });

      // 3. It everything is fine, navigate to QR Detail.
      if (vtexResponse) {
        toast.show({ message: 'Servicio agregado exitosamente.', type: 'success' });
        const QrData: QRInterface = {
          alias: service.alias,
          balance: balance,
          expirationDate: due_date,
          contractNumber: service.contractNumber,
          billId: id,
          updatedAt: balance_updated_at,
          id: vtexResponse.DocumentId
        };
        navigate('ServicePaymentQRDetail', { qrData: QrData, servicePayment: route.params.servicePayment });
        logEvent('walSaveService', {
          id: user.id,
          description: 'Guardar un QR de servicio',
          serviceProviderId: route.params.servicePayment.billerId
        });
      }
    } catch (err: unknown | AxiosError) {
      let errMsg;
      if (err instanceof AxiosError && err.response?.data) {
        if (err.response?.data.error_code === 'R1') {
          errMsg = 'Número de caracteres incorrecto';
        } else if (err.response?.data.error_code === 'R2') {
          errMsg = 'Número de referencia inválido';
        } else if (err.response?.data.error_code === 'R6') {
          errMsg = 'Servicio no disponible por el momento, intenta más tarde';
        } else {
          errMsg = 'No se pudo agregar el servicio.\nIntenta más tarde.';
        }
        toast.show({ message: errMsg, type: 'error' });
      } else {
        toast.show({ message: 'No se pudo agregar el servicio.\nIntenta más tarde.', type: 'error' });
      }
      //navigate('ServicePayment');
    } finally {
      loader.hide();
    }
  };

  return (
    <SafeArea barStyle="dark">
      <ServicePaymentScreen mode="create" servicePayment={route.params.servicePayment} onSubmit={onSubmit} onPressQuestionButton={onPressQuestionButton} />
      <ServicePaymentHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        message={
          'Captura el número de servicio impreso en tu\nrecibo. Lo puedes encontrar en la cabecera del\nrecibo o cerca del código de barras al pie de\npágina.'
        }
        img={route.params.servicePayment.helpImageURL}
      />
    </SafeArea>
  );
};

export default ServicePaymentAddController;
