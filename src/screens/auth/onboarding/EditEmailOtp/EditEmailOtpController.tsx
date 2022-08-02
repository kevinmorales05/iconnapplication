import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import EnterOtpScreen from 'screens/auth/onboarding/EnterOtp/EnterOtpScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading } from 'context';
import { RootState, useAppDispatch, useAppSelector, AuthDataInterface, setAuthEmail } from 'rtk';
import { validateOtpThunk } from 'rtk/thunks/auth.thunks';
import { useToast } from 'context';
import { authServices } from 'services';

const EditEmailOtpController = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();
  const dispatch = useAppDispatch();

  const { loading, user } = useAppSelector((state: RootState) => state.auth);

  const route = useRoute<RouteProp<HomeStackParams, 'EnterOtp'>>();

  const { email } = route.params;

  const toast = useToast();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const [wrongCode, setWrongCode] = useState(false);

  const updateEmail = async (email: string) => {
    loader.show();
    try {
      await authServices.putUser({
        user_id: user.user_id,
        email
      } as AuthDataInterface);
      dispatch(setAuthEmail({ email }));

      toast.show({
        message: 'Datos guardos exitosamente.',
        type: 'success'
      });

      navigate('Profile');
    } catch (error) {
      toast.show({
        message: 'No se pudo editar el correo.',
        type: 'error'
      });
    } finally {
      loader.hide();
    }
  };

  const onSubmit = async (code: string) => {
    loader.show();
    try {
      const { payload } = await dispatch(validateOtpThunk({ email, code }));
      if (payload.responseCode === 201 && !payload.data.isValid) {
        setWrongCode(true);
      } else if (payload.responseCode === 201 && payload.data.isValid) {
        updateEmail(email as string);
      }
    } catch (error) {
      console.error('Unknow Error', error);
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterOtpScreen goBack={goBack} onSubmit={onSubmit} email={email} wrongCode={wrongCode} />
    </SafeArea>
  );
};

export default EditEmailOtpController;
