import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthDataInterface } from '../types';
import { authServices } from 'services'
import auth from '@react-native-firebase/auth'

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
 * TODO: Remove this thunk, currently isn't used.
 */
export const registerThunk = createAsyncThunk('auth/registerThunk', async (payload: AuthDataInterface) => {
  return await authServices.register(payload);
});

export const registerWithFirebaseThunk = createAsyncThunk('auth/registerWithFirebaseThunk', async (payload: AuthDataInterface) => {
  return await authServices.registerWithFirebase(payload);
});

// Firebase method
export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
  return await auth().signOut();
});

// Firebase method
export const signUpUserWithEmailAndPasswordThunk = 
createAsyncThunk('auth/signUpUserWithEmailAndPasswordThunk', async (payload: {email: string, pass: string}) => {
  return await auth().createUserWithEmailAndPassword(payload.email, payload.pass);
});

// Firebase method
export const signInWithEmailAndPasswordThunk =
createAsyncThunk('auth/signInWithEmailAndPasswordThunk', async (payload: {email: string, pass: string}) => {
  return await auth().signInWithEmailAndPassword(payload.email, payload.pass);
});