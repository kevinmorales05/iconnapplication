import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import HomeController from 'screens/home/HomeController';
import ProfileController from 'screens/home/profile/ProfileController';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeController} />
    <Stack.Screen name="Profile" component={ProfileController} />
    <Stack.Screen name="InviteSignUp" component={InviteSignUpController}/>
  </Stack.Navigator>
);

export default HomeStack;
