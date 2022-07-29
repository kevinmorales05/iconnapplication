import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams, HomeStackParams } from 'navigation/types';
import InvoiceScreen from './InvoiceScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useAlert, useLoading } from 'context';
import { preSignUpThunk, validateUserThunk } from 'rtk/thunks/auth.thunks';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { setAuthEmail, setSignMode } from 'rtk/slices/authSlice';
import theme from 'components/theme/theme';

const InvoiceController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const onSubmit = async () => navigate('CreateTaxProfile');

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <InvoiceScreen title={`Ingresa tu dirección de \ncorreo electrónico`} goBack={goBack} onSubmit={onSubmit} onPressInfo={() => {}} />
    </SafeArea>
  );
};

export default InvoiceController;
