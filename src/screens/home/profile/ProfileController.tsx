import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';
import { authServices } from 'services';
import { AuthDataInterface } from 'rtk/types/auth.types';

const ProfileController: React.FC = () => {
  const loader = useLoading();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const onSubmit = async (userFields: AuthDataInterface) => {
    const { user_id } = user;
    userFields.user_id = user_id;
    loader.show();
    try {
      await authServices.putUser(userFields);
    } catch (error) {
      console.warn(error);
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
