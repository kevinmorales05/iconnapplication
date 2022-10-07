import React, { useCallback, useEffect, useState } from 'react';
import theme from 'components/theme/theme';
import { Container, Touchable } from 'components/atoms';
import { TextContainer } from '../TextContainer';
import { Image, StyleSheet } from 'react-native';
import { ICONN_SHOPPING_BAG, ICONN_STORE_MODERN, ICONN_ITEM_REFRESH, ICONN_LEFT_ARROW } from 'assets/images';
import Icon from 'react-native-vector-icons/Entypo';
import { DeliveryChannel, OrderInterface, RootState, useAppSelector } from 'rtk';
import { vtexsingleOrdersServices } from 'services/vtexsingleorder.services';
import { formatDate, formatDate2 } from 'utils/functions';
import { updateShoppingCart } from 'services';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { useToast } from 'context';

const OrderCard = (props: OrderInterface) => {
  const { updateShoppingCartProduct } = useShoppingCart();
  const { status, creationDate, orderId, totalItems, totalValue, deliveryChannel } = props;
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const toast = useToast();

  const newDate = (date: string) => {
    let formatDay = new Date(date);
    //console.log('HIPOPOTAMO', date);
    //console.log('CABRAS', formatDay.getDate());
    //console.log('MONOS', formatDay);
    let help: string = formatDate2(formatDay).toString();
    let halp = formatDate2(formatDay);
    /*     console.log('MANGO', halp);
     */ 
    help = help.replace('de', '');
    help = help.replace(' de', ',');
    return help;
  };
  const newMoney = (amount: number) => {
    return (amount / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  console.log('ESTE ES EL ORDER ID', orderId);
  console.log('ESTE ES EL ORDER ID', typeof orderId);
  const [delivery, setDelivery] = useState<DeliveryChannel>();

  const getOrderItems = useCallback(async () => {
    const itemsCart = cart.items;
    const data = await vtexsingleOrdersServices.getOrderById(orderId);
    const { items } = data;
    console.log('PANICO', items.length);
    items.forEach(function (item) {
      console.log('HALP', item.productId);
      console.log('CONTADOR', itemsCart.length);
      if (itemsCart.length == 0) {
        updateShoppingCartProduct('create', item.productId);
        console.log('se añadio producto');
      } else {
        updateShoppingCartProduct('add', item.productId);
        console.log('se aumento el producto');
      }
    });
    toast.show({ message: 'Se añadieron los productos al carrito', type: 'success' });
    console.log('AQUI OTOMANOS', JSON.stringify(items, null, 3));
  }, []);

  const getOrderr = useCallback(async (oid: string) => {
    const data = await vtexsingleOrdersServices.getOrderById(oid);
    console.log('AQUI JAMON', data);
    const orderDC: DeliveryChannel = data.shippingData.logisticsInfo[1].selectedDeliveryChannel;
    console.log('GELATINA', orderDC, '=>', oid);
    setDelivery(orderDC);
  }, []);

  /* const getOrder =(oid : string) => {
      //let shipping: DeliveryChannel;
      vtexsingleOrdersServices.getOrderById(oid).then(response => {
        setDelivery(response.shippingData.logisticsInfo[1].selectedDeliveryChannel);
        //shipping = response.shippingData.logisticsInfo[1].selectedDeliveryChannel;
        console.log('jumanji', response.shippingData.logisticsInfo[1].selectedDeliveryChannel, '=>' , oid );
      })
      //return shipping;
    } */

  useEffect(() => {
    const data = async (oid: string) => {
      const dc = await vtexsingleOrdersServices.getOrderById(oid);
      console.log('AQUI JAMON', data);
      const orderDC: DeliveryChannel = dc.shippingData.logisticsInfo[1].selectedDeliveryChannel;
      console.log('GELATINA', orderDC, '=>', oid);
      setDelivery(orderDC);
    };
    data(orderId);
  }, [orderId]);

  return (
    <Container style={styles.backgroundCard}>
      <Container row space="around">
        <Container style={styles.iconDelivery}>
          {delivery == 'delivery' ? (
            <Image source={ICONN_SHOPPING_BAG} style={{ height: 24, width: 24 }} />
          ) : (
            <Image source={ICONN_STORE_MODERN} style={{ height: 24, width: 24 }} />
          )}
        </Container>

        {delivery == 'delivery' ? (
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
              <TextContainer text="Preparando Pedido" marginHorizontal={16} marginVertical={8} textColor={theme.fontColor.white} fontSize={12} />
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
                marginTop={1}
                marginLeft={4}
                textColor={theme.brandColor.iconn_green_original}
                fontBold
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
                marginTop={3}
                marginRight={0}
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
    marginRight: 4,
    marginLeft: 30,
    marginTop: 4
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
    marginTop: 19
  },
  contDetails: {
    marginLeft: 8,
    marginTop: 19
  }
});

export default OrderCard;
