type DeliveryChannel = 'delivery' | 'pickup-in-point';
type OrderStatus = 'waiting-for-sellers-confirmation' | 'payment-pending' | 'payment-approved' | 'ready-for-handling' | 'handling' | 'invoiced' | 'canceled' | 'window-to-cancel';
export interface OrderInterface {
  deliveryChannel?: DeliveryChannel;
  status: OrderStatus;
  creationDate: string;
  orderId: string;
  totalItems: number;
  orderIsComplete: boolean;
  totalValue: number;
}
export interface OrdersListInterface {
  list: OrderInterface[],
}

export interface SingleOrderInterface {
    orderId: string;
    deliveryChannel: DeliveryChannel;
}
