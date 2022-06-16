import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import SignUpController from 'screens/auth/SignUp/SignUpController';
import LoginController from 'screens/auth/Login/LoginController';
import ContinueWithController from 'screens/auth/onboarding/ContinueWith/ContinueWithController';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ContinueWith">
    <Stack.Screen name="SignUp" component={SignUpController} />
    <Stack.Screen name="Login" component={LoginController} />
    <Stack.Screen name="ContinueWith" component={ContinueWithController} />
  </Stack.Navigator>
);

export default AuthStack;
