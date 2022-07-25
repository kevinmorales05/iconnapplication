import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import CreatePasswordScreen from '../CreatePassword/CreatePasswordScreen';
import { useAppSelector, RootState } from 'rtk';

import { useToast } from 'context';

import auth, { firebase } from '@react-native-firebase/auth';
import { authServices } from 'services';

const EditPasswordController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const onSubmit = async (password: string) => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (!currentUser) {
        throw new Error('null currentUser');
      }

      await authServices.updateUserPassword({ ...user, password });

      toast.show({
        message: 'Datos guardos exitosamente.',
        type: 'success'
      });

      navigate('Profile');
    } catch (error) {
      console.log(error);
      toast.show({
        message: 'No se pudo cambiar la contraseña.',
        type: 'error'
      });
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <CreatePasswordScreen goBack={goBack} onSubmit={onSubmit} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default EditPasswordController;
