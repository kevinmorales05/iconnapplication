import { OrdersApi } from '../http/api-orders';

/**
 * Function to get orders list paginated and descendent order
 * the date in order to fulfill the requeriment of the last 6 months is in timestamp format.
 */
async function getOrdersListByUserEmail(email: string, pageNumber: number, page: number): Promise<any> {
  const response = await OrdersApi.getInstance().getRequest(`?page=${pageNumber}&per_page=${page}0&orderBy=creationDate&q=${email}`);
  if (response === undefined) return Promise.reject(new Error('getOrdersListByUserEmail'));
  console.log('Aqui termina el GETORDERLIST');
  const { data } = response;
  return data;
}

export const vtexordersServices = {
  getOrdersListByUserEmail
};
