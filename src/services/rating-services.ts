import { RatingOrderInterface } from 'rtk';
import { RatingApi } from '../http/rating-api';

async function getSuggestionList(type: number): Promise<any> {
  const response = await RatingApi.getInstance().getRequest(`/suggestions/list/${type}`);
  const { data } = response;
  return data;
}

async function postOrderRating(rateOrder: RatingOrderInterface): Promise<any> {
  const response = await RatingApi.getInstance().postRequest('/ecommerce/create', rateOrder);
  const { data } = response;
  return data;
}

async function getQualifiedOrders(userId: string): Promise<any> {
  const response = await RatingApi.getInstance().getRequest(`/qualificatedQuestions/list/${userId}`);
  const { data } = response;
  return data;
}

export const ratingServices = {
  getSuggestionList,
  postOrderRating,
  getQualifiedOrders
};