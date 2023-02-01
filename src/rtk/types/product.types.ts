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
  promotionType?: string;
  percentualDiscountValue?: number;
  maximumUnitPriceDiscount?: number;
  promotionName?: string;
  costDiscountPrice?: string;
  promotionId?: string;
}

export interface ProductResponseInterface {
  ProductId: string;
  SkuId: string;
  SubCollectionId: string;
  Position: string;
  ProductName: string;
  SkuImageUrl: string;
  qualificationAverage: number;
  sellingPrice: string;
  promotion?: PromotionCacheInterface;
  costDiscountPrice: string;
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
  ListItems: ItemsFavoritesInterface[];
  IsPublic: boolean;
  Name: string;
}

export interface ItemsFavoritesInterface {
  Id: string;
  Name: string;
}

export interface ProductsByCollectionInterface {
  collectionId: number;
  pageSize: number;
  pageNumber: number;
  selectedStore?: number;
}

export interface ProductCacheInterface {
  store: number;
  collectionId?: number;
}
export interface ProductDeatilCacheInterface {
  Name: string;
  DescriptionShort: string;
  Description: string;
  Title: string;
  average: number;
  selling_price: string;
  promotionType?: string;
  percentualDiscountValue?: number;
  maximumUnitPriceDiscount?: number;
  totalCount?: number;
  promotionName?: string;
  costDiscountPrice?: string;
}

export interface PromotionCacheInterface {
  type: string;
  percentual_discount_value: string;
  maximum_unit_price_discount: string;
  name: string;
  costDiscountPrice: string;
}

export interface ProductsBySubCategorieRequestInterface {
  categoryId: number;
  pageSize: number;
  pageNumber: number;
  subCategoryId?: number;
  storeId?: number;
}

export interface ProductsByPromotionsRequestInterface {
  pageSize: number;
  pageNumber: number;
  storeId?: number;
}

export interface ProductListCacheRequestInterface {
  products: string[];
  storeId?: number;
}

export type UpdateType = 'new' | 'update';
