import { CouponsApi } from '../http/api-coupons';

async function getPromotionsCoupons(state: string, municipality: string, page: number, numItems: number): Promise<any> {
  const response = await CouponsApi.getInstance().getRequest(`/promotions/list/${state}/none/${page}/${numItems}`);
  //const response = await CouponsApi.getInstance().getRequest(`/promotions/list/none/none/${page}/${numItems}`);
  const { data } = response;
  return data;
}

async function postAssignCouponUser(promotionId: number, userId: string): Promise<any> {
  //console.log('maracas', userId);
  const response = await CouponsApi.getInstance().postRequest(`/assign/${userId}`, {
    promotionId: promotionId
  });
  if (response === undefined) return Promise.reject(new Error('/assign/:userId'));
  const { data } = response;
  return data;
}

async function getUserCoupons(userId: string, state: string, municipality: string): Promise<any> {
  const response = await CouponsApi.getInstance().getRequest(`/list/${userId}/${state}/none/0/10`);
  //const response = await CouponsApi.getInstance().getRequest(`/list/${userId}/none/none/0/20`);
  const { data } = response;
  return data;
}
async function getCoupon(couponId: string): Promise<any> {
  //const response = await CouponsApi.getInstance().getRequest(`/list/${userId}/${state}/${municipality}/0/10`);
  const response = await CouponsApi.getInstance().getRequest(`/${couponId}`);
  const { data } = response;
  return data;
}

export const citiCouponsServices = {
  getPromotionsCoupons,
  postAssignCouponUser,
  getUserCoupons,
  getCoupon
};
