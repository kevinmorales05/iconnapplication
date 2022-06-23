import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppInterface } from 'rtk/types';

const initialState: AppInterface = {
  error: undefined  
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppInitialState(state, action: PayloadAction<AppInterface>) {
      state = initialState;
    }
  }
});

export const { setAppInitialState } = appSlice.actions;
export default appSlice.reducer;
