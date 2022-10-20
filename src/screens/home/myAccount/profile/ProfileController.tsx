import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { RootState, setLastName, setName, useAppSelector } from 'rtk';
import { useLoading, useAlert } from 'context';
import { authServices, vtexUserServices } from 'services';
import { AuthDataInterface } from 'rtk/types/auth.types';
import { useToast } from 'context';
import { setBirthday, setGender, setTelephone, useAppDispatch } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { HttpClient } from '../../../../http/http-client';
import moment from 'moment';
import { formatDate } from 'utils/functions';

const ProfileController: React.FC = () => {
  const loader = useLoading();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const authToken = HttpClient.accessToken;
  const alert = useAlert();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { email } = user;
  console.log('TOKEN!', authToken);

  const goToChangePassword = async () => {
    try {
      const response = await authServices.sendAccessKey(email as string, authToken as string);
      if (response.authStatus == 'InvalidToken') {
        alert.show({ title: 'Ocurrió un error inesperado :(' }, 'error');
      } else {
        toast.show({
          message: 'Correo enviado exitosamente.',
          type: 'success'
        });
        navigate('ChangePassword', { authenticationToken: authToken as string, variant: 'recoverPassword' });
      }
    } catch (error) {
      console.log('ERROR', error);
      toast.show({
        message: 'El correo no pudo ser enviado,\n intenta más tarde',
        type: 'error'
      });
    }
  };

  const onSubmit = async (userFields: any) => {
    loader.show();
    const dateMomentObject = moment(userFields.birthday, 'DD/MM/YYYY');
    const dateObject = dateMomentObject.toDate();
    const updatedUser: AuthDataInterface = {
      homePhone: userFields.telephone,
      firstName: userFields.name,
      lastName: userFields.lastName,
      gender: userFields.gender,
      email: email,
      birthDate: userFields.birthday ? formatDate(dateObject, "yyyy'-'MM'-'dd'T'HH':'mm':'ss") : null
    };
    try {
      const resp = await vtexUserServices.putUserByEmail(updatedUser);
      if (resp && resp.DocumentId) {
        dispatch(setTelephone({ telephone: userFields.telephone }));
        dispatch(setGender({ gender: userFields.gender }));
        dispatch(setBirthday({ birthday: formatDate(dateObject, "yyyy'-'MM'-'dd'T'HH':'mm':'ss") }));
        dispatch(setName({ name: userFields.name }));
        dispatch(setLastName({ lastName: userFields.lastName }));
        toast.show({
          message: 'Datos guardados exitosamente.',
          type: 'success'
        });
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    } finally {
      loader.hide();
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <ProfileScreen onLogout={() => {}} onSubmit={onSubmit} goToChangePwd={goToChangePassword} />
    </SafeArea>
  );
};

export default ProfileController;
