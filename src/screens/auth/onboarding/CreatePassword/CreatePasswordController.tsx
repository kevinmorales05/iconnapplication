import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import CreatePasswordScreen from './CreatePasswordScreen';
import { setPassword, useAppDispatch } from 'rtk';

const CreatePasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<AuthStackParams, 'CreatePassword'>>();

  const { authenticationToken, accessKey } = route.params;

  const onSubmit = (password: string) => {
    dispatch(setPassword({ pass: password }));
    navigate('TermsAndCond', { authenticationToken, accessKey, newPassword: password });
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
