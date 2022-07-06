import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import EnterEmailScreen from './EnterEmailScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { AboutEmail } from 'components/organisms/AboutEmail';
import { useAlert, useLoading } from 'context';
import { preSignUpThunk, validateUserThunk } from 'rtk/thunks/auth.thunks';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { setAuthEmail, setSignMode } from 'rtk/slices/authSlice';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [aboutEmailVisible, setAboutEmailVisible] = useState<boolean>(false);
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();

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
      const { payload } = await dispatch(validateUserThunk(email));
      if (payload.responseCode === 200) {
        dispatch(setAuthEmail({email}))
        if (!payload.data.isRegistered && payload.data.signMode === 0) {
          const { payload } = await dispatch(preSignUpThunk(email));
          if (payload.responseCode === 201){
            dispatch(setSignMode({sign_app_modes_id: 1}))
            navigate('EnterOtp');
          }        
        } else if (payload.data.isRegistered) {
          if (payload.data.signMode === 1) {
            navigate('EnterPassword');
          } else if (payload.data.signMode === 2) {
            alert.show({ title: 'CUENTA CON FACEBOOK' });            
          } else if (payload.data.signMode === 3) {
            alert.show({ title: 'CUENTA CON GOOGLE' });
          } else if (payload.data.signMode === 4) {
            alert.show({ title: 'CUENTA CON APPLE' });
          }
        }
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
