import { InvoiceGeneratedResponseInterface, InvoicingProfileInterface } from 'rtk';

export type HomeStackParams = {
  AboutUs: undefined;
  Address: undefined;
  AddRFC: undefined;
  AddTicketPetro: { ticket?: any; position?: number };
  AddTicketSeven: { ticket?: any; position?: number };
  ChangedPassword: undefined;
  Checkout: undefined;
  CodeReader: undefined;
  ContactInformation: undefined;
  CreateTaxProfile: undefined | InvoicingProfileInterface;
  EditEmail: undefined;
  EditPassword: undefined;
  EnterOtp: { email: string };
  Home: undefined;
  HomeStack: undefined;
  InviteSignUp: undefined;
  Invoice: undefined;
  InvoiceGeneratedPetro: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  InvoiceGeneratedSeven: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  InvoiceHistory: undefined;
  InvoiceTicketPetro: undefined;
  InvoiceTicketSeven: undefined;
  ImageZoom: undefined;
  Legal: undefined;
  MyAccount: undefined;
  MyOrders: undefined;
  PostalCode: undefined;
  ProductDetail: undefined;
  Profile: undefined;
  SearchSeller: undefined;
  ShopCart: undefined;
  TaxInfo: undefined;
  ViewInvoiceGeneratedPetro: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  ViewInvoiceGeneratedSeven: { invoiceGenerated: InvoiceGeneratedResponseInterface };
};

export type HomeTabScreens = {
  BranchesScreen: undefined;
  CategoriesScreen: undefined;
  HomeScreen: undefined;
  MyAccountScreen: undefined;
  PromosScreen: undefined;
};

/**   A  T   E   N   T   I   O   N
 * TO MAINTAIN ORDER PLEASE PLACE EVERYTHING IN ALPHABETICAL ORDER.
 */
