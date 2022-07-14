import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import HomeController from 'screens/home/HomeController';
import AccountScreen from 'screens/AccountScreen';
import ProfileController from 'screens/home/profile/ProfileController';

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: true }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={HomeController} />
    <Stack.Screen name="Mi Cuenta" component={AccountScreen} />
    <Stack.Screen name="Profile" component={ProfileController} />
  </Stack.Navigator>
);

export default HomeStack;
