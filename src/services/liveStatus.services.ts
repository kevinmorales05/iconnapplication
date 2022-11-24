import { LiveStatusApi } from '../http/liveStatus-api';
/**
 * Function to get all categories with childrens.
 */
async function getUrl(orderId: string): Promise<any> {
  const response = await LiveStatusApi.getInstance().getRequest(`/orders-fulfillment-ecommerce/v1/orders/${orderId}/tracking`);
  const { data } = response;
  return data;
}

export const liveStatusServices = {
  getUrl
};
