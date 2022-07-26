import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppInterface } from 'rtk/types';

const initialState: AppInterface = {
  error: undefined
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppInitialState(state) {
      state = { ...initialState };
    },
    setAppError(state, action: PayloadAction<AppInterface>){
      state.error = action.payload.error;
    }
  }
});

export const { setAppInitialState, setAppError } = appSlice.actions;
export default appSlice.reducer;
