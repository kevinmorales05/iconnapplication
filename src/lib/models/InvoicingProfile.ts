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

export interface Address {
  street: string;
  ext_num: string;
  colony: string;
  city: string;
  state: string;
}

export interface InvoicingProfile {
  user_id: string;
  rfc: string;
  business_name: string;
  email: string;
  c_use_cfdi: string;
  tax_code_key: number;
  zip_code: number;
  address: Address;
}
