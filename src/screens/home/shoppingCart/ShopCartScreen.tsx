import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Section, SafeArea, Touchable, TextContainer } from 'components';
import {
  ICONN_SHOPPING_CART_BASKET,
  ICONN_DELETE_SHOPPING_CART_ITEM,
  ICONN_EMPTY_SHOPPING_CART,
  IMG_PRODUCT1,
  IMG_PRODUCT2,
  IMG_PRODUCT3,
  IMG_PRODUCT4,
  IMG_PRODUCT5
} from 'assets/images';
import { Image, StyleProp, ViewStyle } from 'react-native';
import { text } from '@storybook/addon-knobs';
import { getShoppingCart, emptyShoppingCar, updateShoppingCart } from 'services/vtexShoppingCar.services';
import items from 'assets/files/sellers.json';
import Icon from 'react-native-vector-icons/AntDesign';
import IconO from 'react-native-vector-icons/FontAwesome5'
import { useToast } from 'context';
import { ConnectionItem } from 'components/organisms/ConnectionItem';


interface Props {
  onPressInvoice: () => void;
  onPressMyAccount: () => void;
  onPressLogOut: () => void;
  onPressDeleteItem: () => void;
  onPressAddItem: () => void;
  productsss?: Object;
}


import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, InvoicingProfileInterface } from 'rtk';

//const [prod, setProd] = useState(Object);

