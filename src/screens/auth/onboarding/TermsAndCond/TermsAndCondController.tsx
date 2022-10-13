import React, { useEffect } from 'react';
import TermsAndCondScreen from './TermsAndCondScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams, HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { RootState, setUserId, useAppDispatch, useAppSelector, setIsLogged, setAuthCookie, setAccountAuthCookie } from 'rtk';
import { useAlert, useLoading, useToast } from 'context';

import { authServices } from 'services';
import { AxiosError } from 'axios';

const TermsAndCondController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();
  const toast = useToast();

  const { navigate: nav } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const route = useRoute<RouteProp<AuthStackParams, 'TermsAndCond'>>();

  const { authenticationToken, accessKey, newPassword } = route.params;

  /**
   * 1. Register email and pass into firebase.
   * 2. Register into DB.
   * 3. Firebase signIn.
   */
  const onSubmit = async () => {
    loader.show();
    try {
      await authServices.createUser(user.email as string);

      const { userId, authStatus, authCookie, accountAuthCookie } = await authServices.createPassword(
        newPassword,
        accessKey,
        user.email as string,
        authenticationToken
      );
      loader.hide();

      if (authStatus === 'Success') {
        dispatch(setAuthCookie(authCookie));
        dispatch(setAccountAuthCookie(accountAuthCookie));
        dispatch(setUserId({ userId: userId }));
        dispatch(setIsLogged({ isLogged: true }));
      } else {
        alert.show(
          {
            title: 'Lo sentimos',
            message: 'No pudimos crear tu cuenta en este momento. Por favor, intenta más tarde.',
            acceptTitle: 'Entendido',
            async onAccept() {
              alert.hide();
            }
          },
          'error'
        );
      }
    } catch (error) {
      loader.hide();
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
              nav('EnterOtp', { authenticationToken, variant: 'register' });
              alert.hide();
            }
          },
          'error'
        );
      }
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} backgroundColor="white" barStyle="dark" css={styles.backgroundImage}>
      <TermsAndCondScreen goBack={goBack} onSubmit={onSubmit} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0
  }
});

export default TermsAndCondController;
