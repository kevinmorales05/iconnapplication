import { InvoicingInterface } from 'rtk';
import { InvoicingApi } from '../http/api-invoicing';

/**
 * Function to validate user status
 */
async function getTaxRegimeList(): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest('/taxRegime/list');
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/taxRegime/list'));
  const { data } = response;
  return data;
}

export const invoicingServices = {
  getTaxRegimeList
};
