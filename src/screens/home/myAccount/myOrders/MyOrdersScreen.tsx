import { Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container, InfoCard } from 'components/atoms';
import { TextContainer, Button } from 'components/molecules';
import { ICONN_BASKET_SHOPPING_CART } from 'assets/images';
import { OrderCard } from 'components/molecules/OrderCard';
import NetInfo from '@react-native-community/netinfo';
import { OrderInterface, RootState, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';

interface Props {
  navigate: (screen: any, params: any) => void;
  officialOrderArray: Array<OrderInterface>;
  seeMore: (orderId: string) => void;
}

const MyOrdersScreen: React.FC<Props> = ({ officialOrderArray, navigate, seeMore }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [isOnline, setIsOnline] = useState(false);
  NetInfo.fetch().then(state => {
    if (state.isInternetReachable) {
      setIsOnline(true);
    }
  });

  const insets = useSafeAreaInsets();

  const haveBeforeOrders = officialOrderArray.length && officialOrderArray.some(order => order.status === 'canceled' || order.status === 'invoiced');

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
      showsVerticalScrollIndicator={false}
    >
      {!isOnline ? (
        <></>
      ) : officialOrderArray.length === 0 ? (
        <></>
      ) : (
        officialOrderArray.map(order => {
          if (
            order.status === 'ready-for-handling' ||
            order.status === 'payment-approved' ||
            order.status === 'waiting-for-sellers-confirmation' ||
            order.status === 'payment-pending' ||
            order.status === 'window-to-cancel' ||
            order.status === 'handling'
          ) {
            return (
              <OrderCard
                qualified={order.qualified}
                orderId={order.orderId}
                creationDate={order.creationDate}
                status={order.status}
                totalItems={order.totalItems}
                totalValue={order.totalValue}
                deliveryChannel={order.deliveryChannel}
                navigate={navigate}
                seeMore={seeMore}
              />
            );
          }
        })
      )}
      {!isOnline ? (
        <></>
      ) : officialOrderArray.length === 0 ? (
        <></>
      ) : haveBeforeOrders ? (
        <TextContainer text="Pedidos anteriores" fontSize={16} fontBold marginTop={15.5} />
      ) : null}
      {!isOnline ? (
        <InfoCard text={'No podemos cargar la información,\n revisa tu conexión a intenta mas tarde.'} />
      ) : officialOrderArray.length === 0 ? (
        <Container>
          <Container center style={{ marginTop: 164.2 }}>
            <Image source={ICONN_BASKET_SHOPPING_CART} style={{ height: 40, width: 40 }} />
          </Container>
          <TextContainer marginTop={12.3} text={'No tienes pedidos'} textAlign="center" fontBold fontSize={16} />
          <TextContainer text="Aquí verás tus pedidos anteriores y pedidos en curso." textAlign="center" marginTop={11} />
          <Button
            onPress={() => {
              logEvent('ohGoCategories', {
                id: user.id,
                description: 'Ir a categorías (Aún no tienes pedidos en tu historial)'
              });
              navigate('Home', { screen: 'CategoriesScreen' });
            }}
            fontBold
            fontSize="h4"
            color="iconn_green_original"
            round
            marginTop={300}
          >
            Ver artículos
          </Button>
        </Container>
      ) : (
        officialOrderArray.map(order => {
          if (order.status === 'canceled' || order.status === 'invoiced') {
            return (
              <OrderCard
                qualified={order.qualified}
                creationDate={order.creationDate}
                totalItems={order.totalItems}
                totalValue={order.totalValue}
                status={order.status}
                orderId={order.orderId}
                deliveryChannel={order.deliveryChannel}
                navigate={navigate}
                seeMore={seeMore}
              />
            );
          }
        })
      )}
    </ScrollView>
  );
};

export default MyOrdersScreen;
