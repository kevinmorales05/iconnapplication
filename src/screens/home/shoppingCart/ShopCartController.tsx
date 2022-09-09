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

//import cart slice 
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


   const [prod, setProd] = useState(Object);

/*
   const getOrders = useCallback(async () => {
    const {list : data} = await vtexordersServices.getOrdersListByUserEmail('cristhian.mendez@citi.com.mx', 1,3);
    console.log("ESTA ES LA DATA", JSON.stringify(data, null, 3));
    let orderArray : OrderInterface[] = data.map((order) => {
      return {
      orderId: order.orderId,
      creationDate: order.creationDate,
      totalValue: order.totalValue,
      status: order.status,
      orderIsComplete: order.orderIsComplete,
      totalItems: order.totalItems,
      }
    })
  
  }, []);

const getCart = useCallback(
  async () => {
    try {
      const response = await dispatch(getShoppingCartThunk('655c3cc734e34ac3a14749e39a82e8b9'));;    
    } catch (error) {
      console.warn(error);
    }
  }, []
)


//use call back
   const getCart1 = async () => {
    try {
      const response = await dispatch(getShoppingCartThunk('655c3cc734e34ac3a14749e39a82e8b9'));;
      //falta accion de despachar
      
    } catch (error) {
      console.warn(error);
    }
  };

   useEffect(() => {
    setProd(dataFromCart);
  }, [dataFromCart])

  useEffect(() => {
    getCart();
    console.log("data from cart", dataFromCart);
    setProd(dataFromCart);
    
  }, [])*/
  
  useEffect(() => {
    //setProd(getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9'));
    console.log('............................');
    console.log('se imprime desde useEffect',prod);
    console.log('............................');
    const fetchData = () => {
      const data = getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9');
      return data;
    }

    const result = fetchData()
      .catch(console.error);

    setProd(result);
  }, [])

   
  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
      css={styles.backgroundImage}
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
