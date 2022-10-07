export interface postReviewInterface {
  productId: string,
  rating: number,
  title: string,
  text: string,
  reviewerName: string,
  approved: boolean,
  verifiedPurchaser?: boolean
}

export interface reviewListInterface {
  from?:number,
  to?:number,
  id:number
}

export interface reviewObjectInterface {
  average?:number,
  totalReviews?:number,
  oneStar?:number,
  twoStar?:number,
  threeStar?:number,
  fourStar?:number,
  fiveStar?:number
}
