import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';
import { authServices } from 'services';
import { AuthDataInterface } from 'rtk/types/auth.types';
import { useToast } from 'context';

const ProfileController: React.FC = () => {
  const loader = useLoading();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();

  const onSubmit = async (userFields: AuthDataInterface) => {
    const { user_id } = user;
    userFields.user_id = user_id;
    loader.show();
    try {
      await authServices.putUser(userFields);
      toast.show({
        message: 'Datos guardos exitosamente.',
        type: 'success'
      });
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos. Intenta mas tarde.',
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
