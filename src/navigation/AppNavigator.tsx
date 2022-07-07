import React, { useEffect } from 'react';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';
import auth from '@react-native-firebase/auth'
import { useAlert, useLoading } from 'context';
import { DeviceEventEmitter } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootState, useAppSelector, useAppDispatch, setAppError, setAppInitialState } from 'rtk';

const Stack = createNativeStackNavigator<any>();
const AppNavigator: React.FC = () => {
  
  const alert = useAlert();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.app);
  const { user: userLogged } = useAppSelector((state: RootState) => state.auth);
  const { isLogged } = userLogged;

  const onAuthStateChanged = (user: any) => {
    auth().currentUser?.reload(); // refresh user after backend sets emailVerified as true.
  };

  /**
   * Show global http errors and reset AppError.
   */
  useEffect(() => {
    if (error !== undefined) {
      alert.show({
        message: error
      },'error');
      loader.hide();
      dispatch(setAppError({error:undefined}));
    }
  }, [error]);

  /**
   * 1. Reset the app state and subscribe to changes of firebase authentication.
   * 2. Listen global http exceptions.
   */
  useEffect(() => {
    DeviceEventEmitter.addListener('error', (data) => {
      if (!error) dispatch(setAppError({error: data}));
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    dispatch(setAppInitialState({}));
    return subscriber;
  }, []);

  if (!isLogged) {
    console.log('No authenticated.');
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthStack">
        <Stack.Screen name="AuthStack" component={AuthStack} />       
      </Stack.Navigator>    
    );
  } else {
    console.log(`USUARIO LOGUEADO: ${auth().currentUser?.email}, emailVerified: ${auth().currentUser?.emailVerified} 🥳🥳🥳🥳`);
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeStack">
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>    
    );
  }
};

export default AppNavigator;
