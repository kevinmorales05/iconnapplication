export interface ReviewInterface {
    productId: number,
    rating: number,
    title?: string,
    text?: string,
    reviewerName?: string,
    approved?: boolean,
    verifiedPurchaser?: boolean
  }