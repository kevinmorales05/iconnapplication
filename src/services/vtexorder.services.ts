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

export const vtexordersServices = {
  getOrdersListByUserEmail
};
