import { VtexApi } from '../http/vtex-api';

/**
 * Function to get orders list paginated and descendent order
 * the date in order to fulfill the requeriment of the last 6 months is in timestamp format.
 */
async function getOrdersListByUserEmail(email: string, pageNumber: number, page: number): Promise<any> {
  const response = await VtexApi.getInstance().getRequest(`/api/oms/pvt/orders?page=${pageNumber}&per_page=${page}0&orderBy=creationDate&q=${email}`);
  if (response === undefined) return Promise.reject(new Error('getOrdersListByUserEmail'));
  const { data } = response;
  return data;
}

/**
 * Get order's detail.
 * @param orderId
 * @returns
 */
async function getOrderById(orderId: string): Promise<any> {
  const response = await VtexApi.getInstance().getRequest(`/api/orders/pvt/document/${orderId}?reason=data-validation`);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  return data;
}

export const vtexOrdersServices = {
  getOrdersListByUserEmail,
  getOrderById
};
