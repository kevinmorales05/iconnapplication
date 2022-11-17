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

/**
 * Function to delete a QR data from vtex collection ("SP").
 */
async function deleteBillFromVtex(documentId: string): Promise<any> {
  const response = await VtexApi.getInstance().deleteRequest(`/api/dataentities/SP/documents/${documentId}`);
  if (response === undefined) return Promise.reject(new Error('deleteBillFromVtex'));
  const { data } = response;
  return data;
}

/**
 * Function to delete a QR data from vtex collection ("SP").
 */
async function updateBillIntoVtex(service: ServiceInterface, documentId: string): Promise<any> {
  const response = await VtexApi.getInstance().patchRequest(`/api/dataentities/SP/documents/${documentId}`, service);
  if (response === undefined) return Promise.reject(new Error('updateBillIntoVtex'));
  const { data } = response;
  return data;
}

export const vtexServicesPayments = {
  createBillIntoArcus,
  deleteBillFromVtex,
  getServicesPayments,
  saveBillIntoVtex,
  updateBillIntoVtex
};
