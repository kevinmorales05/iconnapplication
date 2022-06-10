import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';

const NavContainer: React.FC = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default NavContainer;
