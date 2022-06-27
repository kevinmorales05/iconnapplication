import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
      if (payload.status === 'ok' && !payload.isValid) { // TODO: we should validate not only status, we need a code!
        setWrongCode(true);                               // this validation no works because the backend response with 404, it should reponse 200 with body isValid = false...
      } else if (payload.status === 'ok' && payload.isValid) { 
        navigate('CreatePassword');
      }
    } catch (error) {
      // TODO: managing code errors is needed.
      setWrongCode(true); // TODO: remove this line when Alberto changes the code response to 200 instead 404
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
