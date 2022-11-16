import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import React, { useCallback, useEffect, useState } from 'react';
import { RechargeAmount, RechargeSupplier } from 'rtk';
import { vtexDocsServices } from 'services';
import RechargeAmountScreen from './RechargeAmountScreen';

const RechargeAmountController: React.FC = () => {
  const route = useRoute<RouteProp<WalletStackParams, 'RechargeAmounts'>>();
  const { params } = route;
  const supplier = params?.supplierData;
  const selectedParams = params?.selected;
  const [supplierRecharges, setSupplierRecharges] = useState<RechargeAmount[]>();
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();

  const OnPressAmount = async (amountId: string) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    if (supplierRecharges && supplierRecharges.length > 0) {
      let selArr: RechargeAmount[] = [];
      let select: RechargeAmount = {
        id: '',
        ammount: 0,
        imageUrl: '',
        productName: '',
        SKU: '',
        supplierName: '',
        UPC: '',
        isSelected: false
      };
      supplierRecharges.forEach(element => {
        if (amountId === element.id) {
          element.isSelected = true;
          selArr.push(element);
          select = {
            id: element.id,
            ammount: element.ammount,
            imageUrl: element.imageUrl,
            productName: element.productName,
            SKU: element.SKU,
            supplierName: element.supplierName,
            UPC: element.UPC,
            isSelected: element.isSelected
          };
        } else {
          element.isSelected = false;
          selArr.push(element);
        }
      });
      setSupplierRecharges(selArr as RechargeAmount[]);
      await delay(500);
      navigate('RechargeOperator', { supplierData: supplier as RechargeSupplier, amount: select as RechargeAmount });
    }
  };

  const getRechargeAmounts = useCallback(async () => {
    const data = await vtexDocsServices.getAllDocsByDocDataEntity('AR');
    return data;
  }, []);

  const setAmountsForCards = async (amountsArray: any) => {
    const arr = amountsArray;
    const amountsArr: RechargeAmount[] = [];
    const sel = selectedParams;
    if (sel) {
      if (arr.length > 0) {
        for (const amount of arr) {
          let newAmount: RechargeAmount = {
            id: amount.id,
            ammount: amount.ammount,
            productName: amount.productName,
            SKU: amount.SKU,
            supplierName: amount.supplierName,
            UPC: amount.UPC,
            imageUrl: amount.imageUrl,
            isSelected: sel.id === amount.id ? true : false
          };
          amountsArr.push(newAmount);
        }
      }
    } else {
      if (arr.length > 0) {
        for (const amount of arr) {
          let newAmount: RechargeAmount = {
            id: amount.id,
            ammount: amount.ammount,
            productName: amount.productName,
            SKU: amount.SKU,
            supplierName: amount.supplierName,
            UPC: amount.UPC,
            imageUrl: amount.imageUrl,
            isSelected: false
          };
          amountsArr.push(newAmount);
        }
      }
    }
    return amountsArr;
  };
  const showOnlySupplier = async (amountsArray: RechargeAmount[]) => {
    const arr = amountsArray;
    const onlySupplierArr: RechargeAmount[] = [];
    if (arr.length > 0) {
      arr.forEach(element => {
        if (element.supplierName === supplier.type) {
          onlySupplierArr.push(element);
        }
      });
    }
    setSupplierRecharges(onlySupplierArr);
  };

  useEffect(() => {
    getRechargeAmounts().then(data => {
      setAmountsForCards(data).then(amountsArr => {
        showOnlySupplier(amountsArr);
      });
    });
  }, [getRechargeAmounts]);
  return (
    <RechargeAmountScreen suppliersAmounts={supplierRecharges as RechargeAmount[]} supplier={supplier as RechargeSupplier} onPressAmount={OnPressAmount} />
  );
};

export default RechargeAmountController;
