import { InvoicingInterface } from 'rtk';
import { InvoicingApi } from '../http/api-invoicing';
/**
 * Function to get regimens list
 */
async function getTaxRegimeList(): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest('/taxRegime/list');
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/taxRegime/list'));
  const { data } = response;
  return data;
}

/**
 * Function to get CFDI list
 */
async function getCFDIList(): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest('/cfdi/list');
  if (response === undefined) return Promise.reject(new Error('getCFDIList:/cfdi/list'));
  const { data } = response;
  return data;
}

/**
 * Function to get postal code info
 * @param postalCode
 */
 async function getColonies(postalCode: string): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest(`/colony/list/${postalCode}`);
  if (response === undefined) return Promise.reject(new Error(`getColonies:/colony/list/${postalCode}`));
  const { data } = response;
  return data;
}

export const invoicingServices = {
  getTaxRegimeList,
  getCFDIList,
  getColonies
};
