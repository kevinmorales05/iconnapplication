import { createAsyncThunk } from '@reduxjs/toolkit';
import { authServices } from 'services'

export const preSignUpThunk = createAsyncThunk('auth/preSignUpThunk', async (email: string) => {
  return await authServices.preSignUp(email);  
});
