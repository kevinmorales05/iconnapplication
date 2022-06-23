import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  initialState: initialState,
  reducers: {
    setAuthInitialState(state, action: PayloadAction<AuthDataInterface>) {
      state = initialState;
    }
  }
});

export const { setAuthInitialState } = authSlice.actions;
export default authSlice.reducer;
