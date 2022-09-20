import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams, HomeStackParams } from 'navigation/types';
import EnterOtpScreen from './EnterOtpScreen';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading } from 'context';
import { RootState, useAppDispatch, useAppSelector, setSecretKey } from 'rtk';
import { validateOtpThunk } from 'rtk/thunks/auth.thunks';

interface EnterOtpControllerProps {
  handleSubmit?: (email: string) => void;
}

const EnterOtpController = ({ handleSubmit }: EnterOtpControllerProps) => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const loader = useLoading();
  const dispatch = useAppDispatch();

  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const [wrongCode, setWrongCode] = useState(false);

  const route = useRoute<RouteProp<AuthStackParams, 'EnterOtp'>>();

  const { authenticationToken } = route.params;

  const onSubmit = async (code: string) => {
    // loader.show();
    if (handleSubmit) {
      handleSubmit(email as string);
      return;
    }

    navigate('CreatePassword', { accessKey: code, authenticationToken, variant: 'register' });
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterOtpScreen goBack={goBack} onSubmit={onSubmit} email={email} wrongCode={wrongCode} />
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
