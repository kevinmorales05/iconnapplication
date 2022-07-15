import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthDataInterface } from '../types';
import { authServices } from 'services';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';

export const validateUserThunk = createAsyncThunk('auth/validateUserThunk', async (email: string) => {
  return await authServices.validateUser(email);
});

export const preSignUpThunk = createAsyncThunk('auth/preSignUpThunk', async (email: string) => {
  return await authServices.preSignUp(email);  
});

export const validateOtpThunk = createAsyncThunk('auth/validateOtpThunk', async (payload: {email?: string, code?: string}) => {
  return await authServices.otpValidate(payload.email, payload.code);
});

/**
 * (DEPRECATED)
 * TODO: Remove this registerThunk (Validate with Albert or Kevin), currently isn't used.
 */
export const registerThunk = createAsyncThunk('auth/registerThunk', async (payload: AuthDataInterface) => {
  return await authServices.register(payload);
});

export const registerWithFirebaseThunk = createAsyncThunk('auth/registerWithFirebaseThunk', async (payload: AuthDataInterface) => {
  return await authServices.registerWithFirebase(payload);
});

export const getUserThunk = createAsyncThunk('auth/getUser', async (payload: AuthDataInterface) => {
  return await authServices.getUser(payload);
})

// -------------------------------- FIREBASE SECTION --------------------------------
/**
 * Firebase logout method
 */ 
export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
  return await auth().signOut();
});

/**
 * Firebase (email + password) singup method
 */
export const signUpUserWithEmailAndPasswordThunk = 
createAsyncThunk('auth/signUpUserWithEmailAndPasswordThunk', async (payload: {email: string, pass: string}) => {
  return await auth().createUserWithEmailAndPassword(payload.email, payload.pass);
});

/**
 * Firebase (email + password) signin method
 */
export const signInWithEmailAndPasswordThunk =
createAsyncThunk('auth/signInWithEmailAndPasswordThunk', async (payload: {email: string, pass: string}) => {
  if (payload.email === ""){
    console.log("Petición incompleta, el campo de correo electrónico es obligatorio.")
  }
  try {
    const userInfo = await auth().signInWithEmailAndPassword(payload.email, payload.pass);
    return userInfo;
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      console.log('Contraseña incorrecta.');
    }
    if (error.code === 'auth/too-many-requests'){
      console.log("Hemos bloqueado su cuenta de manera temporal debido a actividad inusual, intente más tarde. Puede activar inmediatamente reseteando su contraseña.")
      //We have blocked all requests from this device due to unusual activity. Try again later. [ Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.
    }
    console.log("error integro ", error)
    return error;
  }
  
  
});

/**
 * Firebase (Google) SignIn method
 */
export const signInWithGoogleThunk = createAsyncThunk('auth/signInWithGoogleThunk', async () => {
  try {
    GoogleSignin.configure({
      webClientId: '579450743521-rj13qtpv8h8kbshokh2takg2aigklit7.apps.googleusercontent.com',
      offlineAccess: true,
    });
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // console.log("Credencial de Google", googleCredential);
    // console.log("Id Token", idToken);
    // const userCredential = await firebase.auth().signInWithCredential(googleCredential);
    // console.warn(`Firebase authenticated via Google, UID: ${userCredential.user.uid}`);
    return await firebase.auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log(error);
  }
});

/**
 * Firebase (Facebook) SignIn method
 */
export const signInWithFacebookThunk = createAsyncThunk('auth/signInWithFacebookThunk', async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // const userCredential = await firebase.auth().signInWithCredential(facebookCredential);
    // console.warn(`Firebase authenticated via Facebook, UID: ${userCredential.user.uid}`);
    return await firebase.auth().signInWithCredential(facebookCredential);
  } catch (error) {
    console.log(error);
  }  
});

/**
 * Firebase (Apple) SignIn method
 */
export const signInWithAppleThunk = createAsyncThunk('auth/signInWithAppleThunk', async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });    
    const { identityToken, nonce } = appleAuthRequestResponse;

    if (identityToken) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
      return await firebase.auth().signInWithCredential(appleCredential);
    } else {
      console.log('hubo error controlado....');      
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
  } catch (error) {
    console.log(error);
  }  
});
