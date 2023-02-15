import React, { useCallback, useEffect, useState } from 'react';
import EnterPasswordScreen from './EnterPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { useLoading, useAlert, useToast } from 'context';
import { HttpClient } from '../../../../http/http-client';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';

import { RootState, setIsLogged, useAppDispatch, useAppSelector, setAuthCookie, setAccountAuthCookie, setFavId, setFav } from 'rtk';

import { authServices } from 'services';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';
import { logEvent } from 'utils/analytics';

const EnterPasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const alert = useAlert();
  const [accountError, setAccountError] = useState('');
  const authToken = HttpClient.accessToken;
  const { getUser } = useOnboarding();
  const toast = useToast();

  const getFavorites = useCallback(async () => {
    const response = await vtexFavoriteServices.getFavoritesByUserEmail(email as string);
    const list = response[0].ListItemsWrapper[0].ListItems;
    dispatch(setFav(list));
    dispatch(setFavId(response[0].id));
  }, []);

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
        getFavorites();
      } else if (response.authStatus == 'WrongCredentials') {
        setAccountError('Contraseña incorrecta');
      } else {
        alert.show({
          title: 'Cuenta temporalmente bloqueada',
          message: 'Has excedido la cantidad de intentos permitidos, tu cuenta ha sido bloqueada durante 1 hora.'
        });
      }
      logEvent('nextPassword', {
        id: user.id,
        description: 'Seleccionar botón de Ingresar con correo electrónico'
      });
    } catch (error) {
      toast.show({
        message: `Ocurrió un error en la autenticación: ${error}`,
        type: 'error'
      });
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterPasswordScreen accountError={accountError} goBack={goBack} email={email} onSubmit={vauth} goToForgotPassword={goToForgotPassword} />
    </SafeArea>
  );
};

export default EnterPasswordController;
