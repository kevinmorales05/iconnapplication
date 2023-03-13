import React, { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import EnterOtpScreen from './EnterOtpScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';

interface EnterOtpControllerProps {
  handleSubmit?: (email: string) => void;
}

const EnterOtpController = ({ handleSubmit }: EnterOtpControllerProps) => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const loader = useLoading();

  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  // this is never being reasigned
  const wrongCode = false;

  const route = useRoute<RouteProp<AuthStackParams, 'EnterOtp'>>();

  const { authenticationToken, variant } = route.params;

  const onSubmit = async (code: string) => {
    if (handleSubmit) {
      handleSubmit(email as string);
      return;
    }

    if (variant === 'register') {
      navigate('CreatePassword', { accessKey: code, authenticationToken, variant: 'register' });
      return;
    }

    if (variant === 'recoverPassword') {
      navigate('CreatePassword', { accessKey: code, authenticationToken, variant: 'recoverPassword' });
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterOtpScreen goBack={goBack} onSubmit={onSubmit} email={email} wrongCode={wrongCode} />
    </SafeArea>
  );
};

export default EnterOtpController;
