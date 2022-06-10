import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import SignUpController from 'screens/auth/SignUp/SignUpController';
import LoginController from 'screens/auth/Login/LoginController';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignUp">
    <Stack.Screen name="SignUp" component={SignUpController} />
    <Stack.Screen name="Login" component={LoginController} />
  </Stack.Navigator>
);

export default AuthStack;
