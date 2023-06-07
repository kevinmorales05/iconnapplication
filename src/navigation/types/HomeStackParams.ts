import { HistoryServices, InvoiceGeneratedResponseInterface, InvoicingProfileInterface, messageType, ProductSearchItemInterface, SuggestionInterface } from 'rtk';
import { LitresPromoInterface } from 'rtk/types/accumulate.types';
import { CategoryInterface } from 'rtk/types/category.types';
import { CouponInterface, UserCouponInterface } from 'rtk/types/coupons.types';

export type HomeStackParams = {
  AboutUs: undefined;
  AccumulateCoffee: undefined;
  AccumulateLitres: undefined;
  Address: undefined;
  AddRFC: undefined;
  AddTicketLitres: undefined;
  AddTicketPetro: { ticket?: any; position?: number };
  AddTicketSeven: { ticket?: any; position?: number };
  ChangePassword: { authenticationToken: string; variant?: 'register' | 'recoverPassword' };
  ChangedPassword: undefined;
  Checkout: undefined;
  CodeReader: { navigationDestiny?: string };
  ContactInformation: undefined;
  CommentOrder: { rating: number; orderId: string; suggestions: SuggestionInterface[] };
  CreateTaxProfile: undefined | InvoicingProfileInterface;
  EditEmail: undefined;
  EditPassword: undefined;
  EnterOtp: { email: string };
  Home: { paySuccess: boolean };
  HomeStack: undefined;
  HelpQuestions: undefined | { moduleId?: string; moduleName?: string };
  InConstruction: undefined;
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
  OtherProducts: undefined;
  PostalCode: undefined;
  ProductDetail: undefined | { productIdentifier?: string };
  Profile: undefined;
  PromoDetailLitres: { promo: LitresPromoInterface };
  RateOrder: { orderId: string };
  RecomendedForYou: undefined;
  SearchSeller: undefined;
  HelpSteps: undefined | { moduleId?: string; moduleName?: string; questionId?: string; question?: string };
  SeeMore: { products: any };
  CategoryProducts: { category: CategoryInterface; categories: CategoryInterface[] };
  SearchProducts: undefined;
  SearchProductsResults: { products: ProductSearchItemInterface[]; textSearch: string };
  ShopCart: { messageType?: messageType | string; countProducts?: number; cartItems?: number };
  TaxInfo: undefined;
  ViewInvoiceGeneratedPetro: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  ViewInvoiceGeneratedSeven: { invoiceGenerated: InvoiceGeneratedResponseInterface };
  FavoriteProducts: undefined;
  InitialPage: undefined;
  WalletStack: undefined;
  LiveStatusWidget: { urlLive: string };
  Branches: undefined;
  EvaluateStack: { barcode?: string };
  HelpItems: { flagError: string };
  VirtualTour: { step: number };
  AboutOptions: undefined;
  CollectionsProducts: { collectionId: number; title: string };
  Coupons: undefined;
  CouponDetail: { couponInfo: UserCouponInterface; origin: 'Home' | 'Coupons' };
  ActivatedCoupon: { couponInfo: UserCouponInterface; couponActivatedData: any; origin: 'Home' | 'Coupons' };
  HomeServices: undefined;
  ServicesCategories: undefined;
  SearchScreenService: { type: SearchServicesType };
  PayRecharge: undefined;
  AmountRecharge: undefined;
  OptionsPay: undefined;
  ConfirmPay: undefined;
  SuccesPay: undefined;
  TicketPay: { service?: HistoryServices };
};

export type SearchServicesType = 'services' | 'recharge' | 'others'

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
