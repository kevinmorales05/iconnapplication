import { Container, CustomModal, SafeArea, TextContainer } from 'components';
import React, { Component, useCallback, useEffect, useState } from 'react';
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
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ICONN_COFFEE } from 'assets/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { getInvoicingProfileListThunk } from 'rtk/thunks/invoicing.thunks';
import { setInvoicingInitialState, setInvoicingProfilesList } from 'rtk/slices/invoicingSlice';
import { getShoppingCart, emptyShoppingCar, updateShoppingCart } from 'services/vtexShoppingCar.services';

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
   (isGuest) ? navigate('InviteSignUp') : navigate('Mi Cuenta');
  }
  const goToInvoice = () => {
    (isGuest) ? navigate('InviteSignUp') : navigate('Invoice');
  }

  /**
   * Load Invocing Profile List and store it in the redux store.
   */

   //const prod = getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9')
   //console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
   //console.log(Object.values(prod.items));
   //console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

   const [prod, setProd] = useState(Object);
   //const [colonies, setColonies] = useState<Colony[] | null>(null);


   useEffect(() => {
    //dispatch(setTermsAndCond({termsAndConditions: value}));
    //const prodLsit = getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9')
    setProd(getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9'));
    //setProd(prodLsit);
    console.log('............................');
    console.log('se imprime desde useEffect',prod);
    console.log('............................');
  }, [])

/*
  useEffect(() => {
    (async () => {
      try {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        const data = await getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9');
        console.log(Object.values(data.items));
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        setProd(data);
      } catch (error) {
        setProd(null);
      } finally {
        setProd(null);
      }
    })();
  }, []);*/

   //const deleteProd = emptyShoppingCar('655c3cc734e34ac3a14749e39a82e8b9')
   //const updateProd = updateShoppingCart();
   
  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <ShopCartScreen
        productsss={prod}
        onPressLogOut={logOut}
        onPressMyAccount={goToMyAccount}
        onPressInvoice={goToInvoice}
      />
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
