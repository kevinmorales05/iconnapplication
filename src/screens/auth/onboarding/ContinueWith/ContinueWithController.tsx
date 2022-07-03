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
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId: '579450743521-rj13qtpv8h8kbshokh2takg2aigklit7.apps.googleusercontent.com',
  offlineAccess: true,
});

async function signInWithGoogle() {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);  
}

const ContinueWithController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [otherMethodsVisible, setotherMethodsVisible] = useState<boolean>(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const onPressOtherMethods = () => {
    setotherMethodsVisible(true);
  };
  const onContinueWithEmail = () => {
    setotherMethodsVisible(false);
    navigate('EnterEmail')
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

  async function onAppleButtonPress() {
    try {      
    
      // 1). start a apple sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });    
      console.log('(this token is obtained from apple service!)\nappleAuthRequestResponse:\n', JSON.stringify(appleAuthRequestResponse,null,3));

      // 2). if the request was successful, extract the token and nonce
      const { identityToken, nonce } = appleAuthRequestResponse;

      // can be null in some scenarios
      if (identityToken) {
        // 3). create a Firebase `AppleAuthProvider` credential
        const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
        console.log('appleCredential:\n', JSON.stringify(appleCredential, null, 3));

        // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
        //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
        //     to link the account to an existing user
        const userCredential = await firebase.auth().signInWithCredential(appleCredential);        
        console.log('userCredential:\n', JSON.stringify(userCredential, null, 3));

        // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
        console.warn(`Firebase authenticated via Apple, UID: ${userCredential.user.uid}`);

        // 5) we can choice between return appleCredential wich was returned by Firebase Auth:
        // return auth().signInWithCredential(appleCredential);

      } else {
        // handle this - retry?
        console.log('hubo error controlado....');      
        throw new Error('Apple Sign-In failed - no identify token returned');
      }    

    } catch (error) {
    console.log(error);        
    }
  }
  
  // const authCallback = (success: boolean, credentials?: Credentials) => {
  //   if (success && credentials) {
  //     dispatch(login({ credentials }, (status, error) => {
  //       if (!status) {
  //         let message = 'Algo salió mal';

  //         if (error === 'invalidEmail') message = 'Email invalido';
  //         if (error === 'emailAlreadyInUse') message = 'El email ya esta en uso';

  //         console.warn(message);
  //       }
  //     }));
  //   }
  // };

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
          onPressGoogle={signInWithGoogle}
          // onPressSocialButton={(type) => { dispatch(socialAuth(type, authCallback));}}
          onPressSocialButton={onAppleButtonPress}
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
