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
});

export const sendEmailToRecoverPasswordThunk = createAsyncThunk('auth/sendEmailToRecoverPasswordThunk', async (payload: AuthDataInterface) => {
  return await authServices.sendEmailtoRecoverPassword(payload);
});

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
 * It's better return full promise without resolving it.
 * TODO: You should change the other firebase methods as this:
 */
export const signInWithEmailAndPasswordThunk =
createAsyncThunk('auth/signInWithEmailAndPasswordThunk', async (payload: {email: string, pass: string}) => {
  return auth().signInWithEmailAndPassword(payload.email, payload.pass);
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
