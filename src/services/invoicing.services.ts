import { InvoicingApi } from '../http/api-invoicing';
import {
  InvoiceInterface,
  InvoicingForwardInvoiceRequestInterface,
  InvoicingGetInvoicePDFRequestInterface,
  InvoicingPetroTicketRequestInterface,
  InvoicingProfileInterface,
  InvoicingResendEmailRequestInterface,
  InvoicingSevenTicketRequestInterface
} from 'rtk/types/invoicing.types';
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
async function resendVerificationEmail(invoicingResendEmail: InvoicingResendEmailRequestInterface): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest(
    `/invoicing/mail/sendEmailForVerification/${invoicingResendEmail.email}/${invoicingResendEmail.invoicingProfileId}`
  );
  if (response === undefined)
    return Promise.reject(
      new Error(`resendVerificationEmail:/invoicing/mail/sendEmailForVerification/${invoicingResendEmail.email}/${invoicingResendEmail.invoicingProfileId}`)
    );
  const { data } = response;
  return data;
}

/**
 * Function to resend verification email
 */
async function sendInvoiceEmail(emails: string[], uuid: string): Promise<any> {
  const response = await InvoicingApi.getInstance().postRequest(`/invoicing/invoicingData/forward`, { emails, uuid });
  if (response === undefined) return Promise.reject(new Error(`invoicing/invoicingData/forward/`));
  const { data } = response;
  return data;
}

/**
 * Function to select default invoicingProfile
 */
async function selectDefault(invoicing_profile_id: number): Promise<any> {
  const response = await InvoicingApi.getInstance().putRequest(`/invoicing/invoicingProfile/select_default/${invoicing_profile_id}`, { invoicing_profile_id });
  if (response === undefined) return Promise.reject(new Error(`selectDefault:/invoicingProfile/select_default/${invoicing_profile_id}`));
  const { data } = response;
  return data;
}

/**
 * Function to select default invoicingProfile
 */
async function getTicket(ticket: InvoicingSevenTicketRequestInterface | InvoicingPetroTicketRequestInterface): Promise<any> {
  const response = await InvoicingApi.getInstance().postRequest('/invoicing/invoicingData/getTicket', ticket);
  if (response === undefined) return Promise.reject(new Error('getTicket:/invoicingData/getTicket/'));
  const { data } = response;
  return data;
}

/**
 * Function to get Invoices (list invoices)
 */
async function getInvoices(page: number, limit: number, payload: any): Promise<any> {
  const response = await InvoicingApi.getInstance().postRequest(`/invoicing/invoicingData/list/filter?page=${page}&limit=${limit}`, payload);
  if (response === undefined) return Promise.reject(new Error(`getInvoices:/invoicing/invoicingData/list/filter`));
  const { data } = response;
  return data;
}

/**
 * Function to generate invoice
 */
async function getInvoice(payload: InvoiceInterface): Promise<any> {
  const response = await InvoicingApi.getInstance().postRequest('/invoicing/invoicingData/getInvoice', payload);
  if (response === undefined) return Promise.reject(new Error('getInvoice:/invoicing/invoicingData/getInvoice'));
  const { data } = response;
  return data;
}

/**
 * Function to get invoice PDF
 */
async function getInvoicePDF(payload: InvoicingGetInvoicePDFRequestInterface): Promise<any> {
  const response = await InvoicingApi.getInstance().getRequest(`/invoicing/invoicingData/getInvoicePDF?uuid=${payload.uuid}`);
  if (response === undefined) return Promise.reject(new Error('getInvoicePDF:/invoicing/invoicingData/getInvoicePDF'));
  const { data } = response;
  return data;
}

/**
 * Function to forward invoice
 */
async function forwardInvoice(payload: InvoicingForwardInvoiceRequestInterface): Promise<any> {
  const response = await InvoicingApi.getInstance().postRequest('/invoicing/invoicingData/forward', payload);
  if (response === undefined) return Promise.reject(new Error('forwardInvoice:/invoicing/invoicingData/forward'));
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
  resendVerificationEmail,
  selectDefault,
  getTicket,
  getInvoices,
  getInvoice,
  getInvoicePDF,
  forwardInvoice,
  sendInvoiceEmail
};
