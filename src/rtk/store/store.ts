import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import appReducer from '../slices/appSlice';
import guestReducer from '../slices/guestSlice';
import invoicingReducer from '../slices/invoicingSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    guest: guestReducer,
    invoicing: invoicingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
