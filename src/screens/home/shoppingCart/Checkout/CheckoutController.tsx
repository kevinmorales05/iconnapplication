import React, { useEffect, useRef, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading, useToast } from 'context';
import { FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { CheckoutScreen } from 'components';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';

const CheckoutController: React.FC<any> = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { navigate, goBack, reset } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { orderFormId } = useAppSelector((state: RootState) => state.cart.cart);

  const onSubmit = async (fields: FieldValues) => {};

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark" childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <CheckoutScreen onSubmit={onSubmit} goBack={goBack} reset={reset} user={user} orderFormId={orderFormId} />
    </SafeArea>
  );
};

export default CheckoutController;
