import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useToast } from 'context';
import { WalletStackParams } from 'navigation/types';
import React from 'react';
import { RechargeSupplier, RechargeUser, RootState, useAppSelector } from 'rtk';
import { vtexDocsServices } from 'services';
import RechargeEditSceen from './RechargeEditScreen';

const RechargeEditController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const route = useRoute<RouteProp<WalletStackParams, 'RechargeEdit'>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { userId } = user;
  const { params } = route;
  const toast = useToast();

  const supplier = params?.supplierData;
  const amountSupplier = params?.amount;
  const fields = params?.fields;
  const rechargeQRId = params?.rechargeQRId;

  const saveRecharge = async (rechargeFields: any, qrData: string, newRecharge: RechargeUser) => {
    try {
      await vtexDocsServices.updateDocByDocIDForAgeStatus('UR', rechargeQRId as string, newRecharge);
      toast.show({
        message: 'Cambios guardados con éxito.',
        type: 'success'
      });
      navigate('RechargeQR', { fieldValues: rechargeFields, amount: amountSupplier, supplierData: supplier, qrData: qrData });
    } catch (error) {
      toast.show({
        message: 'No se pudo agregar el número. \n Intenta más tarde.',
        type: 'error'
      });
      navigate('Recharge');
    }
  };

  const onSubmit = async (rechargeFields: any) => {
    const qrData: string = `711APPU|${amountSupplier?.UPC}|${amountSupplier?.SKU}|${rechargeFields.telephone}|${amountSupplier?.ammount}00`;
    const newRecharge: RechargeUser = {
      id: rechargeQRId,
      amount: amountSupplier?.ammount as number,
      isActive: true,
      label: rechargeFields.alias,
      referenceOrPhone: rechargeFields.telephone,
      supplierName: amountSupplier?.supplierName as string,
      type: 'air',
      userId: userId as string
    };
    saveRecharge(rechargeFields, qrData, newRecharge);
  };

  const onPressAmount = () => {
    navigate('RechargeAmounts', { supplierData: params?.supplierData, selected: amountSupplier, type: 'edit' });
  };

  return (
    <RechargeEditSceen
      fields={fields}
      supplier={supplier as RechargeSupplier}
      amount={amountSupplier?.ammount}
      onPressAmount={onPressAmount}
      onSubmit={onSubmit}
    />
  );
};

export default RechargeEditController;
