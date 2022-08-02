import EnterPasswordScreen from './EnterPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { useLoading, useAlert } from 'context';
import {
  getUserThunk,
  RootState,
  setAuthEmail,
  setBirthday,
  setEmailVerified,
  setFullName,
  setGender,
  setIsLogged,
  setPassword,
  setTelephone,
  setPhoto,
  setSignMode,
  setUserId,
  signInWithEmailAndPasswordThunk,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import React, { useEffect, useState } from 'react';

const EnterPasswordController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const alert = useAlert();
  const [accountError, setAccountError] = useState('');

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const goToForgotPassword = () => {
    navigate('ForgotPassword');
  };

  const manageFirebaseLoginError = (error: string) => {
    switch (error) {
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/too-many-requests':
        return 'Cuenta bloqueada temporalmente, cambie su contraseña.';
      case 'auth/network-request-failed':
        return 'No hay conexión a internet.'
      default:
        return error;
    }
  };

  const onSubmit = async (password: string) => {
    loader.show();
    try {
      const response = await dispatch(
        signInWithEmailAndPasswordThunk({ email: email!, pass: password })
      );

      if (response.error) {        
        const msg = manageFirebaseLoginError(response.error.code);
        setAccountError(msg);
      } else {
        if (response.payload) {
          if (!response.payload.additionalUserInfo.isNewUser) {
            const { payload: payloadSignIn } = await dispatch(
              getUserThunk({ user_id: response.payload.user.uid })
            );
            if (payloadSignIn.data) {
              const {
                user_id,
                name,
                lastName,
                email,
                telephone,
                birthday,
                gender_id,
                photo,
                sign_app_modes_id
              } = payloadSignIn.data;
              dispatch(setPassword({ pass: password }));
              dispatch(setSignMode({ sign_app_modes_id: sign_app_modes_id }));
              dispatch(setUserId({ user_id: user_id }));
              dispatch(setAuthEmail({ email: email }));
              dispatch(setPhoto({ photo: photo }));
              dispatch(setEmailVerified({ emailVerified: true }));
              dispatch(setTelephone({ telephone: telephone }));
              dispatch(setGender({ gender: gender_id }));
              dispatch(setBirthday({ birthday: birthday }));
              dispatch(setFullName({ name: name, lastName: lastName }));
              dispatch(setIsLogged({ isLogged: true }));
            }
          }
        } else {
          console.error(response);
          alert.show({ title: 'Ocurrió un error inesperado :(' }, 'error');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterPasswordScreen
        accountError={accountError}
        goBack={goBack}
        email={email}
        onSubmit={onSubmit}
        goToForgotPassword={goToForgotPassword}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default EnterPasswordController;
