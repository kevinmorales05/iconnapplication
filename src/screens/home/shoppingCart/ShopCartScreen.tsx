import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Section, SafeArea, Touchable, TextContainer } from 'components';
import {
  ICONN_SHOPPING_CART_BASKET,
  ICONN_DELETE_SHOPPING_CART_ITEM,
  ICONN_EMPTY_SHOPPING_CART
} from 'assets/images';
import { Image, StyleProp, ViewStyle } from 'react-native';
import { text } from '@storybook/addon-knobs';
import { getShoppingCart, emptyShoppingCar, updateShoppingCart, clearShoppingCartMessages } from 'services/vtexShoppingCar.services';
import items from 'assets/files/sellers.json';
import Icon from 'react-native-vector-icons/AntDesign';
import IconO from 'react-native-vector-icons/FontAwesome5'
import { ConnectionItem } from 'components/organisms/ConnectionItem';
import { useAlert, useLoading, useToast } from 'context';


interface Props {
  onPressInvoice: () => void;
  onPressMyAccount: () => void;
  onPressLogOut: () => void;
  products: () => Object;
}


import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, InvoicingProfileInterface } from 'rtk';

const ShopCartScreen: React.FC<Props> = ({ onPressMyAccount, onPressInvoice, onPressLogOut, products }) => {
  const insets = useSafeAreaInsets();
  const loader = useLoading();
  const { loading } = useAppSelector((state: RootState) => state.invoicing);
  const { cart : dataFromCart } = useAppSelector((state: RootState) => state.cart);  
  const {  internetReachability } = useAppSelector((state: RootState) => state.app);
  const toast = useToast();
  const [inter, setInter] = useState(true);

  let isEmpty = true;
  const [productList, setProductList] = useState(Object);

  /*
  const getProducts = async () => {
    try {
      const prods = await getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9')
      setProductList(prods);  // set State
    } catch (err) {
      console.error('error');
    }
  };*/

  useEffect(() => {
   // getProducts();
 //  const prods = getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9')
      setProductList(products);
    if (internetReachability !== 0) {
      if (internetReachability === 1) setInter(true);
      if (internetReachability === 2) setInter(false);
    }
  }, [internetReachability]);
  
/*
  useEffect(() => {
    setProductList(getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9'));
    if (internetReachability !== 0) {
      if (internetReachability === 1) setInter(true);
      if (internetReachability === 2) setInter(false);
  }
  console.log("..................");
  console.log(productList);
  console.log("..................");
}, [internetReachability])
*/

useEffect(() => {
  if (loading === false) {
    loader.hide();
  }
}, [loading]);

  function toastFunction(tag, msg){
    if(tag==="decrease" || tag==="increase"){
      toast.show({
        message: msg,
        type: 'success'
      });
    }else if(tag==="addingProductError"){
      toast.show({
        message: msg,
        type: 'error'
      });
    }else if(tag==="delete"){
      toast.show({
        message: msg,
        type: 'success'
      });
    }else if(tag=="empty"){
      toast.show({
        message: msg,
        type: 'success'
      });
    }
  }

  let itemsReceived = null;

  if (productList) {
  const arrayValues = Object.values(productList);
    itemsReceived = arrayValues[2];
    if (itemsReceived) {
      if (itemsReceived.items) {
        const tam = Object.values(itemsReceived.items).length;
        console.log('tamaño: ', tam);
        if(tam > 0){
          isEmpty = false;
        }
      }
    }
  }

  const Counter: React.RF = ({ orderFormId, item, itemIndex }) => {
    const decreaseItem = () => {
      console.log('***decrease item***');
      item.quantity--;
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
        loader.show();
        clearShoppingCartMessages(orderFormId,{});
        setProductList(updateShoppingCart(orderFormId, request));
        toastFunction("decrease",'Se actualizó el artículo en la canasta.');
      } catch (error) {
        console.log(error);
      }finally{ 
        loader.hide();
      }
    };

    const increaseItem = () => {
      console.log('***increase item***');
      item.quantity++;
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
      loader.show();
      clearShoppingCartMessages(orderFormId,{});
      setProductList(updateShoppingCart(orderFormId, request));
      let isthereErrorMessages =  false;
      let errorMsg = "";
        if (productList) {
          const arrayValues = Object.values(productList);
          itemsReceived = arrayValues[2];
          if (itemsReceived) {
            if (itemsReceived.messages) {
              console.log('-----------');
              console.log(itemsReceived.messages);
              console.log('-----------');
              const tam = Object.values(itemsReceived.messages).length;
              console.log('tamañooo: ', tam);
              if(tam > 0){
                isthereErrorMessages = true;
                errorMsg = itemsReceived.messages[0].text;
                console.log("Error obtenido",errorMsg);
              }
            }
          }
        }
        toastFunction(isthereErrorMessages?"addingProductError":"increase",isthereErrorMessages?errorMsg:'Se actualizó el artículo en la canasta.');
      } catch (error) {
        console.log(error);
      }finally{
        loader.hide();
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
        <Button fontSize="h6" size="small" transparent="true" fontBold="true" onPress={decreaseItem}>
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
        <Button fontSize="h6" size="small" transparent="true" onPress={increaseItem}>
          +
        </Button>
      </Container>
    );
  };

  const ItemsList: React.FC = ({ key, itemss }) => {
   let toShow = null;
   let itemsLenght;
    if (itemss) {
      const itemsToShow = itemss.items;
      if (itemsToShow) {
        itemsLenght = Object.values(itemsToShow).length;
        if (itemsLenght) {
          toShow = itemsToShow;
        } else {
        }
      } else {

      }
    } else {
    }

    const emptyShoppingCart = () => {
      console.log('***empty ShoppingCart***');
      try {
        loader.show();
        clearShoppingCartMessages("655c3cc734e34ac3a14749e39a82e8b9",{});
        setProductList(emptyShoppingCar('655c3cc734e34ac3a14749e39a82e8b9', {}));
        toastFunction("empty", "Se eliminaron los artículos de la canasta.");
      } catch (error) {
        console.log(error);
      }finally{
        loader.hide();
      }
    };

    return (
      <Container style={{backgroundColor: theme.brandColor.iconn_background, width: '100%'}}>
        {
          itemsLenght>0?
          toShow.map((value, index) => {
              return (
                <Item value={value} arrayIndex={index} />
              )
            }
          ):<></>
        }
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
        loader.show();
        setProductList(updateShoppingCart('655c3cc734e34ac3a14749e39a82e8b9', request));
        toastFunction("delete", "Se eliminó el artículo de la canasta.");
      } catch (error) {
        console.log(error);
      } finally { 
        loader.hide(); 
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
              <Text numberOfLines={2} style={{ width: 175, color: 'black' }}>
                {value.name}
              </Text>
              <TextContainer text={'$' + (value.priceDefinition.total/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} fontBold marginLeft={10}></TextContainer>
            </Container>
            <Container>
              <TextContainer numberOfLines={1} text={'$' + (value.price/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' c/u'} textColor="grey" fontSize={12} marginTop={4}></TextContainer>
            </Container>
          </Container>
          <Container row space="around" style={{ marginTop: 4 }}>
            <Button
              fontSize="h6"
              color="iconn_red_original"
              size="xxsmall"
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

  const fullCart = (<Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background}}>
    <ScrollView bounces={false}
      style={{ flex: 1, marginTop: 0, width:'100%'}}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 1,
        backgroundColor: theme.brandColor.iconn_background
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <ItemsList key={1} itemss={itemsReceived} />
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
      <Button length="long" round fontSize="h3" fontBold onPress={onPressMyAccount} style={{backgroundColor: theme.brandColor.iconn_green_original}}>
        Ver artículos
      </Button>
    </Container>
  );

  const fullCartFooter = (
    <Container style={{ paddingLeft: 10, width: '100%', backgroundColor: theme.fontColor.white }}>
      <Container row space="between" style={{marginTop: 8}} >
        <TextContainer text="Subtotal:" fontSize={14} textColor={theme.fontColor.paragraph} ></TextContainer>
        <CustomText text={"$" + (itemsReceived!=undefined?(itemsReceived.totalizers!=undefined?((
          itemsReceived.totalizers[0]!=undefined?itemsReceived.totalizers[0].value:100)/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'):"0"): "0") + ' MXN'} fontSize={18} fontBold></CustomText>
      </Container>
      <Container>
      <Button length="long" fontSize="h5" round fontBold onPress={onPressMyAccount} style={{marginTop:5, marginBottom:5, width: 320, backgroundColor: theme.brandColor.iconn_green_original, height:50 }}>
        Continuar
      </Button>
      </Container>
    </Container>
  );

  const cartFooter = isEmpty ? emptyCartFooter : fullCartFooter;
  const cart = isEmpty ? emptyCart : fullCart;

  return (
    <Container flex crossCenter style={{ margin: 0, backgroundColor: theme.brandColor.iconn_background, width: '100%', padding:0 }}>
     {inter ? (
      <>
          {cart}
      </>
    ) : (
      <>
        <Container flex backgroundColor={theme.brandColor.iconn_background} style={{ width: '100%' }}>
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
