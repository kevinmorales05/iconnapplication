import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BranchesStackParams } from 'navigation/types';
import theme from 'components/theme/theme';
import ShowDetailsController from 'screens/branches/ShowDetails/ShowDetailsController';
import BranchesController from 'screens/branches/BranchesController';
import BranchesFiltersController from 'screens/branches/BranchesFilters/BranchesFiltersController';

const BranchesStack: React.FC = ({ navigation, route }: any) => {
  const Stack = createNativeStackNavigator<BranchesStackParams>();

  // removing navigation header in this stack.
  React.useLayoutEffect(() => {
    if (!navigation || !route) return;

    // Get stack parent by id
    const homeStack = navigation.getParent('HomeStack');

    if (homeStack) {
      // Make sure the route name is "BranchesScreen" before turn header off
      if (route.name === 'BranchesScreen') {
        homeStack.setOptions({
          headerShown: false
        });
      }
    }
    // Turn header back on when unmount
    return homeStack
      ? () => {
          homeStack.setOptions({
            headerShown: true
          });
        }
      : undefined;
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { color: 'black', fontWeight: 'bold' },
        headerTintColor: `${theme.brandColor.iconn_accent_secondary}`,
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        headerBackImageSource: require('../../../assets/images/back-button/left_arrow.png')
      }}
      id="BranchesStack"
      initialRouteName="Branches"
    >
      <Stack.Screen options={{ title: 'Tiendas y estaciones', headerBackTitleVisible: false }} name="Branches" component={BranchesController} />
      <Stack.Screen options={{ headerShown: false }} name="ShowDetails" component={ShowDetailsController} />
      <Stack.Screen options={{ headerShown: false }} name="BranchesFilters" component={BranchesFiltersController} />
    </Stack.Navigator>
  );
};

export default BranchesStack;
