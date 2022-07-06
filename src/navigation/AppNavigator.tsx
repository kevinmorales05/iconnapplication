import React, { useEffect, useState } from 'react';
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
  const [user, setUser] = useState();
  const [initilizing, setInitilizing] = useState(true);
  const { error } = useAppSelector((state: RootState) => state.app);

  const onAuthStateChanged = (user: any) => {
    auth().currentUser?.reload(); // refresh user after backend sets emailVerified as true.
    setUser(user);
    if (initilizing) setInitilizing(false);
  }

  /**
   * Show global http errors and reset AppError.
   */
  useEffect(() => {
    if (error !== undefined) {
      alert.show({
        title: error
      });
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
  }, [])

  if (initilizing) return null;

  if (!user || (user && !user.emailVerified)) {
    console.log(`Sigue en auth ${user.email}, emailVerified: ${user.emailVerified}`);
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthStack">
        <Stack.Screen name="AuthStack" component={AuthStack} />       
      </Stack.Navigator>    
    );
  } else if (user && user.emailVerified) {
    console.log(`USUARIO LOGUEADO: ${user.email}, emailVerified: ${user.emailVerified} 🥳🥳🥳🥳`);
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeStack">
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>    
    );  
  } else {
    // remove this else, isnt needed.
    console.log('en el else: ⚠️ ', user);
  }
};

export default AppNavigator;
