import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  InvoiceInterface,
  InvoicingForwardInvoiceRequestInterface,
  InvoicingGetInvoicePDFRequestInterface,
  InvoicingPetroTicketRequestInterface,
  InvoicingProfileInterface,
  InvoicingSevenTicketRequestInterface
} from '../types';
import { invoicingServices } from 'services';
import { setInvoicingProfilesList } from '../slices/invoicingSlice';

export const getTaxRegimeListThunk = createAsyncThunk('invoicing/getTaxRegimeListThunk', async () => {
  return await invoicingServices.getTaxRegimeList();
});

export const getCFDIListThunk = createAsyncThunk('invoicing/getCFDIListThunk', async () => {
  return await invoicingServices.getCFDIList();
});

/**
 * Function to get user invoicing profiles.
 * Here we can see the effective use of the thunk.
 */
export const getInvoicingProfileListThunk = createAsyncThunk('invoicing/getInvoicingProfileListThunk', async (uid: string, thunk) => {
  const { data: invoicingProfileList } = await invoicingServices.getInvoicingProfileList(uid);
  const arr: InvoicingProfileInterface[] = invoicingProfileList;
  thunk.dispatch(setInvoicingProfilesList(arr));
});

export const resendVerificationEmailThunk = createAsyncThunk('invoicing/resendVerificationEmailThunk', async (email: string) => {
  return await invoicingServices.resendVerificationEmail(email);
});

export const getTicketThunk = createAsyncThunk(
  'invoicing/getTicketThunk',
  async (ticket: InvoicingSevenTicketRequestInterface | InvoicingPetroTicketRequestInterface) => {
    return await invoicingServices.getTicket(ticket);
  }
);

export const getInvoiceThunk = createAsyncThunk('invoicing/getInvoiceThunk', async (tickets: InvoiceInterface) => {
  return await invoicingServices.getInvoice(tickets);
});

export const getInvoicePDFThunk = createAsyncThunk('invoicing/getInvoicePDFThunk', async (request: InvoicingGetInvoicePDFRequestInterface) => {
  return await invoicingServices.getInvoicePDF(request);
});

export const forwardInvoiceThunk = createAsyncThunk('invoicing/forwardInvoiceThunk', async (request: InvoicingForwardInvoiceRequestInterface) => {
  return await invoicingServices.forwardInvoice(request);
});
