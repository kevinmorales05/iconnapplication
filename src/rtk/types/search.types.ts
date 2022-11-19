export interface SearchItemInterface {
  items: ProductSearchItemInterface[];
  thumb: string;
  thumbUrl: string | null;
  name: string;
  criteria: string | null;
}

export interface ProductSearchItemInterface {
  productId: string;
  itemId: string;
  name: string;
  nameComplete: string;
  imageUrl: string;
}
