import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import appReducer from '../slices/appSlice';
import cartReducer from '../slices/cartSlice';
import sellerReducer from '../slices/sellerSlice';
import invoicingReducer from '../slices/invoicingSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
  invoicing: invoicingReducer,
  cart: cartReducer,
  seller: sellerReducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
