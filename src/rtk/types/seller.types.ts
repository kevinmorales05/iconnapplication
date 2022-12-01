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

export type PointType = 'binomial' | 'petro' | 'seven';

export interface PointInterface {
  id: number;
  isActive: boolean;
  isUpdated: boolean;
  type: PointType;
  latitude: number;
  longitude: number;
  googleMapsLink: string;
  address: string;
  postalCode: number;
  mallNumber: number;
  shopName: string;
  shopNumber: number;
  info: object;
}
