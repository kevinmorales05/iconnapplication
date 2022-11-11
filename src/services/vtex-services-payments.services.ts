import { VtexApi } from '../http/vtex-api';

/**
 * Function to get services payments list
 */
async function getServicesPayments(): Promise<any> {
  // TODO: change "search" by scroll.
  const response = await VtexApi.getInstance().getRequest('/api/dataentities/AS/search?_fields=name,slug,isActive,supplierName,helpImageURL,SKU,UPC,imageURL');
  if (response === undefined) return Promise.reject(new Error('getServicesPayments'));
  const { data } = response;
  return data;
}

export const vtexServicesPayments = {
  getServicesPayments
};
