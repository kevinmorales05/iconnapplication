import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import EnterEmailScreen from './EnterEmailScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useAlert, useLoading, useToast } from 'context';
import { RootState, useAppDispatch, useAppSelector, UserInterface, UserVtex } from 'rtk';
import { setAuthEmail, setUserId } from 'rtk/slices/authSlice';
import { authServices } from 'services';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();
  const toast = useToast();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const showAlert = () => {};

  const createSession = async (email: string) => {
    // check if user is already registered
    try {
      const profiles = await authServices.getProfile(email);

      console.log('profiles:', profiles);

      const current: UserInterface | undefined = profiles.find((profile: UserInterface) => {
        return profile.email === email;
      });

      if (!current) {
        // start onboarding
        try {
          loader.show();
            const { authenticationToken } = await authServices.startAuthentication(email);
            dispatch(setAuthEmail({ email }));
            await authServices.sendAccessKey(email, authenticationToken);
            navigate('CreatePassword', { authenticationToken, variant: 'register' });
            loader.hide();
            return;
        } catch (error) {
          toast.show({
            message: 'El correo no pudo ser enviado,\n intenta más tarde',
            type: 'error'
          });

          loader.hide();
          return;
        }
      } else {
        setUserId({ user_id: current.id });
        // login
        try {
          await authServices.startAuthentication(email);
          dispatch(setAuthEmail({ email }));
          navigate('EnterPassword');
        } catch (error) {
          console.log('LOGIN ERROR', error);
        }
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <SafeArea topSafeArea={true} bottomSafeArea={true} barStyle="dark">
      <EnterEmailScreen title={`Ingresa tu dirección de \ncorreo electrónico`} goBack={goBack} onSubmit={createSession} />
    </SafeArea>
  );
};

export default EnterEmailController;
