import { ImageSourcePropType } from 'react-native';

export interface ProductInterface {
  ratingValue?: number;
  price?: number;
  name?: string;
  image?: ImageSourcePropType;
  quantity?: number;
  productId: string;
  oldPrice?: number;
  porcentDiscount?: number;
  isFavorite?: boolean;
  category?: string;
}

export interface ProductResponseInterface {
  ProductId: string;
  SkuId: string;
  SubCollectionId: string;
  Position: string;
  ProductName: string;
  SkuImageUrl: string;
}
export interface ProductRaitingResponseInterface {
  average: number;
  totalCount: number;
}
export interface ProductPriceResponseInterface {
  itemId: string;
  listPrice: number;
  costPrice: number;
  markup: number;
  basePrice: number;
  fixedPrices: [];
}

export interface ExistingProductInCartInterface {
  itemId: string;
  quantity?: number;
}

export interface FavoritesResponseInterface {
  id: string;
  email: string;
  ListItemsWrapper: ListItemsWrapperInterface[];
}

export interface NewFavoritesResponseInterface {
  email: string;
  ListItemsWrapper: ListItemsWrapperInterface[];
}

export interface ListItemsWrapperInterface {
  ListItems: ItemsFavoritesInterface[],
  IsPublic: boolean,
  Name: string,
}

export interface ItemsFavoritesInterface {
  Id: string,
  Name: string,
}

export type UpdateType = 'new' | 'update';
