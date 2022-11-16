export type CardType = 'payback' | 'preferente';
export interface PointCard {
  barCode: string;
  isActive: boolean;
  type: CardType;
  userId: string;
  id: string;
  image: any;
}

export interface ServiceType {
  icon: any;
  serviceName: string;
  onPressItem: () => void;
}

export type QRType = 'service' | 'air';
export interface ServiceQRType {
  imageURL: string;
  supplierName: string;
  isActive: boolean;
  label: string;
  reference: string;
  type: string;
  userId: string;
  amount?: number;
  qrType: QRType;
}

export interface PaymentWallet {
  paymentType: string;
  addressee: string;
  bank: string;
}

export interface RechargeSupplier {
  id: string;
  index: number;
  supplierName: string;
  type: string;
  imageURL: string;
}

export interface RechargeAmount {
  id: string;
  ammount: number;
  supplierName: string;
  productName: string;
  SKU: string;
  UPC: string;
  imageUrl: string;
  isSelected?: boolean;
}

export interface RechargeUser {
  id?: string;
  userId: string;
  type: string;
  supplierName: string;
  amount: number;
  label: string;
  referenceOrPhone: string;
  isActive: boolean;
}
