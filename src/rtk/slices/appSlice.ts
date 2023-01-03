import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppInterface } from 'rtk/types';

const initialState: AppInterface = {
  error: '',
  internetReachability: 0,
  internetReachabilityReviewed: 0,
  visibleSearchByDistance: true,
  visibleStoreSymbology: true
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppInitialState(state) {
      state.error = '';
      state.internetReachability = 0;
      state.internetReachabilityReviewed = 0;
      state.visibleStoreSymbology = true;
      state.visibleSearchByDistance = true;
    },
    setAppError(state, action: PayloadAction<AppInterface>) {
      state.error = action.payload.error;
    },
    setAppInternetReachability(state, action: PayloadAction<AppInterface>) {
      state.internetReachability = action.payload.internetReachability;
    },
    setAppInternetReachabilityReviewed(state, action: PayloadAction<AppInterface>) {
      state.internetReachabilityReviewed = action.payload.internetReachabilityReviewed;
    },
    setAppVisibleStoreSymbology(state, action: PayloadAction<AppInterface>) {
      state.visibleStoreSymbology = action.payload.visibleStoreSymbology;
    },
    setAppVisibleSearchByDistance(state, action: PayloadAction<AppInterface>) {
      state.visibleSearchByDistance = action.payload.visibleSearchByDistance;
    }
  }
});

export const {
  setAppError,
  setAppInitialState,
  setAppInternetReachability,
  setAppInternetReachabilityReviewed,
  setAppVisibleSearchByDistance,
  setAppVisibleStoreSymbology
} = appSlice.actions;
export default appSlice.reducer;
