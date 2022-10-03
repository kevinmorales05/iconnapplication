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
import ProductZoomScreen from './ProductZoomScreen';
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

      }  
    } else {
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
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
     <ProductZoomScreen/>

    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
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
