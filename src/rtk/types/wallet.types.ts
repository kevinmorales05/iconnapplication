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
  disabled: boolean;
}

export type QRType = 'service' | 'air';
export interface ServiceQRType {
  id?: string;
  imageURL: string;
  supplierName: string;
  isActive: boolean;
  label: string;
  reference: string;
  type: string;
  userId: string;
  amount?: number;
  qrType: QRType;
  billerId?: number;
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
  amount: any;
  label: string;
  referenceOrPhone: string;
  isActive: boolean;
}
export interface WalletSliceInterface {
  prefixes?: PrefixesInterface[];
  banks?: BankInterface[];
  beneficiaries?: BeneficiaryInterface[];
  dateSync?: Date;
}

export interface PrefixesInterface {
  id: string;
  prefixe: string | null | undefined;
  type: string;
}

export interface BankInterface {
  id: string;
  name: string;
  sku: string | null | undefined;
  upc: string | null | undefined;
}

export interface BeneficiaryInterface {
  accountCard: string;
  name: string;
  tag: string;
  bank: string;
  id: string;
}

export type DeliveryStatus = 'ON_TRANSIT' | 'DELIVERED' | 'RETURNED';

export interface TrackingHistory {
  eventDateTime?: Date;
  eventDescriptionSPA?: string;
  eventPlaceName?: string;
  isLast?: boolean;
}

export interface PackageDetail {
  shortWaybillId: string;
  statusENG: DeliveryStatus;
  waybill: string;
  trackingHistory: TrackingHistory[];
}

export interface PackageVtex {
  userId: string;
  waybill: string;
  status: string;
  id: string;
}
