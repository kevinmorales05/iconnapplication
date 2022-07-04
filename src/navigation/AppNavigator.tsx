import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAlert, useLoading } from 'context';
import React, { useEffect, useState } from 'react';
import { RootState, useAppSelector, useAppDispatch } from '../rtk';
import { setAppError, setAppInitialState } from '../rtk/slices/appSlice';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';
import auth from '@react-native-firebase/auth'

const Stack = createNativeStackNavigator<any>();
const AppNavigator: React.FC = () => {

  const { error } = useAppSelector((state: RootState) => state.app);
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const [initilizing, setInitilizing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initilizing) setInitilizing(false);
  }

  /**
   * Show global http errors.
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
   * Reset the app state
   * and subscribe to changes of firebase authentication.
   */
  useEffect(() => {    
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    dispatch(setAppInitialState({}));
    return subscriber;    
  }, [])
  
  if (initilizing) return null;

  if (!user) {    
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthStack">
        <Stack.Screen name="AuthStack" component={AuthStack} />       
      </Stack.Navigator>    
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeStack">
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>    
    );  
  }
  
};

export default AppNavigator;
