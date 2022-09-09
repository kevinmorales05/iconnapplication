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
  let orderArray : OrderInterface[] = data.map((order) => {
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

const getOrder= async (id :string) : string => {
  const {shippingData : data} = await vtexsingleOrdersServices.getOrderById(id);
  const delCha = data;
  // console.log('PAPAS', JSON.stringify(delCha, null, 3) );
  console.log('PAPAS', delCha.logisticsInfo[1].selectedDeliveryChannel);
  const channel: string = delCha.logisticsInfo[1].selectedDeliveryChannel;
  console.log('CAMOTES', channel);
  return channel;
}
/* const getOrder= (id : string) : string => {
  vtexsingleOrdersServices.getOrderById(id).then((value) => {
  const order = value;
  console.log('PAPAS', order.shippingData.logisticsInfo[1].selectedDeliveryChannel);
  const channel: string = order.shippingData.logisticsInfo[1].selectedDeliveryChannel;
  console.log('CAMOTES', channel);
  return channel;
  });
} */

useEffect(() => {
  getOrders();
}, [getOrders]);

/* useEffect(() => {
  if(lista) console.log('Lista dentro del USEEFFECT',lista);
}, [lista]) */


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