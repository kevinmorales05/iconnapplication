import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Section, SafeArea } from 'components';
import { ICONN_SHOPPING_CART_BASKET, ICONN_DELETE_SHOPPING_CART_ITEM, ICONN_EMPTY_SHOPPING_CART, IMG_PRODUCT1, IMG_PRODUCT2, IMG_PRODUCT3, IMG_PRODUCT4, IMG_PRODUCT5 } from 'assets/images';
import { Image, StyleProp, ViewStyle } from 'react-native';

interface Props {
  onPressInvoice: () => void;
  onPressMyAccount: () => void;
  onPressLogOut: () => void;
  productsss?: Object;
}

const ShopCartScreen: React.FC<Props> = ({ onPressMyAccount, onPressInvoice, onPressLogOut, productsss }) => {
  const insets = useSafeAreaInsets();
  const isEmpty = false;


  console.log('--------------');
  console.log(productsss);
  console.log('--------------');

  const emptyCart =
    <Container flex>
      <Container flex crossCenter>
        <Image source={ICONN_SHOPPING_CART_BASKET} style={{ width: 40, height: 40, alignSelf: 'center' }} />
        <CustomText text='Tu canasta está vacía' textAlign='center' fontBold></CustomText>
        <CustomText text='!Encuentra y selecciona los articulos de tu preferencia!' textAlign='center'></CustomText>
      </Container>
    </Container>;

  const emptyCartFooter =
    <Container>
      <Button length="long" round fontSize="h3" fontBold onPress={onPressMyAccount}>
        Ver artículos
      </Button>
    </Container>

  const productsList = [{
    name: "papas",
    imageUrl: IMG_PRODUCT1,
    description: "golosinas",
    price: 18.23,
    oldPrice: 20.0,
  }, {
    name: "pepsi de lata",
    imageUrl: IMG_PRODUCT2,
    description: "bebidas azucaradas",
    price: 17.24,
    oldPrice: 25.23,
  }, {
    name: "pepsi desechable",
    imageUrl: IMG_PRODUCT3,
    description: "bebida azucarada",
    price: 12.50,
    oldPrice: 15.23,
  }, {
    name: "pepsi lata de medio",
    imageUrl: IMG_PRODUCT4,
    description: "bebida azucarada",
    price: 16.36,
    oldPrice: 18.23,
  }, {
    name: "Sabritas",
    imageUrl: IMG_PRODUCT5,
    description: "comida salada",
    price: 35.20,
    oldPrice: 40.23,
  }];
  let products = [];
  let i;
  for (i = 0; i < productsList.length; i++) {
    products.push(
      <Container row style={{ marginLeft: 16, marginRight: 16, marginTop: 0, marginBottom: 10, height: 110, backgroundColor: theme.brandColor.iconn_white }}>
        <Container>
          <Image source={productsList[i].imageUrl} style={{ marginTop: 10, width: 80, height: 88 }} />
        </Container>
        <Container style={{ marginTop: 5 }}>
          <Container row crossCenter space='between'>
          <CustomText text={productsList[i].name}></CustomText>
            <CustomText text={"$" + productsList[i].price} fontBold></CustomText>
          </Container>
          <Container row space='between'>
            <CustomText text={"$" + productsList[i].price}></CustomText>
          </Container>
          <Container>
            <Container row space='between'>
              <Container>
                <Button fontSize="h6"
                  color="iconn_red_original"
                  size="medium"
                  transparent="true" leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} style={{ left: 5 }} />}>
                  Eliminar
                </Button>
              </Container>
              <Container space='between' crossCenter row circle style={{
                borderStartWidth: 1, borderLeftColor: theme.brandColor.iconn_grey,
                borderEndWidth: 1, borderRightColor: theme.brandColor.iconn_grey, borderTopWidth: 1, borderTopColor: theme.brandColor.iconn_grey,
                borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_grey, width:140, height:40
              }}>
                <Button
                  fontSize="h4"
                  size="small"
                  transparent="true"
                  fontBold="true"
                >
                  -
                </Button>
                <Button
                  fontSize="h6"
                  size="small"
                  transparent="true"
                  color="iconn_black_original"
                >
                  1
                </Button>
                <Button
                  fontSize="h5"
                  size="small"
                  transparent="true"
                >
                  +
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>)
  }

  const fullCart = <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_light_grey }}>
    <ScrollView bounces={false}
      style={{ flex: 1, marginTop: 0 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 1
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <Container>
        <CustomText text=''></CustomText>
        {products}
      </Container>
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
    </ScrollView>
  </Container>

  const fullCartFooter = <Container style={{ paddingLeft: 10, width: 280 }}>
    <Container row space='between'>
        <CustomText text='Subtotal:' fontSize={14}></CustomText>
        <CustomText text='$ 76.05 MXN' fontSize={18} fontBold></CustomText>
    </Container >
    <Button length="long" round fontSize="h3" fontBold onPress={onPressMyAccount}>
      Continuar
    </Button>
  </Container>

  const cart = isEmpty ? emptyCart : fullCart;
  const cartFooter = isEmpty ? emptyCartFooter : fullCartFooter;
  return (
    <Container flex crossCenter center style={{ marginTop: 34, backgroundColor: theme.fontColor.white }}>
      <Container row space='between' style={{ marginTop: 34 }}>
        <CustomText text='Mi canasta' fontBold></CustomText>
        <Button fontSize="h6" transparent="true" size='ssmall' color="iconn_black_original" marginLeft={40}>X</Button>
      </Container>
      {cart}
      <View style={styles.footer}>
        {cartFooter}
      </View>
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
