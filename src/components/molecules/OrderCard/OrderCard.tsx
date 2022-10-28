import React, { useCallback, useEffect, useState } from 'react';
import theme from 'components/theme/theme';
import { Container, Touchable } from 'components/atoms';
import { TextContainer } from '../TextContainer';
import { Image, StyleSheet } from 'react-native';
import { ICONN_SHOPPING_BAG, ICONN_STORE_MODERN, ICONN_ITEM_REFRESH, ICONN_LEFT_ARROW } from 'assets/images';
import Icon from 'react-native-vector-icons/Entypo';
import { DeliveryChannel, messageType, OrderInterface, RootState, useAppSelector } from 'rtk';
import { vtexsingleOrdersServices } from 'services/vtexsingleorder.services';
import { formatDate, formatDate2 } from 'utils/functions';
import { updateShoppingCart } from 'services';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { useLoading, useToast } from 'context';
import { moderateScale } from 'utils/scaleMetrics';
 
const OrderCard = (props: OrderInterface) => {
  const { updateShoppingCartProduct } = useShoppingCart();
  const { status, creationDate, orderId, totalItems, totalValue, deliveryChannel, navigate} = props;
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const loader = useLoading();

  const newDate = (date: string) => {
    let formatDay = new Date(date);
    let help: string = formatDate2(formatDay).toString();
    let halp = formatDate2(formatDay);
    help = help.replace('de', '');
    help = help.replace(' de', ',');
    return help;
  };
  const newMoney = (amount: number) => {
    return (amount / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };


  const getOrderItems = useCallback(async () => {
    const itemsCart = cart.items;
    const data = await vtexsingleOrdersServices.getOrderById(orderId);
    console.log({getOrderItems: data})
    const { items } = data;
    let isAdd = false;
    let isCreate = false;
    items.forEach(async function (item) {
      if (itemsCart.length > 0) {
        itemsCart.forEach(async function (itemCart) {
          if (item.productId == itemCart.productId) {
            await updateShoppingCartProduct('add', item.productId);
            isAdd = true
          }
          else {
            await updateShoppingCartProduct('create', item.productId);
            isCreate = true
          }
        })
      } else {
        await updateShoppingCartProduct('create', item.productId);
        isCreate = true
      }
      
    });
    const messType: messageType = isAdd && !isCreate ? 'add' : (!isAdd && isCreate ? 'create' : 'create');
    loader.show();
    setTimeout(()=>{
      navigate('ShopCart', {
        messageType: messType,
        countProducts: items.length,
        cartItems: itemsCart.length
      })
      loader.hide();
    }, 3000)
    // toast.show({ message: 'Se añadieron los productos al carrito', type: 'success' });
  }, []);



  return (
    <Container style={styles.backgroundCard}>
      <Container row>
        <Container style={styles.iconDelivery}>
          {deliveryChannel == 'delivery' ? (
            <Image source={ICONN_SHOPPING_BAG} style={{ height: 24, width: 24 }} />
          ) : (
            <Image source={ICONN_STORE_MODERN} style={{ height: 24, width: 24 }} />
          )}
        </Container>

        {deliveryChannel == 'delivery' ? (
          <TextContainer text="Envío a domicilio" marginTop={16} marginLeft={8} fontBold />
        ) : (
          <TextContainer text="Pickup en tienda" fontBold marginTop={16} marginLeft={8} />
        )}
        {
          <Container
            style={
              status == 'waiting-for-sellers-confirmation' ||
              status == 'payment-pending' ||
              status == 'payment-approved' ||
              status == 'ready-for-handling' ||
              status == 'window-to-cancel' ||
              status == 'handling'
                ? styles.contInTransit
                : styles.contDelivered
            }
          >
            {status == 'waiting-for-sellers-confirmation' ||
            status == 'payment-pending' ||
            status == 'payment-approved' ||
            status == 'ready-for-handling' ||
            status == 'window-to-cancel' ? (
              <TextContainer text="En curso" marginHorizontal={16} marginVertical={8} textColor={theme.fontColor.white} fontSize={12} textAlign='center' />
            ) : status == 'handling' ? (
              <TextContainer text="Pedido enviado" marginHorizontal={16} marginVertical={8} textColor={theme.fontColor.white} fontSize={12} />
            ) : status == 'invoiced' ? (
              <TextContainer text="Entregado" marginHorizontal={16} marginVertical={8} fontSize={12} />
            ) : (
              <TextContainer text="Cancelado" marginHorizontal={16} marginVertical={8} fontSize={12} />
            )}
          </Container>
        }
      </Container>
      <Container style={{ marginLeft: 8, marginTop: 0 }}>
        <TextContainer text={newDate(creationDate)} marginLeft={40} marginTop={8} fontSize={14} />
        <TextContainer text={'Núm. de pedido: ' + orderId} marginLeft={40} marginTop={4} fontSize={12} />
        <Container row>
          {totalItems == 1 ? (
            <TextContainer text={totalItems + ' artículo'} marginLeft={40} marginTop={8} fontSize={12} />
          ) : (
            <TextContainer text={totalItems + ' artículos'} marginLeft={40} marginTop={8} fontSize={12} />
          )}
          <Icon name="dot-single" size={10} style={{ marginTop: 10, marginLeft: 1.5 }}>
            {' '}
          </Icon>
          <TextContainer text={'Total $' + newMoney(totalValue)} marginLeft={1} marginTop={8} fontSize={12} />
        </Container>
      </Container>

      {status == 'canceled' || status == 'invoiced' ? (
        <Container row space="between">
          <Touchable onPress={getOrderItems}>
            <Container row style={styles.contShopAgain}>
              <Image source={ICONN_ITEM_REFRESH} style={{ height: 24, width: 24 }} />
              <TextContainer
                text="Volver a comprar"
                fontSize={14}
                textColor={theme.brandColor.iconn_green_original}
                fontBold
                marginLeft={moderateScale(5)}
                underline
              />
            </Container>
          </Touchable>
          <Touchable onPress={() => {}}>
            <Container row style={styles.contDetails}>
              <TextContainer
                text="Ver detalles"
                fontSize={14}
                textColor={theme.brandColor.iconn_green_original}
                fontBold
                underline
              />
              <Image source={ICONN_LEFT_ARROW} style={{ height: 24, width: 24 }} />
            </Container>
          </Touchable>
        </Container>
      ) : (
        <Container row alignment="end">
          <Touchable onPress={() => {}}>
            <Container row style={styles.contDetails}>
              <TextContainer text="Ver detalles" textColor={theme.brandColor.iconn_green_original} fontBold marginTop={3} marginRight={0} underline />
              <Image source={ICONN_LEFT_ARROW} style={{ height: 24, width: 24 }} />
            </Container>
          </Touchable>
        </Container>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  backgroundCard: {
    backgroundColor: theme.brandColor.iconn_white,
    padding: 10,
    marginTop: 16,
    borderRadius: 8
  },
  iconDelivery: {
    marginTop: 12,
    marginLeft: 8
  },
  contInTransit: {
    backgroundColor: theme.brandColor.iconn_green_original,
    borderRadius: 12,
    marginTop: 4,
    position: 'absolute',
    right: 10
  },
  contDelivered: {
    backgroundColor: theme.brandColor.iconn_med_grey,
    borderRadius: 12,
    marginRight: 4,
    marginLeft: 75,
    marginTop: 4
  },
  contShopAgain: {
    marginLeft: 8,
    marginTop: 19,
    justifyContent:'center',
    alignItems:'center'
  },
  contDetails: {
    marginLeft: 8,
    marginTop: 19,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default OrderCard;

