import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProfileScreen from './ProfileScreen';

const ProfileController: React.FC = () => {
  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      barStyle="dark"
    >
    <ProfileScreen/>
    </SafeArea>
  );
};

export default ProfileController;
