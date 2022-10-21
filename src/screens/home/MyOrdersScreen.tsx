import { Image, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container, InfoCard } from 'components/atoms';
import { TextContainer, Button } from 'components/molecules';
import { ICONN_BASKET_SHOPPING_CART } from 'assets/images';
import { OrderCard } from 'components/molecules/OrderCard';
import NetInfo from '@react-native-community/netinfo';
import { vtexordersServices, vtexsingleOrdersServices } from 'services';
import { DeliveryChannel, OrderInterface } from 'rtk';

interface Props {
  goBack: () => void;
  officialOrderArray: Array<OrderInterface>;
}

const MyOrdersScreen: React.FC<Props> = ({ goBack, officialOrderArray }) => {
  const [isOnline, setIsOnline] = useState(false);
  NetInfo.fetch().then(state => {
    if (state.isInternetReachable) {
      setIsOnline(true);
    }
  });
  const insets = useSafeAreaInsets();


  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        marginLeft: insets.left,
        backgroundColor: theme.brandColor.iconn_background,
        width: '100%'
      }}
    >

      {!isOnline ? (
        <></>
      ) : officialOrderArray.length == 0 ? (
        <></>
      ) : (
        officialOrderArray.map((order, i) => {
          const dc = order.orderId;
          if (
            order.status == 'ready-for-handling' ||
            order.status == 'payment-approved' ||
            order.status == 'waiting-for-sellers-confirmation' ||
            order.status == 'payment-pending' ||
            order.status == 'window-to-cancel' ||
            order.status == 'handling'
          ) {
            console.log('MERMELADA', order.orderId);
            return (
              <OrderCard
                orderId={order.orderId}
                creationDate={order.creationDate}
                status={order.status}
                totalItems={order.totalItems}
                totalValue={order.totalValue}
                deliveryChannel={order.deliveryChannel}
              />
            );
          }
        })
      )}
      {!isOnline ? <></> : officialOrderArray.length == 0 ? <></> : <TextContainer text="Pedidos anteriores" fontSize={16} fontBold marginTop={15.5} />}
      {!isOnline ? (
        <InfoCard text={`No podemos cargar la información,\n revisa tu conexión a intenta mas tarde.`} />
      ) : officialOrderArray.length == 0 ? (
        <Container>
          <Container center style={{ marginTop: 164.2 }}>
            <Image source={ICONN_BASKET_SHOPPING_CART} style={{ height: 40, width: 40 }}></Image>
          </Container>
          <TextContainer marginTop={12.3} text={'No tienes pedidos'} textAlign="center" fontBold fontSize={16} />
          <TextContainer text="Aquí verás tus pedidos anteriores y pedidos en curso." textAlign="center" marginTop={11} />
          <Button onPress={goBack} fontBold fontSize="h4" color="iconn_green_original" round marginTop={234}>
            Ver articulos
          </Button>
        </Container>
      ) : (
        officialOrderArray.map((order, i) => {
          if (order.status == 'canceled' || order.status == 'invoiced')
            return (
              <OrderCard
                creationDate={order.creationDate}
                totalItems={order.totalItems}
                totalValue={order.totalValue}
                status={order.status}
                orderId={order.orderId}
                deliveryChannel={order.deliveryChannel}
              />
            );
        })
      )}
    </ScrollView>
  );
};

export default MyOrdersScreen;
