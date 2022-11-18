import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAlert, useToast } from 'context';
import { WalletStackParams } from 'navigation/types';
import React from 'react';
import { RechargeSupplier } from 'rtk';
import { vtexDocsServices } from 'services';
import RechargeQRScreen from './RechargeQRScreen';

const RechargeQRController: React.FC = () => {
  const alert = useAlert();
  const route = useRoute<RouteProp<WalletStackParams, 'RechargeQR'>>();
  const toast = useToast();
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { params } = route;
  const fields = params?.fieldValues;
  const amount = params?.amount;
  const supplier = params?.supplierData;
  const qrData = params?.qrData;
  const rechargeUser = params?.rechargeUser;
  const rechargeQRId = params?.rechargeQRId;

  const onEdit = () => {
    if (rechargeUser) {
      navigate('RechargeEdit', { amount: amount, rechargeUser: rechargeUser });
    } else navigate('RechargeEdit', { amount: amount, supplierData: supplier, fields: fields, rechargeQRId: rechargeQRId });
  };

  const onDelete = async () => {
    const hiddenNumber = rechargeUser
      ? rechargeUser.reference === undefined
        ? rechargeUser.referenceOrPhone.slice(-2)
        : rechargeUser.reference.slice(-2)
      : fields.telephone.slice(-2);
    const deleteId = rechargeUser ? rechargeUser.id : rechargeQRId.slice(3);
    alert.show(
      {
        title: 'Eliminar número',
        message: `¿Estás seguro que quieres eliminar el número **${hiddenNumber} (${
          rechargeUser ? rechargeUser.label : fields.alias
        })? Lo puedes volver a agregar en cualquier momento.`,
        acceptTitle: 'Eliminar',
        async onCancel() {
          alert.hide();
        },
        cancelTitle: 'Cancelar',
        async onAccept() {
          await vtexDocsServices.deleteDocByDocID('UR', deleteId);
          toast.show({
            message: 'Número eliminado exitosamente.',
            type: 'success'
          });
          alert.hide();
          navigate('WalletHome');
        }
      },
      'deleteCart',
      false,
      true
    );
  };

  return (
    <RechargeQRScreen
      onEdit={onEdit}
      onDelete={onDelete}
      amount={amount?.ammount as number}
      fieldValues={fields}
      supplier={supplier as RechargeSupplier}
      qrData={qrData as string}
      rechargeUser={rechargeUser}
    />
  );
};

export default RechargeQRController;
