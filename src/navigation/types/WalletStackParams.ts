import { RechargeAmount, RechargeSupplier, ServicePaymentInterface, ServiceQRType, QRInterface } from 'rtk';

export type WalletStackParams = {
  Payback: undefined;
  PaybackHelp: any;
  Preferred: undefined;
  PreferredHelp: undefined;
  ServicePayment: undefined;
  ServicePaymentAdd: { servicePayment: ServicePaymentInterface };
  ServicePaymentGeneralInfo: undefined;
  ServicePaymentQRDetail: { qrData: QRInterface; servicePayment: ServicePaymentInterface };
  UpdatePayback: undefined | { cardIdToUpdate?: string; paybackCard?: string };
  UpdatePreferred: undefined | { cardIdToUpdate?: string; preferenteCard?: string; cardId?: string };
  WalletHome: undefined;
  Recharge: undefined;
  RechargeHelp: undefined;
  RechargeOperator: undefined | { supplierData?: RechargeSupplier; amount?: RechargeAmount };
  RechargeAmounts: undefined | { supplierData?: RechargeSupplier; selected?: RechargeAmount };
  RechargeQR: undefined | { fieldValues?: any; amount?: RechargeAmount; supplierData?: RechargeSupplier; qrData?: string } | { rechargeUser: ServiceQRType };
};
