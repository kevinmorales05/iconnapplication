import React, { useEffect } from 'react';
import { authServices } from 'services';
import { AuthStackParams } from 'navigation/types';
import { HttpClient } from '../../../../http/http-client';
import { logEvent } from 'utils/analytics';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState, useAppSelector } from 'rtk';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { useToast, useLoading, useAlert } from 'context';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const ForgotPasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  let { email } = user;
  const loader = useLoading();
  const toast = useToast();
  const authToken = HttpClient.accessToken;
  const alert = useAlert();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const sendKey = async () => {
    try {
      const response = await authServices.sendAccessKey(email as string, authToken as string);
      if (response.authStatus == 'InvalidToken') {
        alert.show({ title: 'Ocurrió un error inesperado :(' }, 'error');
      } else {
        navigate('CreatePassword', { authenticationToken: authToken as string, variant: 'recoverPassword' });
      }
    } catch (error) {
      toast.show({
        message: 'El correo no pudo ser enviado,\n intenta más tarde',
        type: 'error'
      });
    }
    logEvent('sendRecoveryEmail', {
      id: user.id,
      description: 'Seleccionar botón de "Enviar correo" en la pantalla de "Olvidé mi contraseña"'
    });
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <ForgotPasswordScreen goBack={goBack} email={email} onSubmit={sendKey} />
    </SafeArea>
  );
};

export default ForgotPasswordController;
