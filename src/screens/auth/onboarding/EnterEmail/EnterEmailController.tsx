import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import EnterEmailScreen from './EnterEmailScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading, useToast } from 'context';
import { AuthDataInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { setAuthEmail, setAuthenticationToken, setId, setUserId } from 'rtk/slices/authSlice';
import { authServices } from 'services';
import { logEvent } from 'utils/analytics';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const createSession = async (email: string) => {
    // check if user is already registered
    try {
      const profiles = await authServices.getProfile(email);
      const current: AuthDataInterface | undefined = profiles.find((profile: AuthDataInterface) => {
        return profile.email === email;
      });

      if (!current) {
        // start onboarding; for completely new users
        try {
          loader.show();
          const { authenticationToken } = await authServices.startAuthentication(email);
          dispatch(setAuthEmail({ email }));
          dispatch(setAuthenticationToken(authenticationToken));
          await authServices.sendAccessKey(email, authenticationToken);
          navigate('CreatePassword', { authenticationToken, variant: 'register' });
          loader.hide();
          logEvent('loginEmailNext', {
            id: user.id,
            description: 'Seleccionar siguiente'
          });
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
        dispatch(setUserId({ userId: current.userId }));
        dispatch(setId({ id: current.id }));
        // login
        try {
          const { authenticationToken } = await authServices.startAuthentication(email);
          dispatch(setAuthEmail({ email }));
          dispatch(setAuthenticationToken(authenticationToken));
          navigate('EnterPassword');
          logEvent('loginEmailNext', {
            id: user.id,
            description: 'Seleccionar siguiente'
          });
        } catch (error) {
          toast.show({
            message: `Ocurrió un error en el login: ${error}`,
            type: 'error'
          });
        }
      }
    } catch (error) {
      toast.show({
        message: `Ocurrió un error: ${error}`,
        type: 'error'
      });
    }
  };

  return (
    <SafeArea topSafeArea={true} bottomSafeArea={true} barStyle="dark">
      <EnterEmailScreen title={'Ingresa tu dirección de\ncorreo electrónico'} goBack={goBack} onSubmit={createSession} />
    </SafeArea>
  );
};

export default EnterEmailController;
