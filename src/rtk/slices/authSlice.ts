import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { preSignUpThunk, validateOtpThunk } from 'rtk/thunks/auth.thunks';
import { AuthDataInterface } from 'rtk/types';

const initialState: AuthDataInterface = {
  email: '',
  name: '',
  lastName: '',
  secondLastName: '',
  password: '',
  secret: '',
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
    setSecret(state, action: PayloadAction<AuthDataInterface>) {
      state.user.secret = action.payload.secret;
    },
    setPassword(state, action: PayloadAction<AuthDataInterface>){
      state.user.password = action.payload.password;
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
  }
});

export const { setAuthInitialState, setAuthEmail, setSecret, setPassword } = authSlice.actions;
export default authSlice.reducer;
