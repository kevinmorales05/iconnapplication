import EnterPasswordScreen from './EnterPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { useLoading, useAlert } from 'context';
import { HttpClient } from '../../../../http/http-client';

import {
  RootState,
  setAuthEmail,
  setBirthday,
  setGender,
  setIsLogged,
  setTelephone,
  setUserId,
  useAppDispatch,
  useAppSelector,
  setName,
  setAccountId,
  setId,
  setLastName,
  AuthDataInterface,
  setAuthCookie,
  setAccountAuthCookie
} from 'rtk';
import React, { useCallback, useEffect, useState } from 'react';
import { authServices, vtexUserServices } from 'services';

const EnterPasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const alert = useAlert();
  const [accountError, setAccountError] = useState('');
  const authToken = HttpClient.accessToken;

  const getUser = useCallback(async (email: string) => {
    const { data } = await vtexUserServices.getUserByEmail(email);
    const dataVtex: AuthDataInterface = {
      telephone: data[0].homePhone,
      email: data[0].email,
      gender: data[0].gender,
      name: data[0].firstName,
      lastName: data[0].lastName,
      birthday: data[0].birthDate,
      photo: data[0].profilePicture,
      accountId: data[0].accountId,
      id: data[0].id,
      userId: data[0].userId
    };
    dispatch(setAuthEmail({ email: dataVtex.email }));
    dispatch(setTelephone({ telephone: dataVtex.telephone }));
    dispatch(setGender({ gender: dataVtex.gender }));
    dispatch(setName({ name: dataVtex.name }));
    dispatch(setLastName({ lastName: dataVtex.lastName }));
    dispatch(setUserId({ userId: dataVtex.userId }));
    dispatch(setId({ id: dataVtex.id }));
    dispatch(setBirthday({ birthday: dataVtex.birthday }));
    dispatch(setAccountId({ accountId: dataVtex.accountId }));
  }, []);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const goToForgotPassword = () => {
    navigate('ForgotPassword');
  };

  const vauth = async (password: string) => {
    try {
      const response = await authServices.login(email as string, password, authToken as string);
      if (response.authStatus == 'Success') {
        getUser(email as string);
        dispatch(setAuthCookie(response.authCookie));
        dispatch(setAccountAuthCookie(response.accountAuthCookie));
        dispatch(setIsLogged({ isLogged: true }));
      } else if (response.authStatus == 'WrongCredentials') {
        setAccountError('Contraseña incorrecta');
      } else {
        alert.show({ title: 'Lo sentimos', message: 'No pudimos ingresar a tu cuenta en este momento. Por favor intenta más tarde.' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterPasswordScreen accountError={accountError} goBack={goBack} email={email} onSubmit={vauth} goToForgotPassword={goToForgotPassword} />
    </SafeArea>
  );
};

export default EnterPasswordController;
