import EnterPasswordScreen from './EnterPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { useLoading, useAlert } from 'context';
import { HttpClient } from '../../../../http/http-client';

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
  useAppSelector,
  setName,
  setAccountId,
  setId,
  setLastName,
  UserVtex,
} from 'rtk';
import React, { useCallback, useEffect, useState } from 'react';
import { authServices, vtexUserServices } from 'services';
import {vtexauthServices} from 'services/vtexauth.services';

const EnterPasswordController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user, userVtex } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const alert = useAlert();
  const [accountError, setAccountError] = useState('');
  const authToken = HttpClient.accessToken;

  const getUser = useCallback(async (email: string) => {
    const { data } = await vtexUserServices.getUserByEmail(email);
    const dataVtex : UserVtex = {
      homePhone: data[0].homePhone,
      email: data[0].email,
      gender: data[0].gender,
      firstName: data[0].firstName,
      lastName: data[0].lastName,
      birthDate: data[0].birthDate,
      profilePicture: data[0].profilePicture,
      accountId: data[0].accountId,
      id: data[0].id,
      userId: data[0].userId, 
    }
    dispatch(setAuthEmail({email: dataVtex.email}));
    dispatch(setTelephone({telephone: dataVtex.homePhone}));
    dispatch(setGender({gender: dataVtex.gender}));
    dispatch(setName({name: dataVtex.firstName}));
    dispatch(setLastName({lastName: dataVtex.lastName}));
    dispatch(setUserId({user_id: dataVtex.userId }));
    dispatch(setId({id: dataVtex.id, email: email as string}));
    dispatch(setBirthday({birthday: dataVtex.birthDate}));
    dispatch(setAccountId({accountId: dataVtex.accountId, email: email as string}));


    console.log('TOMATE CONTRASEÑA', JSON.stringify(data[0], null, 3) );
    console.log('PLATANOS CONTRASEÑA', JSON.stringify(dataVtex, null, 3) );

  }, []);

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

  const vauth = async ( password : string) => {
    try {
      const response = await authServices.login(email as string, password, authToken as string);
      if(response.authStatus == 'Success') {
        getUser(email as string);
        dispatch(setIsLogged({ isLogged: true }));
      } else if (response.authStatus == 'WrongCredentials') {
        setAccountError('Contraseña incorrecta');
      } else {
        alert.show({ title: 'Lo sentimos', message: 'No pudimos ingresar a tu cuenta en este momento. Por favor intenta más tarde.',  });
      }
    } catch (error) {
      console.log(error)
    }
  }


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
        onSubmit={vauth}
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
