import { ImageSourcePropType } from 'react-native';

/**
 * Model used for each service payment. i.e: Sky, Megacable, etc.
 */
export interface ServicePaymentInterface {
  billerId: string;
  helpImageURL: ImageSourcePropType;
  imageURL: string;
  index: number;
  isActive: boolean;
  maxLength: number;
  minLength: number;
  SKU: string;
  slug: string;
  supplierName: string;
  UPC: string;
}

export interface ServiceInterface {
  alias: string;
  balance: string;
  contractNumber: string;
  expirationDate: string;
}
