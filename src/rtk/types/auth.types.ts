import { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
}

export type SocialNetworkType = 'google' | 'apple' | 'facebook';
export type Credentials = FirebaseAuthTypes.AuthCredential | null;