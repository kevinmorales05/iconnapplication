import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAlert, useLoading } from 'context';
import React, { useEffect } from 'react';
import { RootState, useAppSelector, useAppDispatch } from '../rtk';
import { setAppError, setAppInitialState } from '../rtk/slices/appSlice';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';

const Stack = createNativeStackNavigator<any>();
const AppNavigator: React.FC = () => {

  const { error } = useAppSelector((state: RootState) => state.app);
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const loader = useLoading();

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
   */
  useEffect(() => {
    dispatch(setAppInitialState({}));
  }, []);


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeStack"
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>    
  );
};

export default AppNavigator;
