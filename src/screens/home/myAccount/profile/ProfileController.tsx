import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';
import { authServices } from 'services';
import { AuthDataInterface } from 'rtk/types/auth.types';
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
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onSubmit = async (userFields: AuthDataInterface) => {
    //prevents unhandled email update
    delete userFields.email

    const { user_id } = user;
    userFields.user_id = user_id;
    const gender = GENDERS.find(gender => {
      return gender.name === userFields.gender;
    })
    userFields.gender_id = gender?.id as number;
    loader.show();
    try {
      await authServices.putUser(userFields);
      dispatch(setTelephone({ telephone: userFields.telephone }));
      dispatch(setGender({ gender: userFields.gender_id }));
      dispatch(setBirthday({ birthday: userFields.birthday }));
      dispatch(setFullName({ name: userFields.name, lastName: userFields.lastName }));
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
      <ProfileScreen onLogout={() => {}} onSubmit={onSubmit} />
    </SafeArea>
  );
};

export default ProfileController;
