import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import ContinueWithScreen from './ContinueWithScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';
import LinearGradient from 'react-native-linear-gradient';
import { OtherInputMethods } from 'components/organisms/OtherInputMethods';
import { setAuthEmail, setEmailVerified, setFullName, setIsLogged, setPhoneNumber, setPhoto, setSignMode, setUserId, signInWithAppleThunk, 
  signInWithFacebookThunk, signInWithGoogleThunk, useAppDispatch, setIsGuest } from 'rtk';
import auth from '@react-native-firebase/auth';

const ContinueWithController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [otherMethodsVisible, setotherMethodsVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const nowIsGuest = async () => {
    await delay(1000);
    dispatch(setIsGuest({isGuest: true}));
  }

  const onAppleButtonPress = async () => {
    try {
      const { payload } = await dispatch(signInWithAppleThunk());
      if (payload.additionalUserInfo.isNewUser) {
        if (payload.user.uid) {
          dispatch(setUserId({user_id: payload.user.uid}));
          dispatch(setAuthEmail({email: payload.user.email}));
          dispatch(setSignMode({sign_app_modes_id: 4}));
          navigate('TermsAndCond');
        }  
      } else {
        dispatch(setFullName({name: auth().currentUser?.displayName!}));
        dispatch(setAuthEmail({email: auth().currentUser?.email!}));
        dispatch(setIsLogged({isLogged: true}));
      }
    } catch (error) {
      console.warn(error);
    }    
  }

  const onFacebookButtonPress = async () => {
    try {
      const { payload } = await dispatch(signInWithFacebookThunk());
      if (payload.additionalUserInfo.isNewUser) {
        if (payload.user.uid) {
          dispatch(setUserId({user_id: payload.user.uid}));
          dispatch(setAuthEmail({email: payload.user.email}));
          dispatch(setSignMode({sign_app_modes_id: 2}));
          navigate('TermsAndCond');
        }
      } else {
        dispatch(setFullName({name: auth().currentUser?.displayName!}));
        dispatch(setAuthEmail({email: auth().currentUser?.email!}));
        dispatch(setIsLogged({isLogged: true}));
      }
    } catch (error) {
      console.warn(error);
    }
  }

  const onGoogleButtonPress = async () => {
    try {
      const { payload } = await dispatch(signInWithGoogleThunk());
      dispatch(setSignMode({sign_app_modes_id: 3}));
      dispatch(setUserId({user_id: payload.user.uid}));
      dispatch(setAuthEmail({email: payload.user.email}));      
      dispatch(setPhoto({ photo: payload.additionalUserInfo.profile.picture }));
      dispatch(setEmailVerified({ emailVerified: payload.additionalUserInfo.profile.emailVerified }));
      dispatch(setPhoneNumber({ phoneNumber: payload.additionalUserInfo.profile.phoneNumber }));
      dispatch(setFullName({
        name: payload.additionalUserInfo.profile.given_name,
        lastName: payload.additionalUserInfo.profile.family_name
      }));

      if (payload.additionalUserInfo.isNewUser) {
        if (payload.user.uid) navigate('TermsAndCond');
      } else {
        dispatch(setIsLogged({ isLogged: true }));
      }
    } catch (error) {
      console.warn(error);      
    }    
  }

  const onContinueWithEmail = () => {
    setotherMethodsVisible(false);
    navigate('EnterEmail')
  };

  const onPressOtherMethods = () => {
    setotherMethodsVisible(true);
  };
  
  const onContinueAsGuest = () => {
      /* setotherMethodsVisible(false);
      if(!otherMethodsVisible) {
        dispatch(setIsGuest({isGuest: true}));
      }
      else {
        console.log("sigue siendo true, MODAL", otherMethodsVisible);
      } */
    setotherMethodsVisible(false);
    console.log('Modal', otherMethodsVisible);
    nowIsGuest();
  };
  
  const onIhaveAccount = () => {
    setotherMethodsVisible(false);
    navigate('EnterEmail');
  };
  const onPressOut = () => {
    console.log('Modal', otherMethodsVisible);
    setotherMethodsVisible(false);
  };

  return (
    <ImageBackground
      source={ICONN_BACKGROUND_IMAGE}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={[
          '#000000',
          '#00000000',
          '#00000000',
          '#00000000',
          '#00000000',
          '#000000'
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      ></LinearGradient>
      <SafeArea
        topSafeArea={false}
        bottomSafeArea={false}
        backgroundColor="transparent"
        barStyle="light"
      >
        <ContinueWithScreen
          onPressSocialButton={onAppleButtonPress}
          onPressFacebook={onFacebookButtonPress}
          onPressGoogle={onGoogleButtonPress}          
          onPressEmail={onContinueWithEmail}
          onPressOthers={onPressOtherMethods}
        />
        <OtherInputMethods
          visible={otherMethodsVisible}
          onContinueEmail={onContinueWithEmail}
          onContinueGuest={onContinueAsGuest}
          onIhaveAccount={onIhaveAccount}
          onPressOut={onPressOut}
        />
      </SafeArea>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default ContinueWithController;
