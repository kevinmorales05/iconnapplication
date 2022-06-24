import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import EnterOtpScreen from './EnterOtpScreen';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading } from 'context';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { validateOtpThunk } from 'rtk/thunks/auth.thunks';

const EnterOtpController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const { params: { email } } = useRoute<RouteProp<AuthStackParams, 'EnterOtp'>>();
  const loader = useLoading();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const [wrongCode, setWrongCode] = useState(false);

  const onSubmit = async (code: string) => {    
    loader.show();
    console.log('Código OTP: ' + code);
    
    try {  
      const { payload } = await dispatch(validateOtpThunk({email, code}));

      if (!payload) {
        // TODO: REMOVE the next 2 lines (DOESNT NEED HERE);
        setWrongCode(true);
        navigate('CreatePassword');
      } else if (payload.status === 'ok' && !payload.isValid) {
        setWrongCode(true);
      } else if (payload.status === 'ok' && payload.isValid) { 
        navigate('CreatePassword');
      }
    } catch (error) {
      console.error('Unknow Error', error);
    }
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
