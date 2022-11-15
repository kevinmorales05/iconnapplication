import { VtexApi } from '../http/vtex-api';
import { ArcusApi } from '../http/arcus-api';
import { ServiceInterface, ServiceRequestInterface } from 'rtk';

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

/**
 * Function to register a service payment in Arcus API.
 */
async function createBillIntoArcus(servicePayment: ServiceRequestInterface): Promise<any> {
  const response = await ArcusApi.getInstance().postRequest('/bills', servicePayment);
  if (response === undefined) return Promise.reject(new Error('createBillIntoArcus'));
  const { data } = response;
  return data;
}

/**
 * Function to save a QR data into vtex collection ("SP").
 */
async function saveBillIntoVtex(service: ServiceInterface): Promise<any> {
  const response = await VtexApi.getInstance().postRequest('/api/dataentities/SP/documents', service);
  if (response === undefined) return Promise.reject(new Error('saveBillIntoVtex'));
  const { data } = response;
  return data;
}

export const vtexServicesPayments = {
  createBillIntoArcus,
  getServicesPayments,
  saveBillIntoVtex
};
