import React, { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { SafeArea } from 'components/atoms/SafeArea';
import { useAlert, useLoading, useToast } from 'context';
import { AuthStackParams, HomeStackParams } from 'navigation/types';
import { RootState, setAuthInitialState, setIsLogged, setUserId, useAppDispatch, useAppSelector, AuthDataInterface, setAuthCookie, setAccountAuthCookie } from 'rtk';
import { authServices } from 'services';
import ChangePasswordScreen from './ChangePasswordScreen';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { HttpClient } from '../../../../http/http-client';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';

const ChangePasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const toast = useToast();



  const route = useRoute<RouteProp<HomeStackParams, 'ChangePassword'>>();

  const methods = useForm({
    mode: 'onChange'
  });

  const { setError } = methods;

  const { authenticationToken } = route.params;

  const loader = useLoading();
  const alert = useAlert();
  

  const returnToSend = () => {
    dispatch(setAuthInitialState());
    goBack();
  };

  const onSubmit = async (fields: FieldValues) => {
    const { password, code } = fields;
    const user: AuthDataInterface = {
      email: email,
    };
    console.log('DATOS', password, code, user);

    loader.show();
    try {
      const { authStatus } = await authServices.createPassword(
        password,
        code,
        user.email as string,
        authenticationToken
        );
        console.log('AUTHSTATUS', authStatus);
        if(authStatus === 'Success' ) {
          toast.show({
            message: 'Contraseña cambiada exitosamente.',
            type: 'success'
          });
          navigate('Profile');
        } else {
          alert.show(
            {
              title: 'Lo sentimos',
              message: 'No pudimos cambiar tu contraseña. Intenta más tarde.',
              acceptTitle: 'Entendido',
              async onAccept() {
                alert.hide();
              }
            },
            'error'
          );
      }
    } catch (error) {
      console.log(error);
      const { response } = error as AxiosError;
      const data = response?.data as any;
      const { authStatus } = data;

      if (authStatus === 'WrongCredentials') {
        setError('code', { type: 'WrongCredentials', message: 'Código incorrecto' });
      }
      if (authStatus === 'BlockedUser') {
        setError('code', { type: 'BlockedUser', message: 'Usuario bloqueado' });
      }
    } finally {
      loader.hide();
    }

    return;
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <FormProvider {...methods}>
        <ChangePasswordScreen hasNavigationTitle={false} goBack={returnToSend} onSubmit={onSubmit} email={email as string} />
      </FormProvider>
    </SafeArea>
  );
};

export default ChangePasswordController;
