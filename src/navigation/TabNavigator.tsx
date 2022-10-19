import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from 'components/theme/theme';
import HomeController from 'screens/home/HomeController';
import CategoriesController from 'screens/categories/CategoriesController';
import { HomeStackParams, HomeTabScreens } from './types';
import MyAccountController from 'screens/home/myAccount/MyAccountController';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';
import { RootState, useAppSelector } from 'rtk';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator<HomeTabScreens>();

export const TabNavigator = () => {
  const { isGuest } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'Home'>>();
  const { paySuccess } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.brandColor.iconn_green_original,
        tabBarInactiveTintColor: theme.fontColor.placeholder,
        headerShown: true,
        tabBarLabelStyle: { fontSize: theme.fontSize.h6 }
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Inicio',
          tabBarIcon: ({ focused }) => {
            return <Entypo name="home" size={24} color={focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder} />;
          }
        }}
        name="HomeScreen"
         children={()=><HomeController paySuccess={paySuccess}/>}
      />
      <Tab.Screen
        name="CategoriesScreen"
        component={CategoriesController}
        options={{
          headerShown: false,
          title: 'Categorías',
          tabBarIcon: ({ focused }) => {
            return <Octicons name="apps" size={24} color={focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder} />;
          }
        }}
      />
      <Tab.Screen
        name="PromosScreen"
        component={InviteSignUpController}
        options={{
          headerShown: false,
          title: 'Promos',
          tabBarIcon: ({ focused }) => {
            return <MaterialCommunityIcons name="sale" size={24} color={focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder} />;
          }
        }}
      />
      <Tab.Screen
        name="BranchesScreen"
        component={InviteSignUpController}
        options={{
          headerShown: false,
          title: 'Sucursales',
          tabBarIcon: ({ focused }) => {
            return <Entypo name="location" size={24} color={focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder} />;
          }
        }}
      />
      <Tab.Screen
        name="MyAccountScreen"
        component={isGuest ? InviteSignUpController : MyAccountController}
        options={{
          unmountOnBlur: true,
          headerShown: isGuest ? false : true,
          title: 'Mi Cuenta',
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color={focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}
              />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
};
