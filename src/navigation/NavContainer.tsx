import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import linking from './deeplinks/linkingConfig';
import { navigationRef } from './RootNavigation';

const NavContainer: React.FC = () => (
  <NavigationContainer ref={navigationRef} linking={linking}>
    <AppNavigator />
  </NavigationContainer>
);

export default NavContainer;
