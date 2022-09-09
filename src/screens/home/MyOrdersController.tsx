import React, { useCallback, useEffect, useState } from 'react';
import MyOrdersScreen from './MyOrdersScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { OrderInterface, RootState, setIsGuest, useAppDispatch, useAppSelector } from 'rtk';
import theme from 'components/theme/theme';
import { vtexordersServices } from 'services/vtexorder.services';
import { vtexsingleOrdersServices } from 'services';



const MyOrdersController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [lista, setLista] = useState<OrderInterface[]>([
]);
const getOrders = useCallback(async () => {
  const {list : data} = await vtexordersServices.getOrdersListByUserEmail('cristhian.mendez@citi.com.mx', 1,3);
  console.log("ESTA ES LA DATA", JSON.stringify(data, null, 3));
  let orderArray : OrderInterface[] = data.map((order: OrderInterface) => {
    return {
    orderId: order.orderId,
    creationDate: order.creationDate,
    totalValue: order.totalValue,
    status: order.status,
    orderIsComplete: order.orderIsComplete,
    totalItems: order.totalItems,
    }
  })
  //console.log('Order ARRAY', orderArray);
  console.log('PRUEBA', orderArray[1].deliveryChannel);
  setLista(orderArray);
}, []);


useEffect(() => {
  getOrders();
}, [getOrders]);



  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={true}
      backgroundColor="iconn_background"
      bottomBGColor={theme.brandColor.iconn_background}
      barStyle="dark"
      css={styles.backgroundImage}
    >
      <MyOrdersScreen goBack={goBack} officialOrderArray={lista}/>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  }
});

export default MyOrdersController;