import { OrdersApi } from '../http/api-orders';
import moment from 'moment'
type listOrderType = 'asc' | 'desc';
/**
 * Function to get orders list paginated and descendent order
 * the date in order to fulfill the requeriment of the last 6 months is in timestamp format.
 */
 async function getOrdersListByUserEmail(email:string, pageNumber:number, page:number, listOrder:listOrderType): Promise<any> {
    let actualDate: any = moment().format();
    let limitDate: any = moment().subtract(6, 'M').format();
    const response = await OrdersApi.getInstance().getRequest(`/?q=${email}&page=${pageNumber}&per_page=${page}&orderBy=creationDate,${listOrder}&f_creationDate=creationDate:[${limitDate} TO ${actualDate}]`);
    if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
    const { data } = response;
    console.log(actualDate)

    return data;
  }
  


export const vtexordersServices = {
    getOrdersListByUserEmail
};
