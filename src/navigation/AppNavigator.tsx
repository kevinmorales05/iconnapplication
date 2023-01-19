import React, { useEffect } from 'react';
import AuthStack from './stacks/AuthStack';
import { useToast, useAlert, useLoading } from 'context';
import { DeviceEventEmitter } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  RootState,
  useAppSelector,
  useAppDispatch,
  setAppError,
  setAppInitialState,
  setAppInternetReachability,
  setAppInternetReachabilityReviewed
} from 'rtk';
import NetInfo from '@react-native-community/netinfo';
import { store } from 'rtk';
import HomeStack from './stacks/HomeStack';

const Stack = createNativeStackNavigator<any>();
const AppNavigator: any = () => {
  const alert = useAlert();
  const loader = useLoading();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { error, internetReachability } = useAppSelector((state: RootState) => state.app);
  const { user: userLogged, isGuest } = useAppSelector((state: RootState) => state.auth);
  const { isLogged } = userLogged;

  /**
   * Show global http errors and reset AppError.
   */
  useEffect(() => {
    if (error !== '') {
      alert.show({ message: error }, 'error');
      loader.hide();
      dispatch(setAppError({ error: '' }));
    }
  }, [error]);

  /**
   * Show global http errors and reset AppError.
   */
  useEffect(() => {
    if (internetReachability !== 0) {
      if (internetReachability === 1) toast.show({ message: 'Conectado a internet.', type: 'success' });
      if (internetReachability === 2) toast.show({ message: '¡Oops! No hay conexión a internet.', type: 'warning' });
      dispatch(setAppInternetReachability({ internetReachability: 0 }));
    }
  }, [internetReachability]);

  /**
   * 1. Listen global http exceptions.
   * 2. Fetch connection status first time when app loads as listener is added afterwards.
   * 3. Reset the app state
   */
  useEffect(() => {
    // 1.
    DeviceEventEmitter.addListener('error', data => {
      if (!error) dispatch(setAppError({ error: data }));
    });
    // 2.
    NetInfo.configure({
      reachabilityUrl: 'https://clients3.google.com/generate_204',
      reachabilityTest: async response => response.status === 204,
      reachabilityLongTimeout: 7 * 1000, // 7s
      reachabilityShortTimeout: 1 * 1000, // 1s
      reachabilityRequestTimeout: 5 * 1000 // 5s
    });
    NetInfo.addEventListener(state => {
      if (state.isConnected === true && state.isInternetReachable === true) {
        const reachabilityReviewed = store.getState().app.internetReachabilityReviewed;
        if (reachabilityReviewed === 1) {
          dispatch(setAppInternetReachability({ internetReachability: 1 }));
          dispatch(setAppInternetReachabilityReviewed({ internetReachabilityReviewed: 1 }));
        }
      }
      if (state.isInternetReachable === false) {
        dispatch(setAppInternetReachability({ internetReachability: 2 }));
        dispatch(setAppInternetReachabilityReviewed({ internetReachabilityReviewed: 1 }));
      }
    });
    // 3.
    dispatch(setAppInitialState());
  }, []);

  /**
   * Manages stack navigation based on logged user.
   */
  if (!isLogged && !isGuest) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthStack">
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    );
  } else if (isLogged || isGuest) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={HomeStack} />
      </Stack.Navigator>
    );
  }
};

export default AppNavigator;
