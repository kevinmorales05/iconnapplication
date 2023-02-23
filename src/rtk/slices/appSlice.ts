import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppInterface } from 'rtk/types';

const initialState: AppInterface = {
  error: '',
  internetReachability: 0,
  internetReachabilityReviewed: 0,
  visibleSearchByDistance: true,
  visibleStoreSymbology: true,
  state: '',
  municipality: '',
  latitude: 0,
  longitude: 0,
  appModules: []
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
    setAppInitialPreferences(state) {
      state.visibleStoreSymbology = true;
      state.visibleSearchByDistance = true;
      state.state = '';
      state.municipality = '';
      state.latitude = 0;
      state.longitude = 0;
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
    },
    setAppStateAndMunicipality(state, action: PayloadAction<AppInterface>) {
      state.state = action.payload.state;
      state.municipality = action.payload.municipality;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setAppModules(state, action: PayloadAction<AppInterface>) {
      state.appModules = action.payload.appModules;
    }
  }
});

export const {
  setAppError,
  setAppInitialState,
  setAppInitialPreferences,
  setAppInternetReachability,
  setAppInternetReachabilityReviewed,
  setAppStateAndMunicipality,
  setAppVisibleSearchByDistance,
  setAppVisibleStoreSymbology,
  setAppModules
} = appSlice.actions;
export default appSlice.reducer;
