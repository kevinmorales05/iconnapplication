import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logoutThunk, preSignUpThunk, registerThunk,
  signUpUserWithEmailAndPasswordThunk, registerWithFirebaseThunk, 
  validateOtpThunk, validateUserThunk, signInWithEmailAndPasswordThunk } from '../thunks/auth.thunks';
import { AuthDataInterface } from '../types';

const initialState: AuthDataInterface = {
  user_id: '',
  email: '',
  name: '',
  lastName: '',
  secondLastName: '',
  pass: '',
  secretKey: '',
  termsAndConditions: false,
  isLogged: false,
  sign_app_modes_id: undefined
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
    setSignMode(state, action: PayloadAction<AuthDataInterface>) {
      state.user.sign_app_modes_id = action.payload.sign_app_modes_id;
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
    },
    setTermsAndCond(state, action: PayloadAction<AuthDataInterface>){
      state.user.termsAndConditions = action.payload.termsAndConditions;
    },
    setUserId(state, action: PayloadAction<AuthDataInterface>){
      state.user.user_id = action.payload.user_id;
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
    builder.addCase(logoutThunk.pending, state => {
      console.log('logoutThunk pending...');
      state.loading = true;
    })
    builder.addCase(logoutThunk.fulfilled, state => {      
      console.log('logoutThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(logoutThunk.rejected, state => {
      console.log('logoutThunk rejected...');
      state.loading = false;
    })
    builder.addCase(signUpUserWithEmailAndPasswordThunk.pending, state => {
      console.log('signUpUserWithEmailAndPasswordThunk pending...');
      state.loading = true;
    })
    builder.addCase(signUpUserWithEmailAndPasswordThunk.fulfilled, state => {      
      console.log('signUpUserWithEmailAndPasswordThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(signUpUserWithEmailAndPasswordThunk.rejected, state => {
      console.log('signUpUserWithEmailAndPasswordThunk rejected...');
      state.loading = false;
    })
    builder.addCase(validateUserThunk.pending, state => {
      console.log('validateUserThunk pending...');
      state.loading = true;
    })
    builder.addCase(validateUserThunk.fulfilled, state => {      
      console.log('validateUserThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(validateUserThunk.rejected, state => {
      console.log('validateUserThunk rejected...');
      state.loading = false;
    })
    builder.addCase(registerWithFirebaseThunk.pending, state => {
      console.log('registerWithFirebaseThunk pending...');
      state.loading = true;
    })
    builder.addCase(registerWithFirebaseThunk.fulfilled, state => {
      console.log('registerWithFirebaseThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(registerWithFirebaseThunk.rejected, state => {
      console.log('registerWithFirebaseThunk rejected...');
      state.loading = false;
    })
    builder.addCase(signInWithEmailAndPasswordThunk.pending, state => {
      console.log('signInWithEmailAndPasswordThunk pending...');
      state.loading = true;
    })
    builder.addCase(signInWithEmailAndPasswordThunk.fulfilled, state => {
      console.log('signInWithEmailAndPasswordThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(signInWithEmailAndPasswordThunk.rejected, state => {
      console.log('signInWithEmailAndPasswordThunk rejected...');
      state.loading = false;
    })
  }
});
// TODO: validate if it is possible to reduce extra reducers.
export const { setAuthInitialState, setAuthEmail, setSignMode, setSecretKey, setPassword, 
  setFullName, setTermsAndCond, setUserId } = authSlice.actions;
export default authSlice.reducer;
