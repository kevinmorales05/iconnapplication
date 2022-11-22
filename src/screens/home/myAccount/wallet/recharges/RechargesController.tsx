import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import React, { useCallback, useEffect, useState } from 'react';
import { vtexDocsServices } from 'services';
import RechargesScreen from './RechargesScreen';
import { RechargeSupplier } from '../../../../../rtk/types/wallet.types';

const RechargesController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const [supplierList, setSupplierList] = useState<RechargeSupplier[]>();

  const getRechargeSuppliers = useCallback(async () => {
    const data = await vtexDocsServices.getAllDocsByDocDataEntity('RS');
    if (data > 0) {
      //setCards(data);
    }
    return data;
  }, []);

  const setSuppliersForCards = async (suppliersArray: any) => {
    const arr = suppliersArray;
    const suppliersArr: RechargeSupplier[] = [];
    if (arr.length > 0) {
      for (const supplier of arr) {
        let newSupplier: RechargeSupplier = {
          id: supplier.id,
          imageURL: supplier.imageURL,
          index: supplier.index,
          supplierName: supplier.supplierName,
          type: supplier.type
        };
        suppliersArr.push(newSupplier);
      }
    }
    setSupplierList(suppliersArr);
    return suppliersArr;
  };

  useEffect(() => {
    getRechargeSuppliers().then(data => setSuppliersForCards(data));
  }, [getRechargeSuppliers]);

  const onPressHalp = () => {
    navigate('RechargeHelp');
  };
  const onPressOperator = (supplierData: RechargeSupplier) => {
    navigate('RechargeOperator', { supplierData: supplierData });
  };

  return <RechargesScreen supplierList={supplierList as RechargeSupplier[]} onPressHelp={onPressHalp} onPressOperator={onPressOperator} />;
};

export default RechargesController;
