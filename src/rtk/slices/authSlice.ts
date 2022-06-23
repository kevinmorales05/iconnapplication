import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { preSignUpThunk } from 'rtk/thunks/auth.thunks';
import { AuthDataInterface } from 'rtk/types';

const initialState: AuthDataInterface = {
  email: '',
  name: '',
  lastName: '',
  secondLastName: '',
  password: '',
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
    }
  },
  extraReducers: builder => {
    builder.addCase(preSignUpThunk.pending, state => {
      console.log('pending...');
      state.loading = true
    })
    builder.addCase(preSignUpThunk.fulfilled, (state, action) => {      
      console.log('fullfilled...');
      state.loading = false
    })
    builder.addCase(preSignUpThunk.rejected, state => {
      console.log('rejected...');
      state.loading = false
    })
  }
});

export const { setAuthInitialState } = authSlice.actions;
export default authSlice.reducer;
