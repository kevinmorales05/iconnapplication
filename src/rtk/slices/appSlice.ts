import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppInterface } from 'rtk/types';

const initialState: AppInterface = {
  error: '',
  internetReachability: 0,
  internetReachabilityReviewed: 0
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppInitialState(state) {
      state.error = '';
      state.internetReachability = 0;
      state.internetReachabilityReviewed = 0;
    },
    setAppError(state, action: PayloadAction<AppInterface>) {
      state.error = action.payload.error;
    },
    setAppInternetReachability(state, action: PayloadAction<AppInterface>) {
      state.internetReachability = action.payload.internetReachability;
    },
    setAppInternetReachabilityReviewed(state, action: PayloadAction<AppInterface>) {
      state.internetReachabilityReviewed = action.payload.internetReachabilityReviewed;
    }
  }
});

export const { setAppInitialState, setAppError, setAppInternetReachability, setAppInternetReachabilityReviewed } = appSlice.actions;
export default appSlice.reducer;
