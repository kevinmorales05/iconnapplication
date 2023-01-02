export interface SellerInterface {
  seller: string;
  '# Division': number | string;
  Division: string;
  '# Plaza': number | string;
  Plaza: string;
  Mercado: number | string;
  Campo: number | string;
  '# Tienda': number | string;
  Tienda: string | any[];
  'Fecha Apertura': string;
  'Formato Tienda': string;
  Latitud: number | string;
  Longitud: number | string;
  'Google Maps': string;
  'Código postal': number | string;
  Domicilio: string;
  'Estación de servicio': string;
  ATM: string;
  Slurpee: string;
  'Bake in Store': string;
  'Pizza / Turbochef': string;
  distance?: number;
  VTEX_APPKEY?: string;
  VTEX_APPTOKEN?: string;
}

export type PointType = 'binomial' | 'petro' | '7eleven';

export interface PointInfoNode {
  isActive: boolean;
  type: string;
  icon: string;
  slug: string;
  index: number;
}

/**
 * Used to manage the map and list views with the markers of iconn stores.
 */
export interface PointInterface {
  address: string;
  googleMapsLink: string;
  id: number;
  info: {
    seven: {
      food: PointInfoNode[];
      others: PointInfoNode[];
      extra: PointInfoNode[];
    };
    petro: {
      complementaryProducts: PointInfoNode[];
      others: PointInfoNode[];
      payMethods: PointInfoNode[];
      evouchers: PointInfoNode[];
      benefits: PointInfoNode[];
    };
  };
  isActive: boolean;
  isUpdated: boolean;
  kmDistance: string;
  latitude: number;
  longitude: number;
  mallNumber: number;
  postalCode: number;
  shopName: string;
  shopNumber: number;
  type: PointType;
}

/**
 * Used to manage the search based on the filtering given by the user.
 */
export interface PointFilteringDetailInterface {
  info_binomial: boolean;
  info_petro_benefits_carWashing: boolean;
  info_petro_benefits_cinemaOrCombos: boolean;
  info_petro_complementaryProducts_oil: boolean;
  info_petro_complementaryProducts_urea: boolean;
  info_petro_evouchers_carnet: boolean;
  info_petro_evouchers_edenred: boolean;
  info_petro_evouchers_sivale: boolean;
  info_petro_others_7eleven: boolean;
  info_petro_others_parking: boolean;
  info_petro_others_restroom: boolean;
  info_petro_payMethods_applePay: boolean;
  info_petro_payMethods_cards: boolean;
  info_petro_payMethods_contacLess: boolean;
  info_petro_payMethods_dollars: boolean;
  info_petro: boolean;
  info_seven_extra_pokemon: boolean;
  info_seven_food_bakeInStore: boolean;
  info_seven_food_foodArea: boolean;
  info_seven_food_PizzaTurbochef: boolean;
  info_seven_food_Taquiza: boolean;
  info_seven_others_atm: boolean;
  info_seven_others_drive_thru: boolean;
  info_seven_others_gas: boolean;
  info_seven_others_wifi: boolean;
  info_seven: boolean;
}

export type PointDisplayMode = 'map' | 'list';
