import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthDataInterface } from '../types';
import { authServices } from 'services'
import auth from '@react-native-firebase/auth'

export const preSignUpThunk = createAsyncThunk('auth/preSignUpThunk', async (email: string) => {
  return await authServices.preSignUp(email);  
});

export const validateOtpThunk = createAsyncThunk('auth/validateOtpThunk', async (payload: {email?: string, code?: string}) => {
  return await authServices.otpValidate(payload.email, payload.code);
});

export const registerThunk = createAsyncThunk('auth/registerThunk', async (payload: AuthDataInterface) => {
  return await authServices.register(payload);
});

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
  return await auth().signOut();
});

export const registerUserWithEmailAndPasswordThunk = 
createAsyncThunk('auth/registerUserWithEmailAndPasswordThunk', async (payload: {email: string, pass: string}) => {
  return await auth().createUserWithEmailAndPassword(payload.email, payload.pass);
});