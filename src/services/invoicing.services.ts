import { InvoicingProfile } from '../lib/models/InvoicingProfile';
import { InvoicingApi } from '../http/api-invoicing';
import { InvoicingProfileInterface } from 'rtk/types/invoicing.types';
/**
 * Function to get regimens list
 */
async function getTaxRegimeList(): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest('/invoicing/taxRegime/list');
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  return data;
}

/**
 * Function to get CFDI list
 */
async function getCFDIList(): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest('/invoicing/cfdi/list');
  if (response === undefined) return Promise.reject(new Error('getCFDIList:/invoicing/cfdi/list'));
  const { data } = response;
  return data;
}

/**
 * Function to get postal code info
 * @param postalCode
 */
async function getColonies(postalCode: string): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest(`/invoicing/colony/list/${postalCode}`);
  if (response === undefined) return Promise.reject(new Error(`getColonies:/invoicing/colony/list/${postalCode}`));
  const { data } = response;
  return data;
}

/**
 * Function to register invoicing profile
 * @param invoicingProfile
 */
async function registerInvoicingProfile(invoicingProfile: any): Promise<any> {
  const response = await InvoicingApi.getInstance().postRequest('/invoicing/invoicingProfile/create', invoicingProfile);
  if (response === undefined) return Promise.reject(new Error('registerInvoicingProfile:/invoicing/invoicingProfile/create'));
  const { data } = response;
  return data;
}

/**
 * Function to get invoicing profile list
 */
async function getInvoicingProfileList(uid: string): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest(`/invoicing/invoicingProfile/list/${uid}`);
  if (response === undefined) return Promise.reject(new Error('getInvoicingProfileList:/invoicing/invoicingProfile/list'));
  const { data } = response;
  return data;
}

/**
 * Function to delete an invoicing profile
 */

async function deleteInvoicingProfile(invoicingProfile: InvoicingProfileInterface): Promise<any> {
  const { invoicing_profile_id } = invoicingProfile;
  invoicingProfile.status = false;
  /* const emptInvoiceP = {} as InvoicingProfileInterface; */
  const response = await InvoicingApi.getInstance().putRequest(`/invoicing/invoicingProfile/delete/${invoicing_profile_id}`, invoicingProfile);
  if (response === undefined) return Promise.reject(new Error(`deleteInvoicingProfile:/invoicing/invoicingProfile/delete/${invoicing_profile_id}`));
  const { data } = response;
  return data;
}

/**
 * Function to update an invoicing profile
 */

async function updateInvoicingProfile(invoicingProfile: InvoicingProfileInterface): Promise<any> {
  const { invoicing_profile_id } = invoicingProfile;
  const response = await InvoicingApi.getInstance().putRequest(`/invoicing/invoicingProfile/update/${invoicing_profile_id}`, invoicingProfile);
  if (response === undefined) return Promise.reject(new Error(`updateInvoicingProfile:/invoicing/invoicingProfile/update/${invoicing_profile_id}`));
  const { data } = response;
  return data;
}

/**
 * Function to resend verification email
 */
 async function resendVerificationEmail(email: string): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest(`/invoicing/mail/sendEmailForVerification/${email}`);
  if (response === undefined) return Promise.reject(new Error(`resendVerificationEmail:/invoicing/mail/sendEmailForVerification/${email}`));
  const { data } = response;
  return data;
}

export const invoicingServices = {
  getTaxRegimeList,
  getCFDIList,
  getColonies,
  registerInvoicingProfile,
  getInvoicingProfileList,
  deleteInvoicingProfile,
  updateInvoicingProfile,
  resendVerificationEmail
};
