import React, { useEffect, useState } from 'react';
import MyOrdersScreen from './MyOrdersScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { OrderInterface, RootState, useAppSelector, DeliveryChannel } from 'rtk';
import theme from 'components/theme/theme';
import { liveStatusServices, vtexOrdersServices } from 'services';
import { useLoading } from 'context';

const MyOrdersController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [lista, setLista] = useState<OrderInterface[]>([]);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const loader = useLoading();

  useEffect(() => {
    const getOrderr = async (oid: string) => {
      const { shippingData } = await vtexOrdersServices.getOrderById(oid);
      const orderDC: DeliveryChannel = shippingData.logisticsInfo[0].selectedDeliveryChannel;
      return orderDC;
    };

    const getOrders = async () => {
      const { email } = user;
      const { list: data } = await vtexOrdersServices.getOrdersListByUserEmail(email as string, 1, 3);
      let orderArray: OrderInterface[] = data.map((order: OrderInterface) => {
        return {
          orderId: order.orderId,
          creationDate: order.creationDate,
          totalValue: order.totalValue,
          status: order.status,
          orderIsComplete: order.orderIsComplete,
          totalItems: order.totalItems
        };
      });
      return orderArray;
    };

    async function AddOrderDC() {
      loader.show();
      const arr: OrderInterface[] | null | undefined = await getOrders();
      const newOrders: OrderInterface[] | undefined = [];
      for (const order of arr) {
        const dc = await getOrderr(order.orderId);
        const newOrder: OrderInterface = {
          creationDate: order.creationDate,
          orderId: order.orderId,
          orderIsComplete: order.orderIsComplete,
          status: order.status,
          totalItems: order.totalItems,
          totalValue: order.totalValue,
          deliveryChannel: dc
        };
        newOrders.push(newOrder);
      }
      setLista(newOrders);
      loader.hide();
    }

    AddOrderDC();
  }, []);

  const seeMore = async (orderId: string) => {
    const res = await liveStatusServices.getUrl(orderId);
    navigate('LiveStatusWidget', { urlLive: res.href });
    // console.log({urlSee: res});
  };

  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={true}
      backgroundColor="iconn_background"
      bottomBGColor={theme.brandColor.iconn_background}
      barStyle="dark"
      css={styles.backgroundImage}
    >
      <MyOrdersScreen seeMore={seeMore} goBack={goBack} navigate={navigate} officialOrderArray={lista} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0
  }
});

export default MyOrdersController;
