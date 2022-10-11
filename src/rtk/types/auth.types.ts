import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  document: string;
  documentType: any;
  homePhone: string;
  isCorporate: boolean;
  corporateDocument: any;
  tradeName: any;
  stateRegistration: any;
  isNewsletterOptIn: boolean;
  localeDefault: string;
  approved: any;
}

export interface AuthDataInterface {
  accountAuthCookie?: AuthCookie;
  accountId?: string; // added from UserVtex
  addresses?: Address[];
  authCookie?: AuthCookie;
  birthDate?: string | null; // added from UserVtex. birthDate should be unused.
  birthday?: string;
  document?: string;
  documentType?: string;
  email?: string;
  emailVerified?: boolean;
  firstName?: string; // added from UserVtex, please change name instead of firstName. firstName should be unused.
  gender_id?: number;
  gender?: string | number;
  homePhone?: string; // added from UserVtex. homePhone should be unused.
  id?: string; // added from UserVtex
  isLogged?: boolean;
  lastName?: string;
  name?: string;
  new_password?: string;
  pass?: string;
  password?: string;
  photo?: string;
  profilePicture?: string; // added from UserVtex. profilePicture should be unused.
  secondLastName?: string;
  secretKey?: string;
  seenCarousel?: boolean;
  sign_app_modes_id?: number;
  telephone?: string;
  termsAndConditions?: boolean;
  userId?: string; // added from UserVtex (MAIN).
}

export type SocialNetworkType = 'google' | 'apple' | 'facebook';
export type Credentials = FirebaseAuthTypes.AuthCredential | null;

export interface Address {
  addressName?: string;
  addressType?: string;
  city?: string;
  complement?: string;
  country?: string;
  countryfake?: string;
  geoCoordinate?: string;
  neighborhood?: string;
  number?: string;
  postalCode?: string;
  receiverName?: string;
  reference?: string;
  state?: string;
  street?: string;
  userId?: string;
  id?: string;
  accountId?: string;
  accountName?: string;
  dataEntityId?: string;
  createdBy?: string;
  createdIn?: string;
  updatedBy?: string;
  updatedIn?: string;
  lastInteractionBy?: string;
  lastInteractionIn?: string;
  followers?: string[];
  tag?: string;
  auto_filter?: string;
  isDefault?: boolean;
}

export interface PostalCodeInfo {
  postalCode: string;
  city: string;
  state: string;
  country: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  reference: string;
  geoCoordinates: number[];
}

export interface AddressWithPositionInterface {
  position: number;
  address: Address;
}

export interface AuthCookie {
  Name: string;
  Value: string;
}

export interface ClientProfileDataInterface {
  email?: string;
  firstName?: string;
  lastName?: string;
  documentType?: string;
  document?: string;
  phone?: string;
  corporateName?: string;
  tradeName?: string;
  corporateDocument?: string;
  stateInscription?: string;
  corporatePhone?: string;
  isCorporate?: boolean;
}

export interface ClientProfileDataWithOrderFormInterface {
  orderFormId: string;
  clientProfileData: ClientProfileDataInterface;
}
