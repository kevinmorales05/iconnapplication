import { SafeArea } from 'components';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'components/theme/theme';
import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, InvoicingProfileInterface } from 'rtk';
import ShopCartScreen from './ShopCartScreen';
import { logoutThunk } from 'rtk/thunks/auth.thunks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { setInvoicingInitialState, setInvoicingProfilesList } from 'rtk/slices/invoicingSlice';
import { getShoppingCart, emptyShoppingCar, updateShoppingCart } from 'services/vtexShoppingCar.services';
import {getShoppingCartThunk} from 'rtk/thunks/vtex-shoppingCart.thunks'

const CONTAINER_HEIGHT = Dimensions.get('window').height / 6 - 20;
const CONTAINER_HEIGHTMOD = Dimensions.get('window').height / 5 + 10;

interface Props {
  carouselItems?: ItemProps;
}
interface ItemProps {
  image: ImageSourcePropType;
  text: string;
}
interface State {
  activeIndex: number;
  carouselItems: ItemProps[];
}

const ShopCartController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { user: userLogged } = useAppSelector((state: RootState) => state.auth);
  const {guest : guestLogged} = useAppSelector((state: RootState) => state.guest);
  const { cart : dataFromCart } = useAppSelector((state: RootState) => state.cart);

  const { isGuest } = guestLogged;  const { isLogged } = userLogged;
  const modVis = (isLogged) ? true : false;
  const [modVisibility, setModVisibility] = useState(modVis);
  const dispatch = useAppDispatch();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const logOut = async () => {
    if (isLogged) {
      const { meta } = await dispatch(logoutThunk());
      if (meta.requestStatus === 'fulfilled') {
        dispatch(setAppInitialState());
        dispatch(setAuthInitialState());
        dispatch(setGuestInitialState());
        dispatch(setInvoicingInitialState());
      }  
    } else {
      dispatch(setAppInitialState());
      dispatch(setAuthInitialState());
      dispatch(setGuestInitialState());
      dispatch(setInvoicingInitialState());
    }
  };

  const goToMyAccount = () => {
   navigate('Home');
  }
  const goToInvoice = () => {
    (isGuest) ? navigate('InviteSignUp') : navigate('Invoice');
  }

   
  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
      css={styles.backgroundImage}
    >
      
      <ShopCartScreen
        orderFormIdReceived={'655c3cc734e34ac3a14749e39a82e8b9'}
        onPressLogOut={logOut}
        onPressMyAccount={goToMyAccount}
        onPressInvoice={goToInvoice}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  modalBackground: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flex: 1,
    height: CONTAINER_HEIGHT,
    marginVertical: CONTAINER_HEIGHT,
    marginHorizontal: 40,
    borderRadius: 16,
    paddingTop: 10
  },
  iconContainer: {
    backgroundColor: theme.brandColor.iconn_warm_grey,
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 12,
    padding: 8
  }
});


export default ShopCartController;
