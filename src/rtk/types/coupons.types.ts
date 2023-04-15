export interface CouponInterface {
  promotionid: number;
  descriptionc: string;
  name: string;
  imageurl: string;
  activecouponimage: string;
  listviewimage: string;
  startdate: Date;
  enddate: Date;
  establishment: 'Petro7' | '7Eleven';
  type: string;
  descriptiontyc: string;
  descriptiontitle: string;
  descriptionsubtitle: string;
}

export interface EstablishmentInterface {
  establishment_id: number;
  description: string;
}

export interface CouponTypeInterface {
  coupons_types_id: number;
  description: string;
}

export interface UserCouponInterface {
  promotionid: number;
  description: string;
  name: string;
  code: string;
  imageurl: string;
  activecouponimage: string;
  listviewimage: string;
  startdate: Date;
  enddate: Date;
  establishment: 'Petro7' | '7Eleven';
  type: string;
  descriptiontyc: string;
  descriptiontitle: string;
  descriptionsubtitle: string;
  updatedat: Date;
  coupons_status_id: number;
  redemptionDate: Date;
}

export interface UserCouponWithStateInterface {
  promotionid: number;
  description: string;
  name: string;
  code: string;
  state: number;
  imageurl: string;
  activecouponimage: string;
  listviewimage: string;
  startdate: Date;
  enddate: Date;
  establishment: 'Petro7' | '7Eleven';
  type: string;
  descriptiontyc: string;
  descriptiontitle: string;
  descriptionsubtitle: string;
}

export interface StateInterface {
  state_id: number;
  name: string;
  name_code: string;
}

export interface MunicipalityInterface {
  municipality_id: number;
  name: string;
  name_code: string;
  state_id: number;
}

export interface CouponResponseInterface {
  responseCode: number;
  responseMessage: string;
  responseSubject: string;
  messageType: string;
  transId: string;
  data: CouponInterface[];
}
