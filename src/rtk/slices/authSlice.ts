import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { preSignUpThunk, registerThunk, validateOtpThunk } from 'rtk/thunks/auth.thunks';
import { AuthDataInterface } from 'rtk/types';

const initialState: AuthDataInterface = {
  email: '',
  name: '',
  lastName: '',
  secondLastName: '',
  pass: '',
  secretKey: '',
  termsAndConditions: false,
  isLogged: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialState,
    loading: false
  },
  reducers: {
    setAuthInitialState(state) {
      state = { user: initialState, loading: false };
    },
    setAuthEmail(state, action: PayloadAction<AuthDataInterface>) {
      state.user.email = action.payload.email;
    },
    setSecretKey(state, action: PayloadAction<AuthDataInterface>) {
      state.user.secretKey = action.payload.secretKey;
    },
    setPassword(state, action: PayloadAction<AuthDataInterface>){
      state.user.pass = action.payload.pass;
    },
    setFullName(state, action: PayloadAction<AuthDataInterface>){
      state.user.name = action.payload.name;
      state.user.lastName = action.payload.lastName;
    }
  },
  extraReducers: builder => {
    builder.addCase(preSignUpThunk.pending, state => {
      console.log('preSignUpThunk pending...');
      state.loading = true;
    })
    builder.addCase(preSignUpThunk.fulfilled, state => {      
      console.log('preSignUpThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(preSignUpThunk.rejected, state => {
      console.log('preSignUpThunk rejected...');
      state.loading = false;
    })
    builder.addCase(validateOtpThunk.pending, state => {
      console.log('validateOtpThunk pending...');
      state.loading = true;
    })
    builder.addCase(validateOtpThunk.fulfilled, state => {      
      console.log('validateOtpThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(validateOtpThunk.rejected, state => {
      console.log('validateOtpThunk rejected...');
      state.loading = false;
    })
    builder.addCase(registerThunk.pending, state => {
      console.log('registerThunk pending...');
      state.loading = true;
    })
    builder.addCase(registerThunk.fulfilled, state => {      
      console.log('registerThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(registerThunk.rejected, state => {
      console.log('registerThunk rejected...');
      state.loading = false;
    })
  }
});

export const { setAuthInitialState, setAuthEmail, setSecretKey, setPassword, setFullName } = authSlice.actions;
export default authSlice.reducer;
