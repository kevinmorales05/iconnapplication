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
}

export type SocialNetworkType = 'google' | 'apple' | 'facebook';
export type Credentials = FirebaseAuthTypes.AuthCredential | null;