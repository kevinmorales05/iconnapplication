import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import HomeController from 'screens/home/HomeController';
import AccountScreen from 'screens/AccountScreen';

import EditEmailController from 'screens/auth/onboarding/EditEmail/EditEmailController'
import EnterOtpController from 'screens/auth/onboarding/EnterOtp/EnterOtpController'
import EditPasswordController from 'screens/auth/onboarding/EditPassword/EditPasswordController';
import ProfileController from 'screens/home/profile/ProfileController';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: true }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={HomeController} />
    <Stack.Screen name="Mi Cuenta" component={AccountScreen} />
    <Stack.Screen name="Profile" component={ProfileController} />
    <Stack.Screen name="Editar correo" component={EditEmailController} />
    <Stack.Screen name="EnterOtp" component={EnterOtpController} />
    <Stack.Screen name="Editar Contraseña" component={EditPasswordController} />
    <Stack.Screen name="InviteSignUp" component={InviteSignUpController}/>
  </Stack.Navigator>
);

export default HomeStack;
