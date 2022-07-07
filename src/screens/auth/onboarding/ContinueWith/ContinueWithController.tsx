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
import { setAuthEmail, setFullName, setIsLogged, setSignMode, setUserId, signInWithAppleThunk, 
  signInWithFacebookThunk, signInWithGoogleThunk, useAppDispatch } from 'rtk';
import auth from '@react-native-firebase/auth';

const ContinueWithController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [otherMethodsVisible, setotherMethodsVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
      console.log(error);
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
      console.log(error);
    }
  }

  const onGoogleButtonPress = async () => {
    try {
      const { payload } = await dispatch(signInWithGoogleThunk());
      if (payload.additionalUserInfo.isNewUser) {
        if (payload.user.uid) {
          dispatch(setUserId({user_id: payload.user.uid}));
          dispatch(setAuthEmail({email: payload.user.email}));
          dispatch(setSignMode({sign_app_modes_id: 3}));
          navigate('TermsAndCond');
        }
      } else {
        dispatch(setFullName({name: auth().currentUser?.displayName!}));
        dispatch(setAuthEmail({email: auth().currentUser?.email!}));
        dispatch(setIsLogged({isLogged: true}));
      }
    } catch (error) {
      console.log(error);
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
    console.log('onContinueAsGuest');
  };
  
  const onIhaveAccount = () => {
    setotherMethodsVisible(false);
    navigate('Login')
  };
  const onPressOut = () => {
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
