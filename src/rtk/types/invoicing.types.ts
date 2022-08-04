export interface InvoicingProfileInterface {
  invoicing_profile_id: number;
  user_id: string;
  id_address: string;
  rfc: string;
  business_name: string;
  email: string;
  c_use_cfdi: string;
  tax_code_key: number;
  zip_code: string;
  createdat: string;
  updatedat: string;
  status: boolean;
  default: boolean;
  verified_mail: boolean;
  Address: InvoicingProfileAddress;
  Cfdi: InvoicingProfileCFDI;
  Tax_Regime: InvoicingProfileRegime;
  User: InvoicingProfileUser;
}

export interface InvoicingProfileAddress {
  id_address: number;
  street: string;
  ext_num: string;
  colony: string;
  city: string;
  state: string;
  user_id: string;
  longitude: string;
  latitude: string;
}

export interface InvoicingProfileCFDI {
  c_use_cfdi: string;
  description: string;
  applies_to_legal_persons: boolean;
  applies_to_natural_persons: boolean;
  initial_term: string;
  final_term: string;
  receiving_tax_regime: string;
  createdat: string;
  updatedat: string;
  status: boolean;
}

export interface InvoicingProfileRegime {
  tax_code_key: number;
  sat_tax_regime: string;
  createdat: string;
  updatedat: string;
  status: string;
}

export interface InvoicingProfileUser {
  user_id: string;
  name: string;
  lastName: string;
  email: string;
  telephone: string;
  birthday: string;
  gender_id: string;
  photo: string;
  termsAndConditions: boolean;
  latitude: string;
  longitude: string;
  createdat: string;
  updatedat: string;
  status: boolean;
  sign_app_modes_id: number;
  secret_key: string;
  Sign_App_Mode: {
    sign_app_modes_id: number;
    description: string;
  };
  Gender: string;
}
export interface State {
  state_id: string;
  name: string;
  status: string | null;
}
export interface City {
  cities_id: string;
  name: string;
  status: string | null;
  State: State;
}
export interface Colony {
  colonies_id: string;
  name: string;
  cities_id: string;
  zip_code: string;
  status: string | null;
  City: City;
}
