import CookieManager from '@react-native-cookies/cookies';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  RootState,
  setAppInitialState,
  setAuthInitialState,
  setInvoicingInitialState,
  setShoppingCartInitialState,
  useAppDispatch,
  useAppSelector,
  setPromotionsInitialState,
  setWalletInitialState,
  setAppInitialPreferences
} from 'rtk';
import { authServices } from 'services';
import { version as app_version } from './../../../../package.json';
import MyAccountScreen from './MyAccountScreen';
import { store } from 'rtk';

const MyAccountController: React.FC = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const [countVersion, setCountVersion] = useState<number>(0);
  const [countBack, setBack] = useState<boolean>(false);
  const { cart } = useAppSelector((state: RootState) => state.cart);

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

  useEffect(() => {
    if (countVersion === 10) {
      showVersion();
    } else if (!countBack) {
      countBackTimer();
    }
  }, [countVersion]);

  const showVersion = () => {
    Alert.alert('Informacion', `OrderForm: ${store.getState().cart.cart.orderFormId}`);
  };

  const onPressVersion = () => {
    setCountVersion(countVersion + 1);
  };

  const countBackTimer = () => {
    setTimeout(() => {
      setCountVersion(0);
      setBack(false);
    }, 30000);
  };

  const logOut = async () => {
    try {
      await authServices.logOutUser();
    } catch (error) {
      // console.log('LOGOUT ERROR', error);
    } finally {
      dispatch(setAppInitialState());
      dispatch(setAppInitialPreferences());
      dispatch(setAuthInitialState());
      dispatch(setInvoicingInitialState());
      dispatch(setShoppingCartInitialState());
      dispatch(setPromotionsInitialState());
      dispatch(setWalletInitialState());
      await CookieManager.clearAll();
    }
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <MyAccountScreen onPressVersion={onPressVersion} logOut={logOut} app_version={app_version} />
    </SafeArea>
  );
};

export default MyAccountController;
