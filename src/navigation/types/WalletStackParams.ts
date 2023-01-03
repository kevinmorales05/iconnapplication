import { RechargeAmount, RechargeSupplier, ServicePaymentInterface, ServiceQRType, QRInterface, BeneficiaryInterface, PackageVtex } from 'rtk';

export type WalletStackParams = {
  CodeReader: { navigationDestiny?: string };
  PackageDetail: undefined | { packageData: string; packageVtex: PackageVtex };
  PackageHelp: undefined;
  Payback: undefined;
  PaybackHelp: any;
  Preferred: undefined;
  PreferredHelp: undefined;
  Recharge: undefined;
  RechargeAmounts:
    | undefined
    | { supplierData?: RechargeSupplier; selected?: RechargeAmount; type?: 'new' | 'edit' }
    | { rechargeUser?: ServiceQRType; selected?: RechargeAmount; type?: 'new' | 'edit' };
  RechargeEdit:
    | undefined
    | { supplierData?: RechargeSupplier; amount?: RechargeAmount; fields?: any; rechargeQRId?: string }
    | { rechargeUser: ServiceQRType; qrData?: string; amount?: RechargeAmount };
  RechargeHelp: undefined;
  RechargeOperator: undefined | { supplierData?: RechargeSupplier; amount?: RechargeAmount };
  RechargeQR:
    | undefined
    | { fieldValues?: any; amount?: RechargeAmount; supplierData?: RechargeSupplier; qrData?: string; rechargeQRId?: string }
    | { rechargeUser: ServiceQRType; qrData?: string; amount?: RechargeAmount };
  ServicePayment: undefined;
  ServicePaymentAdd: { servicePayment: ServicePaymentInterface };
  ServicePaymentEdit: { qrData: QRInterface; servicePayment: ServicePaymentInterface };
  ServicePaymentGeneralInfo: undefined;
  ServicePaymentQRDetail: { qrData: QRInterface; servicePayment: ServicePaymentInterface };
  Tracking: undefined | { barcode?: string };
  UpdatePayback: undefined | { cardIdToUpdate?: string; paybackCard?: string };
  UpdatePreferred: undefined | { cardIdToUpdate?: string; preferenteCard?: string; cardId?: string };
  WalletHome: undefined | { toastState: string };
  DepositWallet: { beneficiary: BeneficiaryInterface };
  ServicePaymentQRDetailDepositController: { beneficiary: BeneficiaryInterface; toastState: string };
};
