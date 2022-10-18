import React from 'react';
import InviteSignUpScreen from './InviteSignUpScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useEnterModal } from 'context';

const InviteSignUpController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const enterModal = useEnterModal();

  const onSubmit = () => {
    enterModal.show({ secondaryMessage: 'Vive la experiencia completa en la aplicación' });
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} backgroundColor="white" barStyle="dark">
      <InviteSignUpScreen goBack={goBack} onSubmit={onSubmit} />
    </SafeArea>
  );
};

export default InviteSignUpController;
