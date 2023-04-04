import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackParams, HomeTabScreens } from './types';
import { Image } from 'react-native';
import { RootState, useAppSelector } from 'rtk';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TAB_CAT, TAB_HOME, TAB_PIN_LOCATION, TAB_PROMOS, TAB_USER_PROFILE } from 'assets/images';
// import BranchesStack from './stacks/nested/BranchesStack';
import CategoriesController from 'screens/categories/CategoriesController';
import HomeController from 'screens/home/HomeController';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';
import MyAccountController from 'screens/home/myAccount/MyAccountController';
import PromotionsController from 'screens/home/promotions/PromotionsController';
import theme from 'components/theme/theme';
import InConstructionController from 'components/screens/InConstruction/InConstructionController';
import { logEvent } from 'utils/analytics';
import { getStatusModuleFather } from 'utils/modulesApp';
import { modulesRemoteConfig } from '../common/modulesRemoteConfig';
import DisableController from 'screens/home/disableScreen/DisableController';
import BranchesStack from './stacks/nested/BranchesStack';

const Tab = createBottomTabNavigator<HomeTabScreens>();

export const TabNavigator = () => {
  const { isGuest, user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'Home'>>();
  const { paySuccess } = route.params;
  const { appModules } = useAppSelector((state: RootState) => state.app);

  //sucursales
  const stores: boolean | undefined = getStatusModuleFather(appModules ? appModules : [], modulesRemoteConfig.helpCenter);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: theme.brandColor.iconn_green_original,
        tabBarInactiveTintColor: theme.fontColor.placeholder,
        headerShown: true,
        tabBarLabelStyle: { fontSize: theme.fontSize.h6 },
        tabBarHideOnKeyboard: true
      })}
    >
      <Tab.Screen
        listeners={{
          tabPress: () => {
            logEvent('tabNavigationOpenHome', { id: user.id, description: 'Abrir inicio en el menú inferior' });
          }
        }}
        options={{
          headerShown: false,
          title: 'Inicio',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={TAB_HOME}
                style={{ tintColor: `${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height: 24, width: 24 }}
              />
            );
          }
        }}
        name="HomeScreen"
        // eslint-disable-next-line react/no-children-prop
        children={() => <HomeController paySuccess={paySuccess} />}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            logEvent('tabNavigationOpenCategories', { id: user.id, description: 'Abir categorías desde el menú inferior' });
          }
        }}
        name="CategoriesScreen"
        component={CategoriesController}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          title: 'Categorías',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={TAB_CAT}
                style={{ tintColor: `${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height: 24, width: 24 }}
              />
            );
          }
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            logEvent('tabNavigationOpenPromotions', { id: user.id, description: 'Abrir promociones del menú inferior' });
          }
        }}
        name="PromosScreen"
        component={PromotionsController}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          title: 'Promociones',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={TAB_PROMOS}
                style={{ tintColor: `${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height: 24, width: 24 }}
              />
            );
          }
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            logEvent('tabNavigationOpenStoreUbication', { id: user.id, description: 'Seleccionar ubicación de tiendas y estaciones del menú inferior' });
          }
        }}
        name="BranchesScreen"
        //component={isGuest ? InviteSignUpController : stores ? InConstructionController : DisableController}
        component={isGuest ? InviteSignUpController : BranchesStack}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          title: 'Sucursales',
          headerTitle: 'Tiendas y estaciones',
          tabBarItemStyle: { opacity: !stores ? 0.4 : 1 },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={TAB_PIN_LOCATION}
                style={{
                  tintColor: `${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`,
                  height: 24,
                  width: 24
                }}
              />
            );
          }
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            logEvent('tabNavigationAccount', { id: user.id, description: 'Crear cuenta desde menú de cuenta' });
          }
        }}
        name="MyAccountScreen"
        component={isGuest ? InviteSignUpController : MyAccountController}
        options={{
          unmountOnBlur: true,
          headerShown: isGuest ? false : true,
          title: 'Cuenta',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={TAB_USER_PROFILE}
                style={{ tintColor: `${focused ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}`, height: 24, width: 24 }}
              />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
};
