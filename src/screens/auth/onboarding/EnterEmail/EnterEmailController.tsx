import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import EnterEmailScreen from './EnterEmailScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { AboutEmail } from 'components/organisms/AboutEmail';
import { useAlert, useLoading } from 'context';
import { preSignUpThunk, validateUserThunk } from 'rtk/thunks/auth.thunks';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { setAuthEmail, setSignMode } from 'rtk/slices/authSlice';
import {vtexauthServices} from 'services/vtexauth.services';



const EnterEmailController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();

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
        navigate('ContinueWith');
      }
    });
  };

  const onSubmit = async (email: string) => {
    loader.show();
    try {
      const { payload } = await dispatch(validateUserThunk(email));
      if (payload.responseCode === 200) {
        dispatch(setAuthEmail({email}))
        if (!payload.data.isRegistered && payload.data.signMode === 0) {
          const { payload } = await dispatch(preSignUpThunk(email));
          if (payload.responseCode === 201){
            dispatch(setSignMode({sign_app_modes_id: 1}))
            navigate('EnterOtp');
          }        
        } else if (payload.data.isRegistered) {
          if (payload.data.signMode === 1) {
            navigate('EnterPassword');
          } else if (payload.data.signMode === 2) {
            showAlert();
          } else if (payload.data.signMode === 3) {
            showAlert();
          } else if (payload.data.signMode === 4) {
            showAlert();
          }
        }
      }      
    } catch (error) {
      console.error('Unknow Error', error);
    }
  };

  const createSession = async (email: string) => {
    loader.show();
    try {
      await vtexauthServices.startAuthentication(email);
      dispatch(setAuthEmail({email}));
      navigate('EnterPassword');
    } catch (error) {
      console.log('LOGIN ERROR', error);
    }
  }


  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterEmailScreen
        title={`Ingresa tu dirección de \ncorreo electrónico`}
        goBack={goBack}
        onSubmit={createSession}
      />
    </SafeArea>
  );
};

export default EnterEmailController;
