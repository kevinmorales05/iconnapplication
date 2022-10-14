import React, { useEffect } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { RootState, setLastName, setName, useAppSelector } from 'rtk';
import { useLoading, useAlert } from 'context';
import { authServices, vtexUserServices } from 'services';
import { AuthDataInterface } from 'rtk/types/auth.types';
import { useToast } from 'context';
import { GENDERS } from 'assets/files';
import { formatDate } from 'utils/functions';
import { setBirthday, setGender, setTelephone, useAppDispatch } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';
import { HttpClient } from '../../../../http/http-client';

const ProfileController: React.FC = () => {
  const loader = useLoading();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const authToken = HttpClient.accessToken;
  const alert = useAlert();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { email } = user;
  const { getUser } = useOnboarding();
  const newDate = (date: string) => {
    let formatDay = new Date(date);
    let help: string = formatDate(formatDay).toString();
    return help;
  };

  useEffect(() => {
    getUser(email!);
  }, []);
  
  const goToChange = async () => {
    try {
      const response = await authServices.sendAccessKey(email as string, authToken as string);
      console.log('SE MANDO ACCESS KEY', response);
      if (response.authStatus == 'InvalidToken') {
        alert.show({ title: 'Ocurrió un error inesperado :(' }, 'error');
      } else {
        toast.show({
          message: 'Correo enviado exitosamente.',
          type: 'success'
        });
        navigate('ChangePassword', {authenticationToken: authToken as string, variant: 'recoverPassword'});
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
    console.log('FOCA', userFields);
    let userPhone: string;
    userPhone = '+' + userFields.countryCode + userFields.telephone;
    console.log('GOMA', userPhone);
    
    const updatedUser: AuthDataInterface = {
      homePhone: userFields.telephone == '' || userFields.telephone == null ? undefined : userPhone,
      firstName: userFields.name ? userFields.name : null,
      lastName: userFields.lastName ? userFields.lastName : null,
      gender: userFields.gender == '' ? null : userFields.gender,
      email: email,
      birthDate: userFields.birthday == undefined ? null : newDate(userFields.birthday)
    };
    console.log('this is the date ', updatedUser.birthDate);
    //prevents unhandled email update
    const { id } = user;
    userFields.id = id;
    const gender = GENDERS.find(gender => {
      return gender.name === userFields.gender;
    });
    userFields.gender = gender?.id as number;
    loader.show();
    try {
      await vtexUserServices.putUserByEmail(updatedUser);
      // TODO: Is necessary validate the response after update user. We cannot dispatch change on the user state without validate the response.
      if (userFields.telephone != '') {
        dispatch(setTelephone({ telephone: userFields.telephone }));
        console.log('TELEFONO', updatedUser.homePhone);
      }
      if (userFields.gender != '') {
        dispatch(setGender({ gender: userFields.gender }));
      }
      if (userFields.birthday != '') {
        dispatch(setBirthday({ birthday: userFields.birthday }));
      }
      if (userFields.name) {
        dispatch(setName({ name: userFields.name }));
        console.log('NOMBRE', updatedUser.firstName);
        
      }
      if (userFields.lastName) {
        dispatch(setLastName({ lastName: userFields.lastName }));
        console.log('APELLIDO', updatedUser.lastName);
      }
      toast.show({
        message: 'Datos guardados exitosamente.',
        type: 'success'
      });
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
      <ProfileScreen onLogout={() => {}} onSubmit={onSubmit} goToChangePwd={goToChange} />
    </SafeArea>
  );
};

export default ProfileController;
