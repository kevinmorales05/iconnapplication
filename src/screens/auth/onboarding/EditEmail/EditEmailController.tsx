import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import EnterEmailScreen from '../EnterEmail/EnterEmailScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { AboutEmail } from 'components/organisms/AboutEmail';
import { useAlert, useLoading } from 'context';
import { preSignUpThunk, validateUserThunk } from 'rtk/thunks/auth.thunks';
import {
  AuthDataInterface,
  RootState,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { setAuthEmail } from 'rtk/slices/authSlice';
import { useToast } from 'context';
import { authServices } from 'services';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [aboutEmailVisible, setAboutEmailVisible] = useState<boolean>(false);
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();
  const toast = useToast();
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const onPressEmailInfo = () => {
    setAboutEmailVisible(true);
  };

  const onPressOut = () => {
    setAboutEmailVisible(false);
  };

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

  const onSubmit = async (email: string) => {
    loader.show();
    try {
      const { payload } = await dispatch(validateUserThunk(email));
      if (payload.responseCode === 200) {
        dispatch(setAuthEmail({ email }));
        if (!payload.data.isRegistered && payload.data.signMode === 0) {
          const { payload } = await dispatch(preSignUpThunk(email));
          if (payload.responseCode === 201) {
            loader.show()
            try {
              await authServices.putUser({
                user_id: user.user_id,
                email
              } as AuthDataInterface);

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
              loader.hide()
            }
          }
        } else if (payload.data.isRegistered) {
          if (payload.data.signMode === 1) {
            showAlert();
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

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterEmailScreen
        title={'Ingresa tu nueva dirección\n de correo electrónico'}
        goBack={goBack}
        onSubmit={onSubmit}
        onPressInfo={onPressEmailInfo}
      />
      <AboutEmail
        visible={aboutEmailVisible}
        onUnderstood={onPressOut}
        onPressOut={onPressOut}
      />
    </SafeArea>
  );
};

export default EnterEmailController;
