export interface ShoppingCartInteface {
  cart: [];
}

export interface updateShoppingCartInterface {
  orderFormId: string;
  doc: any;
}

export interface cartItemInterface {
  id: string;
  quantity: number;
  seller: string;
  index?: number;
}

export interface cartItemsRequestInterface {
  orderItems: cartItemInterface[];
}

export type messageType = 'error' | 'add' | 'create' | 'someError';

export interface ShippingDataAddress {
  addressType: undefined | string;
  receiverName: undefined | string;
  postalCode: undefined | string;
  city: undefined | string;
  state: undefined | string;
  country: undefined | string;
  street: undefined | string;
  number: undefined | string;
  neighborhood: undefined | string;
  complement: undefined | string;
  reference: undefined | string;
  geoCoordinates: number[];
}

export interface ShippingDataInfo {
  itemIndex: number;
  selectedDeliveryChannel: string;
  selectedSla: string;
}

export interface ShippingData {
  selectedAddresses: ShippingDataAddress[];
  logisticsInfo: ShippingDataInfo[];
}
