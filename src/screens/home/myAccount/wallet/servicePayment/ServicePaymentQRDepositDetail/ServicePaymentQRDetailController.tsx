import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import theme from 'components/theme/theme';
import { ServicePaymentQRDetailDeposits } from 'components/screens/ServicePaymentQRDetailDeposits';
import { WalletStackParams } from 'navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { QRDepositInterface, RootState, setBeneficiaries, useAppDispatch, useAppSelector } from 'rtk';
import { useAlert, useToast } from 'context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * This component is used to show a QR preview.
 * @param route
 * @returns React.FC
 */

const ServicePaymentQRDetailController: React.FC<any> = () => {
  const { prefixes, beneficiaries } = useAppSelector((state: RootState) => state.wallet);
  const route = useRoute<RouteProp<WalletStackParams, 'ServicePaymentQRDetailDepositController'>>();
  const { navigate, reset } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { beneficiary, toastState } = route.params;
  const [qrData, setQrData] = useState<QRDepositInterface>();
  const toast = useToast();
  const alert = useAlert();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const prefixie = prefixes ? (prefixes.length ? prefixes?.filter(item => item.type === 'userDeposits') : []) : [];
    const data: QRDepositInterface = {
      accountCard: beneficiary.accountCard,
      name: beneficiary.name,
      tag: beneficiary.tag,
      id: beneficiary.id,
      bank: beneficiary.bank,
      qrCode: prefixie.length ? (prefixie[0].prefixe ? `${prefixie[0].prefixe}|${beneficiary.accountCard}` : beneficiary.accountCard) : beneficiary.accountCard
    };
    setQrData(data);
    if (toastState === 'new') {
      toast.show({
        message: 'Beneficiario agregado exitosamente.',
        type: 'success'
      });
    } else if (toastState === 'edit') {
      toast.show({
        message: 'Cambios guardados con éxito.',
        type: 'success'
      });
    }
  }, []);

  const onPressEditButton = () => {
    navigate('DepositWallet', { beneficiary: beneficiary });
  };

  const deleteBeneficiary = () => {
    let beneficiariesTem = beneficiaries.concat([]);
    beneficiariesTem = beneficiariesTem.filter(item => item.id !== beneficiary.id);
    dispatch(setBeneficiaries(beneficiariesTem));
    reset({
      index: 0,
      routes: [{ name: 'WalletHome', params: { toastState: 'deleteDeposit' } }]
    });
  };

  const onPressDeleteButton = () => {
    alert.show(
      {
        title: 'Eliminar beneficiario',
        message: `¿Seguro que deseas eliminar el beneficiario **${beneficiary.accountCard.substring(
          beneficiary.accountCard.length - 3,
          beneficiary.accountCard.length
        )} (${beneficiary.tag})?\nLo puedes volver agregar en cualquier momento.`,
        acceptTitle: 'Eliminar',
        cancelTitle: 'Cancelar',
        cancelOutline: 'iconn_med_grey',
        cancelTextColor: 'iconn_accent_secondary',
        onCancel() {
          alert.hide();
        },
        onAccept() {
          alert.hide();
          deleteBeneficiary();
        }
      },
      'deleteCart',
      false,
      true
    );
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <ServicePaymentQRDetailDeposits onPressDeleteButton={onPressDeleteButton} onPressEditButton={onPressEditButton} service={qrData} />
    </SafeArea>
  );
};

export default ServicePaymentQRDetailController;
