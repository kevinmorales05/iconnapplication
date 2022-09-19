import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import EnterEmailScreen from './EnterEmailScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { AboutEmail } from 'components/organisms/AboutEmail';
import { useAlert, useLoading, useToast } from 'context';
import { preSignUpThunk, validateUserThunk } from 'rtk/thunks/auth.thunks';
import { RootState, useAppDispatch, useAppSelector, UserInterface } from 'rtk';
import { setAuthEmail, setSignMode, setUserId } from 'rtk/slices/authSlice';
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

  const showAlert = () => {
    alert.show({
      title: 'Ya tienes una cuenta',
      message: 'Este correo está asociado a una cuenta existente.',
      acceptTitle: 'Entendido',
      onAccept() {
        alert.hide();
      }
    });
  };

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

          console.log('authenticationToken:', authenticationToken);

          await authServices.sendAccessKey(email, authenticationToken);
          dispatch(setAuthEmail({ email }));
          navigate('EnterOtp', { authenticationToken });

          loader.hide();
          return;
        } catch (error) {
          toast.show({
            message: 'El correo no pude ser enviado,\n intenta mas tarde',
            type: 'error'
          });

          loader.hide();
          return;
        }
      } else {
        showAlert();
        setUserId({ user_id: current.id });
      }
    } catch (error) {
      console.log('error');
    }

    // login

    try {
      const response = await authServices.startAuthentication(email);

      console.log('response:', response);
      dispatch(setAuthEmail({ email }));
      navigate('EnterPassword');
    } catch (error) {
      console.log('LOGIN ERROR', error);
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterEmailScreen title={`Ingresa tu dirección de \ncorreo electrónico`} goBack={goBack} onSubmit={createSession} />
    </SafeArea>
  );
};

export default EnterEmailController;
