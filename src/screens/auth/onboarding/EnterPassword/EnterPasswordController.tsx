import EnterPasswordScreen from './EnterPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { useLoading } from 'context';
import { 
  getUserThunk, RootState, setAuthEmail, setBirthDay, setEmailVerified, setFullName, 
  setGender, setIsLogged, setPassword, setPhoneNumber, setPhoto, setSignMode, setUserId, 
  signInWithEmailAndPasswordThunk, useAppDispatch, useAppSelector } from 'rtk';
import React, { useEffect } from 'react';

const EnterPasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const goToForgotPassword = () => {
    navigate('ForgotPassword');
  }

  const onSubmit = async (password: string) => {
    dispatch(setPassword({pass: password}));
    loader.show();
    const { payload } = await dispatch(signInWithEmailAndPasswordThunk({email: email!, pass: password}));
    if (!payload.additionalUserInfo.isNewUser) {
      const { payload: payloadSignIn } = await dispatch(getUserThunk({ user_id: payload.user.uid}));
      if (payloadSignIn.data) {
        const { user_id, name, lastName, email, telephone, birthday, gender_id, photo, sign_app_modes_id } = payloadSignIn.data;        
        dispatch(setSignMode({sign_app_modes_id: sign_app_modes_id}));
        dispatch(setUserId({user_id: user_id}));
        dispatch(setAuthEmail({email: email}));      
        dispatch(setPhoto({ photo: photo }));
        dispatch(setEmailVerified({ emailVerified: true }));
        dispatch(setPhoneNumber({ phoneNumber: telephone }));
        dispatch(setGender({ gender: gender_id }));
        dispatch(setBirthDay({ birthDay: birthday }));
        dispatch(setFullName({
          name: name,
          lastName: lastName
        }));
        dispatch(setIsLogged({isLogged: true}));  
      }
      
    }    
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterPasswordScreen goBack={goBack} email={email} onSubmit={onSubmit} goToForgotPassword={goToForgotPassword} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default EnterPasswordController;