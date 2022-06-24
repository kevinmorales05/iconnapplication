import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import CreatePasswordScreen from './CreatePasswordScreen';
import { useAppDispatch } from 'rtk';
import { setPassword, setSecret } from 'rtk/slices/authSlice';
import cryptoAES, { getSecretKey } from 'utils/cryptoAES';

const CreatePasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();  

  const onSubmit = (password: string) => {
    const secret = getSecretKey();
    dispatch(setSecret({secret}));
    password = cryptoAES(password, secret);
    dispatch(setPassword({password}));    
    navigate('EnterFullName');
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

export default CreatePasswordController;
