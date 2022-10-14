import React, { useEffect, useState } from 'react';
import EnterPasswordScreen from './EnterPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { useLoading, useAlert } from 'context';
import { HttpClient } from '../../../../http/http-client';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';

import { RootState, setIsLogged, useAppDispatch, useAppSelector, setAuthCookie, setAccountAuthCookie } from 'rtk';

import { authServices } from 'services';

const EnterPasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const alert = useAlert();
  const [accountError, setAccountError] = useState('');
  const authToken = HttpClient.accessToken;
  const {getUser} = useOnboarding();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const goToForgotPassword = () => {
    navigate('ForgotPassword');
  };

  const vauth = async (password: string) => {
    try {
      const response = await authServices.login(email as string, password, authToken as string);
      if (response.authStatus == 'Success') {
        dispatch(setAuthCookie(response.authCookie));
        dispatch(setAccountAuthCookie(response.accountAuthCookie));
        dispatch(setIsLogged({ isLogged: true }));
        getUser(email as string, true);
      } else if (response.authStatus == 'WrongCredentials') {
        setAccountError('Contraseña incorrecta');
      } else {
        alert.show({ title: 'Lo sentimos', message: 'No pudimos ingresar a tu cuenta en este momento. Por favor intenta más tarde.' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterPasswordScreen accountError={accountError} goBack={goBack} email={email} onSubmit={vauth} goToForgotPassword={goToForgotPassword} />
    </SafeArea>
  );
};

export default EnterPasswordController;
