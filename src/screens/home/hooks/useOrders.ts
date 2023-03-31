import { OrderWidgetInterface, RootState, useAppSelector } from 'rtk';
import { useState } from 'react';
import { ordersServices } from 'services';
import moment from 'moment';

export const useOrders = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [orderWidgetsList, setOrderWidgetsList] = useState<OrderWidgetInterface[]>();

  const registerEmptyOrder = async (newOrderFormId: string) => {
    console.log('El nuevo orderFormId es:', newOrderFormId);
    const response = await ordersServices.registerOrderWidget({
      userId: user.userId!,
      email: user.email!,
      createdDate: moment().format(),
      orderFormId: newOrderFormId
    });
    console.log('response from db:', response);
    return response;
  };

  const getOrderWidgets = async () => {
    const { email } = user;
    const orderWidgets: OrderWidgetInterface[] = await ordersServices.getOrderWidgets(email as string, moment().format());
    setOrderWidgetsList(orderWidgets);
  };

  return { orderWidgetsList, registerEmptyOrder, getOrderWidgets };
};
