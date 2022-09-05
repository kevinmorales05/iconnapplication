import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface AuthDataInterface {
  user_id?: string;
  email?: string;
  name?: string;
  lastName?: string;
  secondLastName?: string;
  pass?: string;
  secretKey?: string;
  termsAndConditions?: boolean;
  isLogged?: boolean;
  sign_app_modes_id?: number;
  photo?: string;
  emailVerified?: boolean;
  telephone?: string;
  birthday?: string;
  gender_id?: number;
  gender?: string | number;
  password?: string;
  new_password?: string;
  addresses: Address[];
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
