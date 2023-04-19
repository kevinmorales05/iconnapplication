export interface AppInterface {
  error?: string;
  internetReachability?: number;
  internetReachabilityReviewed?: number;
  visibleSearchByDistance?: boolean;
  visibleStoreSymbology?: boolean;
  state?: string;
  municipality?: string;
  latitude?: number;
  longitude?: number;
  appModules?: ModuleInterface[];
}

export type CarouselType = 'homeOptions' | 'principal' | 'second' | 'all_promotions' | 'day_promotion';
export type NavigationType = 'internal' | 'external';

export interface CarouselItem {
  id: string;
  cardNumber: string;
  description: string;
  image: string;
  link: string;
  navigationType: string;
  promotion_name: string;
  promotion_type: string;
  status: string;
  navigateTo?: string;
  promotion_title?: string;
  navigation_type?: NavigationType;
  collections_id?: number;
  products_id?: number;
}

export interface TabItem {
  id: string;
  name: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ModuleInterface {
  id: string;
  name: string;
  enabled: boolean;
  modules: SubModuleInterface[];
}

export interface SubModuleInterface {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface GeographicLocation {
  administrative_area_level_1: string;
  country: string;
  locality: string;
  political: string;
  postal_code: string;
  route: string;
  street_number: string;
}