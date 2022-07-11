import React from 'react';
import ForgotPasswordScreen from './ForgotPasswordScreen'
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { RootState, useAppSelector } from 'rtk';
import { useAlert } from 'context';

const ForgotPasswordController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();  
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const alert = useAlert();

  const onSubmit = async (password: string) => {
    alert.show({ 
      title:'Funcionalidad no disponible por el momento :(', 
      acceptTitle:'ok', 
      onAccept() { alert.hide();}},'warning');
  };
  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <ForgotPasswordScreen goBack={goBack} email={email} onSubmit={onSubmit} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default ForgotPasswordController