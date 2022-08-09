import { InvoicingProfileInterface } from "rtk";

export type HomeStackParams = {
  HomeStack: undefined;
  Home: undefined;
  'Mi Cuenta': undefined;
  Profile: undefined;
  EditEmail: undefined;
  EnterOtp: { email: string };
  ["Editar Contraseña"]: undefined;
  InviteSignUp: undefined;
  AddRFC: undefined;
  TaxInfo: undefined;
  Invoice: undefined;
  CreateTaxProfile: undefined | InvoicingProfileInterface;
  AddTicketPetro: undefined;
  AddTicketSeven: undefined;
};
