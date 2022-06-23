import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import EnterOtpScreen from './EnterOtpScreen';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';

const EnterOtpController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const { params: { email } } = useRoute<RouteProp<AuthStackParams, 'EnterOtp'>>();

  const onSubmit = (code: string) => {
    console.log('Código OTP: ' + code);
    navigate('CreatePassword');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterOtpScreen goBack={goBack} onSubmit={onSubmit} email={email} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default EnterOtpController;
