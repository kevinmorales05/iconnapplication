import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from 'components/theme/theme';
import HomeController from 'screens/home/HomeController';
import CategoriesController from 'screens/categories/CategoriesController';
import { HomeStackParams, HomeTabScreens } from './types';
import MyAccountController from 'screens/home/myAccount/MyAccountController';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';
import PromotionsController from 'screens/home/promotions/PromotionsController';
import { RootState, useAppSelector } from 'rtk';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TAB_CAT, TAB_HOME, TAB_PIN_LOCATION, TAB_PROMOS, TAB_USER_PROFILE } from 'assets/images';

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
            return <Image source={TAB_HOME} style={{tintColor:`${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height:24, width:24}}/>
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
            return <Image source={TAB_CAT} style={{tintColor:`${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height:24, width:24}}/>
          }
        }}
      />
      <Tab.Screen
        name="PromosScreen"
        component={PromotionsController}
        options={{
          headerShown: false,
          title: 'Promociones',
          tabBarIcon: ({ focused }) => {
            return <Image source={TAB_PROMOS} style={{tintColor:`${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height:24, width:24}}/>
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
            return <Image source={TAB_PIN_LOCATION} style={{tintColor:`${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height:24, width:24}}/>
          }
        }}
      />
      <Tab.Screen
        name="MyAccountScreen"
        component={isGuest ? InviteSignUpController : MyAccountController}
        options={{
          unmountOnBlur: true,
          headerShown: isGuest ? false : true,
          title: 'Cuenta',
          tabBarIcon: ({ focused }) => {
            return <Image source={TAB_USER_PROFILE} style={{tintColor:`${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height:24, width:24}}/>
          }
        }}
      />
    </Tab.Navigator>
  );
};
