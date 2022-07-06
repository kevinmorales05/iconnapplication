import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import EnterOtpScreen from './EnterOtpScreen';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading } from 'context';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { validateOtpThunk } from 'rtk/thunks/auth.thunks';

const EnterOtpController: React.FC = () => {
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

  const onSubmit = async (code: string) => {    
    loader.show();
    
    try {  
      const { payload } = await dispatch(validateOtpThunk({email, code}));
      if (payload.responseCode === 201 && !payload.data.isValid) {
        setWrongCode(true);
      } else if (payload.responseCode === 201 && payload.data.isValid) { 
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
