import { InvoiceGeneratedResponseInterface, InvoicingProfileInterface, ProductSearchItemInterface } from 'rtk';
import { CategoryInterface } from 'rtk/types/category.types';

export type HomeStackParams = {
  HomeStack: undefined;
  Home: undefined;
  'Mi Cuenta': undefined;
  Profile: undefined;
  EditEmail: undefined;
  EnterOtp: { email: string };
  ['Editar Contraseña']: undefined;
  InviteSignUp: undefined;
  AddRFC: undefined;
  TaxInfo: undefined;
  Invoice: undefined;
  CreateTaxProfile: undefined | InvoicingProfileInterface;
  InvoiceHistory: undefined;
  AddTicketPetro: { ticket?: any; position?: number };
  AddTicketSeven: { ticket?: any; position?: number };
  InvoiceTicketPetro: undefined;
  InvoiceTicketSeven: undefined;
  InvoiceGeneratedPetro: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  InvoiceGeneratedSeven: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  ViewInvoiceGeneratedPetro: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  ViewInvoiceGeneratedSeven: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  CodeReader: undefined;
  Address: undefined;
  ShopCart: undefined;
  PostalCode: undefined;
  SearchSeller: undefined;
  MyOrders: undefined;
  ChangedPassword: undefined;
  CategoryProducts: { category: CategoryInterface; categories: CategoryInterface[] };
  SearchProducts: undefined;
  SearchProductsResults: { products: ProductSearchItemInterface[]; textSearch: string };
};

export type HomeTabScreens = {
  HomeScreen: undefined;
  CategoriesScreen: undefined;
  PromosScreen: undefined;
  BranchesScreen: undefined;
  AccountScreen: undefined;
};
