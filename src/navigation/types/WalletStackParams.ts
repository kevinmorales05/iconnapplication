import { QRInterface, ServicePaymentInterface } from 'rtk';

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
};