const ShopCartScreen: React.FC<Props> = ({ onPressMyAccount, onPressInvoice, onPressLogOut, onPressDeleteItem, onPressAddItem, productsss }) => {
  const insets = useSafeAreaInsets();

  const { cart : dataFromCart } = useAppSelector((state: RootState) => state.cart);  
  const {  internetReachability } = useAppSelector((state: RootState) => state.app);
  const toast = useToast();
  const [inter, setInter] = useState(true);
  useEffect(() => {
    if (internetReachability !== 0) {
      if (internetReachability === 1) setInter(true);
      if (internetReachability === 2) setInter(false);
  }
}, [internetReachability])

  function toastFunction(tag){
    if(tag==="remove" || tag==="add"){
      toast.show({
        message: 'Se actualizó el artículo en la canasta.',
        type: 'success'
      });
    }else{
      toast.show({
        message: 'Se eliminó el artículo de la canasta.',
        type: 'success'
      });

    }
  }

  let isEmpty = false;
  console.log('------------------');
  //console.log(productsss);
  let itemsReceived = null;
  if (productsss) {
    //const array = Object.values(productsss.items);
    
    const arrayValues = Object.values(productsss);
    
    //const itemsListRecieved = array[2];
   
    itemsReceived = arrayValues[2];
    
    if (itemsReceived) {
      if (itemsReceived.items) {
        const tam = Object.values(itemsReceived.items).length;
        console.log('tamaño: ', tam);
        if (tam > 0) {
          isEmpty = false;
        }
      }
    }
    console.log('.............');
  }
  console.log('------------------');

  const Counter: React.RF = ({ orderFormId, item, itemIndex }) => {
    const [counterValue, setCounterValue] = useState(0);
    const deleteItem = () => {
      console.log('***delete item***');
      item.quantity--;
      setCounterValue(item.quantity);
      let request = {
        orderItems: [
          {
            id: item.id,
            quantity: item.quantity,
            seller: '1',
            index: itemIndex
          }
        ]
      };

      try {
        updateShoppingCart(orderFormId, request);
        toastFunction("remove");
      } catch (error) {
        console.log(error);
      }
    };

    const addItem = () => {
      console.log('***delete item***');
      item.quantity++;
      setCounterValue(item.quantity);
      const request = {
        orderItems: [
          {
            id: item.id,
            quantity: item.quantity,
            seller: '1'
          }
        ]
      };
      try {
        updateShoppingCart(orderFormId, request);
        toastFunction("add");
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Container
        space="between"
        crossCenter
        center
        row
        circle
        style={{
          borderStartWidth: 1,
          borderLeftColor: theme.brandColor.iconn_grey,
          borderEndWidth: 1,
          borderRightColor: theme.brandColor.iconn_grey,
          borderTopWidth: 1,
          borderTopColor: theme.brandColor.iconn_grey,
          borderBottomWidth: 1,
          borderBottomColor: theme.brandColor.iconn_grey,
          width: 130,
          height: 37
        }}
      >
        <Button fontSize="h6" size="small" transparent="true" fontBold="true" onPress={deleteItem}>
          -
        </Button>
        <Container>
          <Container>
            <CustomText text="" fontSize={7}></CustomText>
          </Container>
          <Container>
            <TextContainer text={item.quantity} textAlign="auto" fontSize={11}></TextContainer>
          </Container>
          <Container>
            <CustomText text="" fontSize={7}></CustomText>
          </Container>
        </Container>
        <Button fontSize="h6" size="small" transparent="true" onPress={addItem}>
          +
        </Button>
      </Container>
    );
  };

  const ItemsList: React.FC = ({ itemss }) => {
   let toShow = null;
    const productsList = [
      {
        name: 'papas',
        imageUrl: 'http://oneiconn.vteximg.com.br/arquivos/ids/155405-55-55/01-coca.png?v=637969749439630000',
        description: 'golosinas',
        price: 18.23,
        oldPrice: 20.0,
        priceDefinition: {
          total: 1600
        }
      } 
    ];

    if (itemss) {
      const itemsToShow = itemss.items;
      if (itemsToShow) {
        if (Object.values(itemsToShow).length) {
          toShow = itemsToShow;
        } else {
          toShow = productsList;
        }
      } else {
        toShow = productsList;
      }
    } else {
      toShow = productsList;
    }

    const emptyShoppingCart = () => {
      console.log('***empty ShoppingCart***');
      try {
        emptyShoppingCar('655c3cc734e34ac3a14749e39a82e8b9', {});
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', paddingHorizontal: 50 }}>
        {toShow.map((value, index) => {
          return <Item value={value} arrayIndex={index} />;
        })}
        <Container center style={{ backgroundColor: theme.brandColor.iconn_background, paddingHorizontal: 16 }}>
          <TextContainer
            textColor={theme.brandColor.iconn_grey}
            text="Artículos sujetos a disponibilidad en tienda. Los precios publicados pueden ser distintos a los señalizados en las tiendas."
            fontSize={12}
            marginTop={24}
            textAlign="justify"
            marginBottom={8}
          ></TextContainer>
          <Container
            style={{
              borderStartWidth: 0,
              borderLeftColor: theme.brandColor.iconn_med_grey,
              borderEndWidth: 0,
              borderRightColor: theme.brandColor.iconn_med_grey,
              borderTopWidth: 1,
              borderTopColor: theme.brandColor.iconn_med_grey,
              borderBottomWidth: 1,
              borderBottomColor: theme.brandColor.iconn_med_grey,
              width: 350,
              height: 50
            }}
          >
            <Button
              transparent
              fontSize="h5"
              length="long"
              leftIcon={<Image source={ICONN_EMPTY_SHOPPING_CART} />}
              color="iconn_grey"
              onPress={emptyShoppingCart}
            >
              Vaciar canasta
            </Button>
          </Container>
          <CustomText text=""></CustomText>
        </Container>
      </Container>
    );
  };

  const Item: React.FC = ({ value, arrayIndex }) => {
    const deleteShoppingCartItem = () => {
      console.log('***delete item: ', value.id);
      const request = {
        orderItems: [
          {
            id: '' + value.id,
            quantity: 0,
            seller: '1',
            index: arrayIndex
          }
        ]
      };
      try {

        updateShoppingCart('655c3cc734e34ac3a14749e39a82e8b9',request);
        toastFunction("delete");;

      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Container
        row
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 9,
          marginBottom: 0,
          height: 110,
          backgroundColor: theme.brandColor.iconn_white,
          borderRadius: 8,
          paddingBottom: 10
        }}
      >
        <Container>
          <Image source={{ uri: value.imageUrl }} style={{ marginTop: 10, width: 90, height: 88 }} />
        </Container>
        <Container>
          <Container style={{ marginTop: 10, width: 90, height: 55 }}>
            <Container row crossCenter space="between">
              <Text numberOfLines={3} style={{ width: 175, color: 'black' }}>
                {value.name}
              </Text>
              <TextContainer text={'$' + value.priceDefinition.total} fontBold marginLeft={10}></TextContainer>
            </Container>
            <Container>
              <TextContainer numberOfLines={1} text={'$' + value.price + ' c/u'} textColor="grey" fontSize={12} marginTop={4}></TextContainer>
            </Container>
          </Container>
          <Container row space="around" style={{ marginTop: 4 }}>
            <Button
              fontSize="h6"
              color="iconn_red_original"
              size="medium"
              marginRight={30}
              onPress={deleteShoppingCartItem}
              transparent
              leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} />}
            >
              Eliminar
            </Button>
            <Counter orderFormId={'655c3cc734e34ac3a14749e39a82e8b9'} item={value} itemIndex={arrayIndex} />
          </Container>
        </Container>
      </Container>
    );
  };

  const fullCart = (
    <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background }}>
      <ScrollView
        bounces={false}
        style={{ flex: 1, marginTop: 0, width: '110%' }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 1,
          backgroundColor: theme.brandColor.iconn_background
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ItemsList itemss={itemsReceived} />
      </ScrollView>
    </Container>
  );

  const emptyCart = (
    <Container flex >
      <Container flex crossCenter>
        <Image source={ICONN_SHOPPING_CART_BASKET} style={{ width: 40, height: 40, alignSelf: 'center' }} />
        <CustomText text="Tu canasta está vacía" textAlign="center" fontBold></CustomText>
        <CustomText text="!Encuentra y selecciona los articulos de tu preferencia!" textAlign="center"></CustomText>
      </Container>
    </Container>
  );

  const emptyCartFooter = (
    <Container style={{marginBottom:24, width:'100%'}}>
      <Button length="long" round fontSize="h3" fontBold onPress={onPressMyAccount}>
        Ver artículos
      </Button>
    </Container>
  );

  const fullCartFooter = (
    <Container style={{ paddingLeft: 10, width: 280 }}>
      <Container row space="between" style={{ marginTop: 8 }}>
        <TextContainer text="Subtotal:" fontSize={14}></TextContainer>
        <CustomText
          text={'$' + (itemsReceived != undefined ? (itemsReceived.totalizers != undefined ? itemsReceived.totalizers[0].value : '10') : '10') + ' MXN'}
          fontSize={18}
          fontBold
        ></CustomText>
      </Container>
      <Button length="long" round fontSize="h3" marginTop={25} fontBold onPress={onPressMyAccount}>
        Continuar
      </Button>
    </Container>
  );

  const cartFooter = isEmpty ? emptyCartFooter : fullCartFooter;
  const cart = isEmpty ? emptyCart : fullCart;

  return (
    <Container flex crossCenter style={{ margin: 0, backgroundColor: theme.fontColor.medgrey, width: '100%', padding:0 }}>
     {inter ? (
      <>
          {cart}
      </>
    ) : (
      <>
        <Container flex backgroundColor={theme.brandColor.iconn_background} style={{ width: '110%' }}>
        <ConnectionItem></ConnectionItem>
        </Container>
      </>
    )}
      {cartFooter}

    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingLeft: 10, paddingRight: 10 },
  footer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center'
  }
});

export default ShopCartScreen;
