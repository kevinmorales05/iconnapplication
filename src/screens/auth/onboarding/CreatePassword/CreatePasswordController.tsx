import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import CreatePasswordScreen from './CreatePasswordScreen';
import { RootState, setPassword, setUserId, useAppDispatch, useAppSelector } from 'rtk';
import { authServices } from 'services';
import { HttpClient } from '../../../../http/http-client';

const CreatePasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  const route = useRoute<RouteProp<AuthStackParams, 'CreatePassword'>>();

  const { authenticationToken, accessKey } = route.params;

  const changePassword = async (pwd: string) => {
    try {
      const changed = await  authServices.createPassword(pwd, accessKey, email, authenticationToken);
      if (changed.authStatus == 'Success') {
        navigate('EnterEmail');
      }  else {
        console.log('ERROR CAMBIO CONTRASEÑA');
      }
      
    } catch (error) {
      console.log('ERROR CAMBIO CONTRASEÑA', error);
    }
  }

  const onSubmit = (password: string) => {
    dispatch(setPassword({ pass: password }));
    navigate('TermsAndCond', { authenticationToken, accessKey, newPassword: password });
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <CreatePasswordScreen goBack={goBack} onSubmit={changePassword} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default CreatePasswordController;
