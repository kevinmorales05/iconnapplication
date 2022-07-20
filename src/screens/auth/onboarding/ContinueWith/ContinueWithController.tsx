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
  signInWithFacebookThunk, signInWithGoogleThunk, useAppDispatch, validateUserThunk } from 'rtk';

const ContinueWithController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [otherMethodsVisible, setotherMethodsVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onAppleButtonPress = async () => {
    try {
      const response = await dispatch(signInWithAppleThunk()).unwrap();
      console.log('la data devuelta por APPLE: ', JSON.stringify(response, null, 3));
      const { user, additionalUserInfo } = response!;
      dispatch(setSignMode({ sign_app_modes_id: 4 }));
      dispatch(setUserId({ user_id: user.uid }));
      dispatch(setAuthEmail({ email: user.email! }));
      dispatch(setPhoto({ photo: user.providerData[0].photoURL }));
      dispatch(setFullName({
        name: user.providerData[0].displayName,
        lastName: ''  // Apple only provides a "displayName".
      }));

      if (additionalUserInfo?.isNewUser) {
        if (user.uid) navigate('TermsAndCond');
      } else {
        const response = await dispatch(validateUserThunk(user.uid)).unwrap();        
        if (response.responseCode === 200 && response.data.isRegistered) {
          dispatch(setIsLogged({ isLogged: true }));
        } else if(response.responseCode === 200 && !response.data.isRegistered) {
          navigate('TermsAndCond');
        }
      }
    } catch (error) {
      console.warn(error);
    }    
  }

  const onFacebookButtonPress = async () => {
    try {
      const response = await dispatch(signInWithFacebookThunk()).unwrap();
      console.log('la data devuelta por FACEBOOK: ', JSON.stringify(response, null, 3));
      const { user, additionalUserInfo } = response!;
      dispatch(setSignMode({ sign_app_modes_id: 2 }));
      dispatch(setUserId({ user_id: user.uid }));
      dispatch(setAuthEmail({ email: user.email! }));
      dispatch(setPhoto({ photo: user.photoURL! }));
      dispatch(setEmailVerified({ emailVerified: user.emailVerified }));
      dispatch(setPhoneNumber({ phoneNumber: user.phoneNumber! }));
      dispatch(setFullName({
        name: additionalUserInfo?.profile?.given_name,
        lastName: additionalUserInfo?.profile?.family_name
      }));

      if (additionalUserInfo?.isNewUser) {
        if (user.uid) navigate('TermsAndCond');
      } else {
        const response = await dispatch(validateUserThunk(user.uid)).unwrap();        
        if (response.responseCode === 200 && response.data.isRegistered) {
          dispatch(setIsLogged({ isLogged: true }));
        } else if(response.responseCode === 200 && !response.data.isRegistered) {
          navigate('TermsAndCond');
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }

  const onGoogleButtonPress = async () => {
    try {
      const response = await dispatch(signInWithGoogleThunk()).unwrap();
      console.log('la data devuelta por GOOGLE: ', JSON.stringify(response, null, 3));
      const { user, additionalUserInfo } = response!;
      dispatch(setSignMode({ sign_app_modes_id: 3}));
      dispatch(setUserId({ user_id: user.uid }));
      dispatch(setAuthEmail({ email: user.email! }));
      dispatch(setPhoto({ photo: user.photoURL! }));
      dispatch(setEmailVerified({ emailVerified: user.emailVerified }));
      dispatch(setPhoneNumber({ phoneNumber: user.phoneNumber! }));
      dispatch(setFullName({
        name: additionalUserInfo?.profile?.given_name,
        lastName: additionalUserInfo?.profile?.family_name
      }));

      if (additionalUserInfo?.isNewUser) {
        if (user.uid) navigate('TermsAndCond');
      } else {
        const response = await dispatch(validateUserThunk(user.uid)).unwrap();
        if (response.responseCode === 200 && response.data.isRegistered) {
          dispatch(setIsLogged({ isLogged: true }));
        } else if(response.responseCode === 200 && !response.data.isRegistered) {
          navigate('TermsAndCond');
        }
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
    console.log('onContinueAsGuest');
  };
  
  const onIhaveAccount = () => {
    setotherMethodsVisible(false);
    navigate('EnterEmail');
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
