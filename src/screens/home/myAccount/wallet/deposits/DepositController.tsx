import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { BeneficiaryInterface, RootState, setBeneficiaries, useAppDispatch, useAppSelector } from 'rtk';
import DepositScreen from './DepositScreen';
import uuid from 'react-native-uuid';

const DepositController: React.FC = () => {
  const { banks, beneficiaries } = useAppSelector((state: RootState) => state.wallet);
  const { reset } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const route = useRoute<RouteProp<WalletStackParams, 'DepositWallet'>>();
  const dispatch = useAppDispatch();

  const onSubmit = async (fields: FieldValues) => {
    const { numberAccount, name, bank, tag } = fields;
    const data: BeneficiaryInterface = {
      accountCard: numberAccount,
      name: name,
      bank: bank,
      tag: tag,
      id: route.params?.beneficiary?.id ? route.params.beneficiary.id : uuid.v4().toString()
    };
    const indexFind = beneficiaries?.findIndex(item => item.id === data.id);
    if (indexFind >= 0) {
      const beneficiariesTem = beneficiaries?.concat([]);
      beneficiariesTem[indexFind] = data;
      dispatch(setBeneficiaries(beneficiariesTem));
      reset({
        index: 0,
        routes: [{ name: 'ServicePaymentQRDetailDepositController', params: { beneficiary: data, toastState: 'edit' } }]
      });
    } else {
      if (beneficiaries?.length) {
        const beneficiariesTem = beneficiaries.concat([]);
        beneficiariesTem.push(data);
        dispatch(setBeneficiaries(beneficiariesTem));
      } else {
        dispatch(setBeneficiaries([data]));
      }
      reset({
        index: 0,
        routes: [{ name: 'ServicePaymentQRDetailDepositController', params: { beneficiary: data, toastState: 'new' } }]
      });
    }
  };

  return <DepositScreen beneficiary={route.params?.beneficiary! ? route.params.beneficiary : {}} banks={banks?.length ? banks : []} onSubmit={onSubmit} />;
};

export default DepositController;
