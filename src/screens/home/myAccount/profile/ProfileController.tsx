import React, { useCallback, useEffect } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { useLoading } from 'context';
import { RootState, setAccountId, setAuthEmail, setId, setLastName, setName, setUserId, useAppSelector } from 'rtk';
import { vtexUserServices } from 'services';
import { AuthDataInterface } from 'rtk/types/auth.types';
import { useToast } from 'context';
import { GENDERS } from 'assets/files';
import { formatDate } from 'utils/functions';
import { setBirthday, setGender, setTelephone, useAppDispatch } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const ProfileController: React.FC = () => {
  const loader = useLoading();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { email } = user;
  const newDate = (date: string) => {
    let formatDay = new Date(date);
    let help: string = formatDate(formatDay).toString();
    return help;
  };

  const getUser = useCallback(async () => {
    try {
      const { data } = await vtexUserServices.getUserByEmail(email!);
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
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const update = async () => {
    loader.show();
    // TODO: be careful with this dataVtex, why do we need this?
    const dataVtex: AuthDataInterface = {
      firstName: 'Valerie',
      lastName: 'Namuche',
      email: email
    };
    try {
      const updated = await vtexUserServices.putUserByEmail(dataVtex);
      console.log('WAHAHA', updated);
      getUser();
      /*       const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000); */
      loader.hide();
    } catch (error) {
      console.log('ERROR', error);
      loader.hide();
    }
  };
  useEffect(() => {
    getUser();
  }, [update]);

  const goToChange = () => {
    navigate('ChangePassword');
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
      }
      if (userFields.gender != '') {
        dispatch(setGender({ gender: userFields.gender }));
      }
      if (userFields.birthday != '') {
        dispatch(setBirthday({ birthday: userFields.birthday }));
      }
      if (userFields.name) {
        dispatch(setName({ name: userFields.name }));
      }
      if (userFields.lastName) {
        dispatch(setLastName({ lastName: userFields.lastName }));
      }
      toast.show({
        message: 'Datos guardados exitosamente.',
        type: 'success'
      });
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos. /n Intenta mas tarde.',
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
