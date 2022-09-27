import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { setAppInitialState, setAuthInitialState, setGuestInitialState, setInvoicingInitialState, useAppDispatch } from 'rtk';
import { authServices } from 'services';
import { version as app_version } from './../../../../package.json';
import MyAccountScreen from './MyAccountScreen';

const MyAccountController: React.FC = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();

  // removing navigation header in this screen.
  React.useLayoutEffect(() => {
    if (!navigation || !route) return;

    // Get stack parent by id
    const homeStack = navigation.getParent('HomeStack');

    if (homeStack) {
      // Make sure the route name is "MyAccountScreen" before turn header off
      if (route.name === 'MyAccountScreen') {
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

  const logOut = async () => {
    try {
      await authServices.logOutUser();
    } catch (error) {
      console.log('LOGOUT ERROR', error);
    } finally {
      dispatch(setAppInitialState());
      dispatch(setAuthInitialState());
      dispatch(setGuestInitialState());
      dispatch(setInvoicingInitialState());
    }
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <MyAccountScreen logOut={logOut} app_version={app_version} />
    </SafeArea>
  );
};

export default MyAccountController;
