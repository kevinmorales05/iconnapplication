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
  const rechargeUser = params?.rechargeUser;

  const saveRecharge = async (rechargeFields: any, qrData: string, newRecharge: RechargeUser) => {
    try {
      await vtexDocsServices.updateDocByDocIDForAgeStatus('UR', rechargeUser ? rechargeUser.id : (rechargeQRId.slice(3) as string), newRecharge);
      toast.show({
        message: 'Cambios guardados con éxito.',
        type: 'success'
      });
      rechargeUser
        ? navigate('RechargeQR', { rechargeUser: newRecharge, qrData: qrData, amount: amountSupplier })
        : navigate('RechargeQR', { fieldValues: rechargeFields, amount: amountSupplier, supplierData: supplier, qrData: qrData, rechargeQRId: rechargeQRId });
    } catch (error) {
      toast.show({
        message: 'No se pudo agregar el número. \n Intenta más tarde.',
        type: 'error'
      });
      navigate('Recharge');
    }
  };

  const onSubmit = async (rechargeFields: any) => {
    const qrData: string = `711APPPU|${amountSupplier?.UPC}|${amountSupplier?.SKU}|${rechargeFields.telephone}|${amountSupplier?.ammount}00`;
    const newRecharge: RechargeUser = {
      //id: rechargeUser ? rechargeUser.id : rechargeQRId,
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
    if (rechargeUser) {
      navigate('RechargeAmounts', { rechargeUser: rechargeUser, selected: amountSupplier, type: 'edit' });
    } else navigate('RechargeAmounts', { supplierData: params?.supplierData, selected: amountSupplier, type: 'edit' });
  };
  return (
    <RechargeEditSceen
      fieldsParams={fields}
      supplier={supplier as RechargeSupplier}
      amount={amountSupplier?.ammount}
      onPressAmount={onPressAmount}
      onSubmit={onSubmit}
      rechargeUser={rechargeUser}
    />
  );
};

export default RechargeEditController;
