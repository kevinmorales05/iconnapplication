export type DeliveryChannel = 'delivery' | 'pickup-in-point';
type OrderStatus =
  | 'waiting-for-sellers-confirmation'
  | 'payment-pending'
  | 'payment-approved'
  | 'ready-for-handling'
  | 'handling'
  | 'invoiced'
  | 'canceled'
  | 'window-to-cancel';
export interface OrderInterface {
  deliveryChannel?: DeliveryChannel;
  status: OrderStatus;
  creationDate: string;
  orderId: string;
  totalItems: number;
  orderIsComplete?: boolean;
  totalValue: number;
  navigate: (screen: any, params: any) => void;
  seeMore?: (orderId: string) => void;
  qualified: boolean;
}
export interface OrdersListInterface {
  list: OrderInterface[];
}

export interface SingleOrderInterface {
  orderId: string;
  deliveryChannel: DeliveryChannel;
}

export interface SuggestionInterface {
  Suggestions_Type_Cat: SuggestionTypeInterface;
  description: string;
  suggestions_cat_id: number;
}

export interface SuggestionTypeInterface {
  description: string;
  suggestions_cat_id: number;
}

export interface RatingOrderInterface {
  user_id: string;
  order_id: string;
  suggestions: number[];
  score: number;
  comment: string;
}

export interface OrderWidgetInterface {
  id?: string;
  email: string;
  userId: string;
  orderFormId: string;
  orderId?: string;
  createdDate?: string;
  updatedDate?: string;
  widgetUrl?: string;
}
