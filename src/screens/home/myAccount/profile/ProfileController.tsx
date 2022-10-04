import React, { useCallback, useEffect } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { useLoading } from 'context';
import { getUserAddressesThunk, RootState, setAccountId, setAuthEmail, setId, setLastName, setName, setUserId, useAppSelector } from 'rtk';
import { authServices, vtexUserServices } from 'services';
import { AuthDataInterface, UserVtex } from 'rtk/types/auth.types';
import { useToast } from 'context';
import { GENDERS } from 'assets/files';

import {
  setBirthday,
  setFullName,
  setGender,
  setTelephone,
  useAppDispatch
} from 'rtk';

const ProfileController: React.FC = () => {
  const loader = useLoading();
  const { userVtex } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { email } = userVtex;

  const getUser = useCallback(async () => {
    try {
      
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
      dispatch(setId({id: dataVtex.id, email: email }));
      dispatch(setBirthday({birthday: dataVtex.birthDate}));
      dispatch(setAccountId({accountId: dataVtex.accountId, email: email}));
      console.log('TOMATE', JSON.stringify(data[0], null, 3) );
      console.log('PLATANOS', JSON.stringify(dataVtex, null, 3) );
    } catch (error) {
      console.log('error', error)
    }



  }, []);

 

  const update = async () => {
    loader.show();
    const dataVtex : UserVtex = {
      lastName: 'Namuche Z',
      email: email,     
    }
    try {
      const updated = await vtexUserServices.putUserByEmail(dataVtex);
      console.log('WAHAHA',updated);
      getUser();
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(3000);
      loader.hide();
    } catch (error) {
      console.log('ERROR', error);
      loader.hide();
    }

  }
  useEffect(() => {
    if (update) getUser();
  }, [update]);

  const onSubmit = async (userFields: UserVtex) => {
    //prevents unhandled email update
    const { accountId } = userVtex;
    userFields.id = accountId;
    const gender = GENDERS.find(gender => {
      return gender.name === userFields.gender;
    })
    userFields.gender = gender?.id as number;
    loader.show();
    try {
      await vtexUserServices.putUserByEmail(userFields);
      dispatch(setTelephone({ telephone: userFields.homePhone }));
      dispatch(setGender({ gender: userFields.gender }));
      dispatch(setBirthday({ birthday: userFields.birthDate }));
      dispatch(setName({ name: userFields.firstName }));
      dispatch(setLastName({lastName: userFields.lastName }));
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
      <ProfileScreen onLogout={() => {}} onSubmit={onSubmit} prueba={update} />
    </SafeArea>
  );
};

export default ProfileController;
