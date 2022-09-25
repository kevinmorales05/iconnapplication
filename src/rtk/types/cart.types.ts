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
