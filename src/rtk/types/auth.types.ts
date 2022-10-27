import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GeoCoordinates } from 'react-native-geolocation-service';

export interface AuthDataInterface {
  accountAuthCookie?: AuthCookie;
  accountId?: string; // added from UserVtex
  addresses?: Address[];
  authCookie?: AuthCookie;
  authenticationToken?: string;
  birthDate?: string | null; // added from UserVtex. birthDate should be used only for requests that require it.
  birthday?: string;
  document?: string;
  documentType?: string;
  email?: string;
  emailVerified?: boolean;
  firstName?: string; // added from UserVtex, firstName should be used only for requests that require it.
  gender_id?: number;
  gender?: string | number;
  homePhone?: string; // added from UserVtex. homePhone should be used only for requests that require it.
  id?: string; // added from UserVtex
  isLogged?: boolean;
  lastName?: string;
  name?: string;
  new_password?: string;
  pass?: string;
  password?: string;
  photo?: string;
  profilePicture?: string; // added from UserVtex. profilePicture should be used only for requests that require it.
  secondLastName?: string;
  secretKey?: string;
  seenCarousel?: boolean;
  sign_app_modes_id?: number;
  telephone?: string;
  termsAndConditions?: boolean;
  user_id?: string; // added from UserVtex. user_id should be used only for requests that require it.
  userId?: string; // added from UserVtex (MAIN)
  cp?: string; // cp user add in postalCodeScreen
  geopoint?: GeoCoordinates; // geopoint user add in postalCodeScreen
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

export interface AuthProviderInterface {
  providerName: string;
  className: string;
  expectedContext: [];
}
