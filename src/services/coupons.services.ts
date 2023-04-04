import { CouponsApi } from '../http/api-coupons';

async function getPromotionsCoupons(state: string, municipality: string, page: number): Promise<any> {
  const response = await CouponsApi.getInstance().getRequest(`/promotions/list/${state}/${municipality}/${page}/10`);
  console.log('esta mandando', state, municipality, page);
  console.log('response', JSON.stringify(response, null, 3));
  const { data } = response;
  return data;
}

async function postAssignCouponUser(promotionId: number, userId: string): Promise<any> {
  const response = await CouponsApi.getInstance().postRequest(`/assign/${userId}`, {
    promotionId: promotionId
  });
  if (response === undefined) return Promise.reject(new Error('/assign/:userId'));
  const { data } = response;
  return data;
}

async function getUserCoupons(userId: string, state: string, municipality: string): Promise<any> {
  const response = await CouponsApi.getInstance().getRequest(`/list/${userId}/${state}/${municipality}/0/10`);
  console.log('response', JSON.stringify(response, null, 3));
  const { data } = response;
  return data;
}

export const citiCouponsServices = {
  getPromotionsCoupons,
  postAssignCouponUser,
  getUserCoupons
};
