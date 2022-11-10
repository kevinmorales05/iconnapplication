export type WalletStackParams = {
  ServicePayment: undefined;
  ServicePaymentGeneralInfo: undefined;
  WalletHome: undefined;
  Preferred: undefined;
  UpdatePreferred: undefined | { cardIdToUpdate?: string, preferenteCard?: string, cardId?: string };
  PreferredHelp: undefined;
  Payback: undefined;
  PaybackHelp: any;
  UpdatePayback: undefined | { cardIdToUpdate?: string, paybackCard?: string };
  
};
