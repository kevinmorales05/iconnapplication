import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { SafeArea } from 'components/atoms/SafeArea';
import { useAlert, useLoading } from 'context';
import { AuthStackParams } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RootState, setPassword, useAppDispatch, useAppSelector } from 'rtk';
import { authServices } from 'services';
import CreatePasswordScreen from './CreatePasswordScreen';

const CreatePasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  const route = useRoute<RouteProp<AuthStackParams, 'CreatePassword'>>();

  const { authenticationToken, accessKey, variant } = route.params;

  const loader = useLoading();
  const alert = useAlert();

  const onSubmit = async (password: string) => {
    if (variant === 'register') {
      dispatch(setPassword({ pass: password }));
      navigate('TermsAndCond', { authenticationToken, accessKey, newPassword: password });
      return;
    }

    if (variant === 'recoverPassword') {
      loader.show();

      try {
        const changed = await authServices.createPassword(password, accessKey, email as string, authenticationToken);
        if (changed.authStatus == 'Success') {
          navigate('ChangedPassword', { authenticationToken: authenticationToken, password });
        } else {
          console.log('ERROR CAMBIO CONTRASEÑA');
        }
      } catch (error) {
        console.log('ERROR CAMBIO CONTRASEÑA', error);
        const { response } = error as AxiosError;
        const data = response?.data as any;
        const { authStatus } = data;

        if (authStatus === 'WrongCredentials') {
          alert.show(
            {
              title: 'El código que ingresaste es incorrecto',
              message: 'Ingresa los 6 dígitos que enviamos a tu correo.',
              acceptTitle: 'Entendido',
              async onAccept() {
                navigate('EnterOtp', { authenticationToken, variant: 'recoverPassword' });
                alert.hide();
              }
            },
            'error'
          );
        }
      } finally {
        loader.hide();
      }

      return;
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <CreatePasswordScreen goBack={goBack} onSubmit={onSubmit} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default CreatePasswordController;
