import React, { useEffect } from 'react';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import {
  RootState,
  sendEmailToRecoverPasswordThunk,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { useToast, useLoading, useAlert } from 'context';
import { authServices } from 'services';
import { HttpClient } from '../../../../http/http-client';

const ForgotPasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  let { email } = user;
  const loader = useLoading();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const authToken = HttpClient.accessToken;
  const alert = useAlert();



  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const sendKey = async ( ) => {
    try {
      const response = await authServices.sendAccessKey(email, authToken);
      console.log('SE MANDO ACCESS KEY', response);
      if (response.authStatus == 'InvalidToken') {
        alert.show({ title: 'Ocurrió un error inesperado :(' }, 'error');
      } else {
        navigate('EnterOtp', {authenticationToken: authToken as string, variant:"recoverPassword"});
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async () => {
    loader.show();
    const { payload: sendEmailResponse } = await dispatch(
      sendEmailToRecoverPasswordThunk({ email })
    );
    // TODO: The response code must be updated according to the document "Microservicio Users v_1.2.pdf"
    if (sendEmailResponse.responseCode === 12) {
      toast.show({
        message: 'Correo de recuperación enviado\n exitosamente.',
        type: 'success'
      });
      navigate('ContinueWith');
    } else {
      toast.show({
        message: 'El correo no pudo ser enviado,\n intenta más tarde.',
        type: 'error'
      });
    }
  };
  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <ForgotPasswordScreen goBack={goBack} email={email} onSubmit={sendKey} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default ForgotPasswordController;
