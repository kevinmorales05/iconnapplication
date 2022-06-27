import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthDataInterface } from 'rtk/types';
import { authServices } from 'services'

export const preSignUpThunk = createAsyncThunk('auth/preSignUpThunk', async (email: string) => {
  return await authServices.preSignUp(email);  
});

export const validateOtpThunk = createAsyncThunk('auth/validateOtpThunk', async (payload: {email?: string, code?: string}) => {
  return await authServices.otpValidate(payload.email, payload.code);
});

export const registerThunk = createAsyncThunk('auth/registerThunk', async (payload: AuthDataInterface) => {
  return await authServices.register(payload);
});
