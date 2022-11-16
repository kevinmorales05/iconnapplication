import { RouteProp, useRoute } from '@react-navigation/native';
import { WalletStackParams } from 'navigation/types';
import React from 'react';
import { RechargeSupplier } from 'rtk';
import RechargeQRScreen from './RechargeQRScreen';

const RechargeQRController: React.FC = () => {
  const route = useRoute<RouteProp<WalletStackParams, 'RechargeQR'>>();
  const { params } = route;
  const fields = params?.fieldValues;
  const amount = params?.amount;
  const supplier = params?.supplierData;
  const qrData = params?.qrData;
  const rechargeUser = params?.rechargeUser;

  return (
    <RechargeQRScreen
      amount={amount?.ammount as number}
      fieldValues={fields}
      supplier={supplier as RechargeSupplier}
      qrData={qrData as string}
      rechargeUser={rechargeUser}
    />
  );
};

export default RechargeQRController;
