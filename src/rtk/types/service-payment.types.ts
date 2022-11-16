import { ImageSourcePropType } from 'react-native';

/**
 * Model used for each service payment. i.e: Sky, Megacable, etc.
 */
export interface ServicePaymentInterface {
  billerId: number;
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

export interface QRInterface {
  alias: string;
  balance: string;
  billId: string;
  contractNumber: string;
  expirationDate: string;
  updatedAt: string;
}

export interface ServiceRequestInterface {
  account_number: string;
  biller_id: number;
}

export interface ServiceInterface {
  billId: string;
  label: string;
  reference: string;
  type: string;
  userId: string;
}
