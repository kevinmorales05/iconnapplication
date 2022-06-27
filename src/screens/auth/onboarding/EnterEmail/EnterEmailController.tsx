import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import EnterEmailScreen from './EnterEmailScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { AboutEmail } from 'components/organisms/AboutEmail';
import { useAlert, useLoading } from 'context';
import { preSignUpThunk } from 'rtk/thunks/auth.thunks';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { setAuthEmail } from 'rtk/slices/authSlice';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [aboutEmailVisible, setAboutEmailVisible] = useState<boolean>(false);
  const alert = useAlert();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const onPressEmailInfo = () => {
    setAboutEmailVisible(true);
  };

  const onPressOut = () => {
    setAboutEmailVisible(false);
  };

  const onSubmit = async (email: string) => {
    loader.show();
    try {
      const { payload } = await dispatch(preSignUpThunk(email));
      if (payload.status === 'ok'){ // TODO: here we should valiodate status && code === 1
        dispatch(setAuthEmail({email}))
        navigate('EnterOtp');
      } 
    } catch (error) {
      console.error('Unknow Error', error);
      // TODO: integrate the treatment of possible future errors
      // TODO: Backend should change the response
      // Instead:      
      // {
      //   "status": "ok",
      //   "msg": "Otp created successfully!"
      // }      
      // should be:
      // {
      //   "code": 1,
      //   "status": "ok",
      //   "msg": "Otp created successfully!"
      // }
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterEmailScreen
        goBack={goBack}
        onSubmit={onSubmit}
        onPressInfo={onPressEmailInfo}
      />
      <AboutEmail
        visible={aboutEmailVisible}
        onUnderstood={onPressOut}
        onPressOut={onPressOut}
      />
    </SafeArea>
  );
};

export default EnterEmailController;
