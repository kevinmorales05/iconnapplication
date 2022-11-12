export type CardType = 'payback' | 'preferente';
export interface PointCard {
  barCode: string;
  isActive: boolean;
  type: CardType;
  userId: string;
  id: string;
  image: any;
};

export interface ServiceType {
  icon: any;
  serviceName: string;
  onPressItem: () => void;
};

export type QRType = 'service' | 'recharge';
export interface ServiceQRType {
    imageURL: string,
    supplierName: string,
    isActive: boolean,
    label: string,
    reference: string,
    type: string,
    userId: string,
    qrType: QRType
}


export interface PaymentWallet {
  paymentType: string;
  addressee: string;
  bank: string;
};

