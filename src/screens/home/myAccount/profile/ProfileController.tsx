import React, { useCallback, useEffect } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { useLoading } from 'context';
import { getUserAddressesThunk, RootState, setAccountId, setAuthEmail, setId, setLastName, setName, setUserId, useAppSelector } from 'rtk';
import { authServices, vtexUserServices } from 'services';
import { AuthDataInterface, UserVtex } from 'rtk/types/auth.types';
import { useToast } from 'context';
import { GENDERS } from 'assets/files';
import { formatDate } from 'utils/functions';

import { setBirthday, setFullName, setGender, setTelephone, useAppDispatch } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const ProfileController: React.FC = () => {
  const loader = useLoading();
  const { userVtex } = useAppSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { email } = userVtex;
  const newDate = (date: string) => {
    let formatDay = new Date(date);
    let help: string = formatDate(formatDay).toString();
    return help;
  };

  const getUser = useCallback(async () => {
    try {
      const { data } = await vtexUserServices.getUserByEmail(email);
      const dataVtex: UserVtex = {
        homePhone: data[0].homePhone,
        email: data[0].email,
        gender: data[0].gender,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        birthDate: data[0].birthDate,
        profilePicture: data[0].profilePicture,
        accountId: data[0].accountId,
        id: data[0].id,
        userId: data[0].userId
      };
      dispatch(setAuthEmail({ email: dataVtex.email }));
      dispatch(setTelephone({ telephone: dataVtex.homePhone }));
      dispatch(setGender({ gender: dataVtex.gender }));
      dispatch(setName({ name: dataVtex.firstName }));
      dispatch(setLastName({ lastName: dataVtex.lastName }));
      dispatch(setUserId({ user_id: dataVtex.userId }));
      dispatch(setId({ id: dataVtex.id, email: email }));
      dispatch(setBirthday({ birthday: dataVtex.birthDate }));
      dispatch(setAccountId({ accountId: dataVtex.accountId, email: email }));
      console.log('TOMATE', JSON.stringify(data[0], null, 3));
      console.log('PLATANOS', JSON.stringify(dataVtex, null, 3));
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const update = async () => {
    loader.show();
    const dataVtex: UserVtex = {
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

    const updatedUser: UserVtex = {
      homePhone: userFields.telephone == '' || userFields.telephone == null ? null : userPhone,
      firstName: userFields.name ? userFields.name : null,
      lastName: userFields.lastName ? userFields.lastName : null,
      gender: userFields.gender == '' ? null : userFields.gender,
      email: email,
      birthDate: userFields.birthday == undefined ? null : newDate(userFields.birthday)
    };
    //prevents unhandled email update
    const { id } = userVtex;
    userFields.id = id;
    const gender = GENDERS.find(gender => {
      return gender.name === userFields.gender;
    });
    userFields.gender = gender?.id as number;
    loader.show();
    try {
      await vtexUserServices.putUserByEmail(updatedUser);
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
