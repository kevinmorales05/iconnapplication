import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Section, SafeArea } from 'components';
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

interface Props {
  onPressInvoice: () => void;
  onPressMyAccount: () => void;
  onPressLogOut: () => void;
  onPressDeleteItem: () => void;
  onPressAddItem: () => void;
  productsss?: Object;
}

//const [prod, setProd] = useState(Object);

const ShopCartScreen: React.FC<Props> = ({ onPressMyAccount, onPressInvoice, onPressLogOut, onPressDeleteItem, onPressAddItem, productsss }) => {
  const insets = useSafeAreaInsets();
  const isEmpty = false;

  console.log('------------------');
  console.log(productsss);
  let itemsReceived = null;
  if (productsss) {
    //const array = Object.values(productsss.items);
    console.log('ssssssssss');
    const arrayValues = Object.values(productsss);
    console.log(Object.values(productsss).length);
    //const itemsListRecieved = array[2]; 
    console.log('ssssssssss');
    console.log('ccccccccc');
    console.log(arrayValues[2]);
    console.log('ccccccccc');
    itemsReceived = arrayValues[2];
    console.log('.............');
    console.log(itemsReceived);
    console.log('.............');
  }
  console.log('------------------');

  const Counter: React.RF = ( {orderFormId, item} ) => {
    const [counterValue, setCounterValue] = useState(0);
    const deleteItem = () => {
      console.log('***delete item***');
      item.quantity--;
      setCounterValue(item.quantity);
      const request = {
        "orderItems": [
          {
            "id": item.id,
            "quantity": item.quantity,
            "seller": "1"
          }
        ]
      }
      try {
        updateShoppingCart(orderFormId, request);
      } catch (error) {
        console.log(error);
      }
    };
  
    const addItem = () => {
      console.log('***delete item***');
      item.quantity++;
      setCounterValue(item.quantity);
      const request = {
        "orderItems": [
          {
            "id": item.id,
            "quantity": item.quantity,
            "seller": "1"
          }
        ]
      }
      try {
        updateShoppingCart(orderFormId, request);
      } catch (error) {
        console.log(error);
      }
     
    };
    return (
      <Container space='between' crossCenter row circle style={{
        borderStartWidth: 1, borderLeftColor: theme.brandColor.iconn_grey,
        borderEndWidth: 1, borderRightColor: theme.brandColor.iconn_grey, borderTopWidth: 1, borderTopColor: theme.brandColor.iconn_grey,
        borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_grey, width:90, height:41
      }}>
                <Button
                  fontSize="h5"
                  size="small"
                  transparent="true"
                  fontBold="true"
                  onPress={deleteItem}
                >
                  -
                </Button>
        <Container>
          <Container>
            <CustomText text='' fontSize={7}></CustomText>
          </Container>
          <Container>
            <CustomText text={counterValue} textAlign='auto' fontSize={11}></CustomText>
          </Container>
          <Container>
            <CustomText text='' fontSize={7}></CustomText>
          </Container>
        </Container>
                <Button
                  fontSize="h5"
                  size="small"
                  transparent="true"
                  onPress={addItem}
                >
                  +
                </Button>
      </Container>
    );
  };

  const ItemsList: React.FC = ({ itemss }) => {
    console.log('jjjjjjjjjjjjjjkk');
    console.log(itemss);
    console.log('jjjjjjjjjjjjjjkkk');
 
    let toShow = null;
    if(itemss){
     const itemsToShow = itemss.items;
     if(Object.values(itemsToShow).length){
      toShow = itemsToShow
     }
    } else {
      const productsList = [
        {
          name: 'papas',
          imageUrl: IMG_PRODUCT1,
          description: 'golosinas',
          price: 18.23,
          oldPrice: 20.0
        },
        {
          name: 'pepsi de lata',
          imageUrl: IMG_PRODUCT2,
          description: 'bebidas azucaradas',
          price: 17.24,
          oldPrice: 25.23
        },
        {
          name: 'pepsi desechable',
          imageUrl: IMG_PRODUCT3,
          description: 'bebida azucarada',
          price: 12.5,
          oldPrice: 15.23
        },
        {
          name: 'Sabritas',
          imageUrl: IMG_PRODUCT5,
          description: 'comida salada',
          price: 35.2,
          oldPrice: 40.23
        }
      ];
      toShow = productsList
    }

  
    return (
      <Container>
        {
          toShow.map(
            (value) => {
              return (
                <Item value={value} />
              )
            }
          )
        }
            <Container center style={{ backgroundColor: theme.brandColor.iconn_light_grey }}>
        <CustomText textColor={theme.brandColor.iconn_grey} text='Artículos sujetos a disponibilidad en tienda. Los precios publicados pueden ser distintos a los señalizados en las tiendas.' fontSize={12}>
        </CustomText>
        <Container style={{
                borderStartWidth: 1, borderLeftColor: theme.brandColor.iconn_med_grey,
                borderEndWidth: 1, borderRightColor: theme.brandColor.iconn_med_grey, borderTopWidth: 1, borderTopColor: theme.brandColor.iconn_med_grey,
                borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_med_grey, width:360, height:50
              }}>
          <Button transparent="true"
            fontSize="h5"
            length="long"
            leftIcon={<Image source={ICONN_EMPTY_SHOPPING_CART} />}
            color="grey"
          >
            Vaciar canasta
          </Button>
        </Container>
        <CustomText text=''></CustomText>
      </Container>
      </Container>
    );
  };

  const Item: React.FC = ({value}) => {
    return (
      <Container row style={{ marginLeft: 16, marginRight: 16, marginTop: 9, marginBottom: 0, height: 110, backgroundColor: theme.brandColor.iconn_white }}>
        <Container>
          <Image source={ICONN_EMPTY_SHOPPING_CART} style={{ marginTop: 10, width: 80, height: 88 }} />
        </Container>
        <Container>
          <Container row crossCenter space='between'>
            <Text numberOfLines={3} style={{ width: 120, color: 'black' }}>
            {value.name}
          </Text>
            <CustomText text={"$" + value.price} ></CustomText>
          </Container>
          <Container>
          <Text numberOfLines={1} style={{ width: 120, color: 'grey' }}>
          {"$" + value.price + "  c/u"}
          </Text>
          </Container>
          <Container row space='between'>
            <Button fontSize="h6"
              color="iconn_red_original"
              size="medium"
              transparent="true" leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} style={{ left: 1 }} />}>
              Eliminar
            </Button>
            <Counter orderFormId={'655c3cc734e34ac3a14749e39a82e8b9'} item={value} />
          </Container>
        </Container>
      </Container>
    );
  };

  const emptyCart = (
    <Container flex>
      <Container flex crossCenter>
        <Image source={ICONN_SHOPPING_CART_BASKET} style={{ width: 40, height: 40, alignSelf: 'center' }} />
        <CustomText text="Tu canasta está vacía" textAlign="center" fontBold></CustomText>
        <CustomText text="!Encuentra y selecciona los articulos de tu preferencia!" textAlign="center"></CustomText>
      </Container>
    </Container>
  );

  const emptyCartFooter = (
    <Container>
      <Button length="long" round fontSize="h3" fontBold onPress={onPressMyAccount}>
        Ver artículos
      </Button>
    </Container>
  );

  const fullCartFooter = (
    <Container style={{ paddingLeft: 10, width: 280 }}>
      <Container row space="between">
        <CustomText text="Subtotal:" fontSize={14}></CustomText>
        <CustomText text="$ 76.05 MXN" fontSize={18} fontBold></CustomText>
      </Container>
      <Button length="long" round fontSize="h3" fontBold onPress={onPressMyAccount}>
        Continuar
      </Button>
    </Container>
  );


  const cartFooter = isEmpty ? emptyCartFooter : fullCartFooter;

/*
  const [prod, setProd] = useState(Object);
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

  return (
    <Container flex crossCenter center style={{ marginTop: 40, backgroundColor: theme.fontColor.white }}>
      <Container row space='between' style={{ marginTop: 34, marginBottom:10 }}>
        <CustomText text=''></CustomText>
        <CustomText text='Mi canasta' fontBold></CustomText>
        <Button fontSize="h6" transparent="true" size='ssmall' color="iconn_black_original" marginLeft={40}>X</Button>
      </Container>
      <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_light_grey }}>
        <ScrollView bounces={false}
          style={{ flex: 1, marginTop: 0 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 1
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <ItemsList itemss={itemsReceived} />
        </ScrollView>
      </Container>
      <View style={styles.footer}>{cartFooter}</View>
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
