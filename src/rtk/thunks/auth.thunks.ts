import { createAsyncThunk } from '@reduxjs/toolkit';
import { authServices } from 'services'

export const preSignUpThunk = createAsyncThunk('auth/preSignUpThunk', async (email: string) => {
  return await authServices.preSignUp(email);  
});

export const validateOtpThunk = createAsyncThunk('auth/validateOtpThunk', async (payload: {email?: string, code?: string}) => {
  return await authServices.otpValidate(payload.email, payload.code);
});
