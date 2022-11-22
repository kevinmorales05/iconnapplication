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
  id: string;
  updatedAt: string;
}

export interface QRDepositInterface {
  accountCard: string;
  name: string;
  id: string;
  tag: string;
  bank: string;
  qrCode: string;
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
