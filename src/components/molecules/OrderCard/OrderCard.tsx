import React from 'react';
import theme from 'components/theme/theme';
import { Container, Touchable } from 'components/atoms';
import { TextContainer } from '../TextContainer';
import { Image, StyleSheet } from 'react-native';
import { ICONN_SHOPPING_BAG, ICONN_STORE_MODERN, ICONN_ITEM_REFRESH, ICONN_LEFT_ARROW, ICONN_ORDERS_EVALUATE } from 'assets/images';
import Icon from 'react-native-vector-icons/Entypo';
import { messageType, OrderInterface, RootState, useAppSelector } from 'rtk';
import { vtexOrdersServices } from 'services';
import { formatDate2 } from 'utils/functions';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { useLoading } from 'context';
import { moderateScale } from 'utils/scaleMetrics';
import { Button } from 'components';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const OrderCard = (props: OrderInterface) => {
  const { updateShoppingCartProduct } = useShoppingCart();
  const { navigate: navigation } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { status, creationDate, orderId, totalItems, totalValue, deliveryChannel, navigate, seeMore, qualified } = props;
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const loader = useLoading();

  const toRate = () => {
    navigation('RateOrder', { orderId: orderId });
  };

  const newDate = (date: string) => {
    let formatDay = new Date(date);
    let help: string = formatDate2(formatDay).toString();
    help = help.replace('de', '');
    help = help.replace(' de', ',');
    return help;
  };
  const newMoney = (amount: number) => {
    return (amount / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const getOrderItems = async () => {
    const itemsCart = cart.items;
    const data = await vtexOrdersServices.getOrderById(orderId);
    const { items } = data;
    let isAdd = false;
    let isCreate = false;
    items.forEach(async function (item) {
      if (itemsCart.length > 0) {
        itemsCart.forEach(async function (itemCart) {
          if (item.productId == itemCart.productId) {
            await updateShoppingCartProduct('add', item.productId);
            isAdd = true;
          } else {
            await updateShoppingCartProduct('create', item.productId);
            isCreate = true;
          }
        });
      } else {
        await updateShoppingCartProduct('create', item.productId);
        isCreate = true;
      }
    });
    const messType: messageType = isAdd && !isCreate ? 'add' : 'create';
    loader.show();
    setTimeout(() => {
      navigate('ShopCart', {
        messageType: messType,
        countProducts: items.length,
        cartItems: itemsCart.length
      });
      loader.hide();
    }, 3000);
    // toast.show({ message: 'Se añadieron los productos al carrito', type: 'success' });
  };

  return (
    <Container style={styles.backgroundCard}>
      <Container row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
        <Container style={styles.iconDelivery}>
          {deliveryChannel === 'delivery' ? (
            <Image source={ICONN_SHOPPING_BAG} style={{ height: 24, width: 24 }} />
          ) : (
            <Image source={ICONN_STORE_MODERN} style={{ height: 24, width: 24 }} />
          )}
        </Container>

        {deliveryChannel === 'delivery' ? (
          <TextContainer text="Envío a domicilio" marginLeft={8} marginTop={8} fontBold />
        ) : (
          <TextContainer text="Pickup en tienda" fontBold marginLeft={8} marginTop={8} />
        )}
        {
          <Container
            style={
              status === 'waiting-for-sellers-confirmation' ||
              status === 'payment-pending' ||
              status === 'payment-approved' ||
              status === 'ready-for-handling' ||
              status === 'window-to-cancel' ||
              status === 'handling'
                ? styles.contInTransit
                : styles.contDelivered
            }
          >
            {status === 'waiting-for-sellers-confirmation' ||
            status === 'payment-pending' ||
            status === 'payment-approved' ||
            status === 'ready-for-handling' ||
            status === 'window-to-cancel' ? (
              <TextContainer text="En curso" marginHorizontal={16} marginVertical={8} textColor={theme.fontColor.white} fontSize={12} textAlign="center" />
            ) : status === 'handling' ? (
              <TextContainer text="Pedido enviado" marginHorizontal={16} marginVertical={8} textColor={theme.fontColor.white} fontSize={12} />
            ) : status === 'invoiced' ? (
              <TextContainer text="Entregado" marginHorizontal={16} marginVertical={8} fontSize={12} />
            ) : (
              <TextContainer text="Cancelado" marginHorizontal={16} marginVertical={8} fontSize={12} />
            )}
          </Container>
        }
      </Container>
      <Container style={{ marginTop: 0 }}>
        <TextContainer text={newDate(creationDate)} marginLeft={40} marginTop={8} fontSize={14} />
        <TextContainer text={'Núm. de pedido: ' + orderId} marginLeft={40} marginTop={4} fontSize={12} />
        <Container row>
          {totalItems === 1 ? (
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

      {status === 'canceled' || status === 'invoiced' ? (
        <Container>
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
            <Touchable
              onPress={() => {
                seeMore(orderId);
              }}
            >
              <Container row style={styles.contDetails}>
                <TextContainer text="Ver detalles" fontSize={14} textColor={theme.brandColor.iconn_green_original} fontBold underline />
                <Image source={ICONN_LEFT_ARROW} style={{ height: 24, width: 24 }} />
              </Container>
            </Touchable>
          </Container>
          {qualified && qualified === true ? (
            <></>
          ) : (
            <Button
              color="iconn_white"
              borderColor="iconn_med_grey"
              fontColor="paragraph"
              fontBold
              fontSize="h5"
              marginTop={20}
              icon={<Image source={ICONN_ORDERS_EVALUATE} style={{ height: 20, width: 20, marginRight: -10 }} resizeMode="contain" />}
              round
              onPress={toRate}
            >
              Evaluar compra
            </Button>
          )}
        </Container>
      ) : (
        <Container row alignment="end">
          <Touchable
            onPress={() => {
              seeMore(orderId);
            }}
          >
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
    marginLeft: 8,
    marginTop: 8
  },
  contInTransit: {
    backgroundColor: theme.brandColor.iconn_green_original,
    borderRadius: 12,
    position: 'absolute',
    right: 5,
    top: 5
  },
  contDelivered: {
    backgroundColor: theme.brandColor.iconn_med_grey,
    borderRadius: 12,
    position: 'absolute',
    right: 5,
    top: 5
  },
  contShopAgain: {
    marginLeft: 8,
    marginTop: 19,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contDetails: {
    marginLeft: 8,
    marginTop: 19,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrderCard;
