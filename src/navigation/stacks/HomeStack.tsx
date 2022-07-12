import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import HomeController from 'screens/home/HomeController';
import ProfileController from 'screens/home/profile/ProfileController'

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeController} />
    <Stack.Screen name="Profile" component={ProfileController} />
  </Stack.Navigator>
);

export default HomeStack;
