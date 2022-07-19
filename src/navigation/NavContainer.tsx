import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import linking from './deeplinks/linkingConfig';

const NavContainer: React.FC = () => (
  <NavigationContainer linking={linking}>
    <AppNavigator />
  </NavigationContainer>
);

export default NavContainer;
