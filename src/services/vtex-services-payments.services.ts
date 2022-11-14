import { VtexApi } from '../http/vtex-api';

/**
 * Function to get services payments list
 */
async function getServicesPayments(): Promise<any> {
  // TODO: change "search" by scroll.
  const response = await VtexApi.getInstance().getRequest(
    '/api/dataentities/AS/search?_fields=billerId,helpImageURL,imageURL,index,isActive,maxLength,minLength,name,SKU,slug,supplierName,UPC'
  );
  if (response === undefined) return Promise.reject(new Error('getServicesPayments'));
  const { data } = response;
  return data;
}

export const vtexServicesPayments = {
  getServicesPayments
};
