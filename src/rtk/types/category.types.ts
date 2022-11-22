import { ImageSourcePropType } from 'react-native';

export interface CategoryInterface {
  id: number;
  name: string;
  hasChildren: boolean;
  image: string;
  url: string;
  Title: string;
  MetaTagDescription: string;
  children: CategoryInterface[];
}

export interface ProductByCategoryResponseInterface {
  brand?: string;
  name?: string;
  image?: ImageSourcePropType;
  productId: string;
  categoryId: string;
}

export interface FilterSelectInterface {
  filter?: string[];
  hasMultiCheck?: boolean;
}

export type ProductsByCategoryFilter =
  | 'OrderByPriceDESC'
  | 'OrderByPriceASC'
  | 'OrderByTopSaleDESC'
  // 'OrderByReviewRateDESC' |
  // 'OrderByNameASC' |
  | 'OrderByReleaseDateDESC'
  | 'OrderByBestDiscountDESC';
// 'OrderByScoreDESC' ;
