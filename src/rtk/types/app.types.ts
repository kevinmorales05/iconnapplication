import { ImageSourcePropType } from 'react-native';

export interface AppInterface {
  error?: string;
  internetReachability?: number;
  internetReachabilityReviewed?: number;
}

export type PromotionType = 'principal' | 'second' | 'all_promotions' | 'day_promotion';
export type NavigationType = 'internal' | 'external';

export interface CarouselItem {
  id: string;
  description: string;
  image: string;
  link: string;
  navigationType: string;
  promotion_name: string;
  promotion_type: string;
  status: string;
}
