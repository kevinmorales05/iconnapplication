import { OrderWidgetInterface } from 'rtk';
import { OrdersApi } from '../http/api-orders';

/**
 * Function to register a new Orderwidget
 */
async function registerOrderWidget(orderWidget: OrderWidgetInterface): Promise<any> {
  const response = await OrdersApi.getInstance().postRequest('/orders', orderWidget);
  if (response === undefined) return Promise.reject(new Error('registerOrderWidget:/orders'));
  const { data } = response;
  return data;
}

/**
 * Function to get orderWidgets by email and device's datetime.
 */
async function getOrderWidgets(email: string, datetime: string): Promise<OrderWidgetInterface[]> {
  const response = await OrdersApi.getInstance().getRequest(`/orders/${email}/${datetime}`);
  if (response === undefined) return Promise.reject(new Error('getOrderWidgets:/orders'));
  const { data } = response;
  return data;
}

export const ordersServices = {
  registerOrderWidget,
  getOrderWidgets
};
