/**
 * Model used for each service payment. i.e: Sky, Megacable, etc.
 */
export interface ServicePaymentInterface {
  helpImageURL: string;
  imageURL: string;
  isActive: boolean;
  SKU: string;
  slug: string;
  supplierName: string;
  UPC: string;
}

export interface ServiceInterface {
  alias: string;
  balance: string;
  expiration_date: string;
  number: string;
}
