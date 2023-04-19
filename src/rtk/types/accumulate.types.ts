import { ImageSourcePropType } from 'react-native';

export interface LitresPromoInterface {
  id: string;
  picture: ImageSourcePropType;
  name: string;
  expiry: string;
  costLitres: number;
  status?: LitresPromoStatus;
}

export type LitresPromoStatus = 'REDIMIDO' | 'EXPIRADO' | 'ACTIVO';
