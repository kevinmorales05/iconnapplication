import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvoiceInterface, InvoicingPetroTicketRequestInterface, InvoicingSevenTicketRequestInterface } from '../types';
import { invoicingServices } from 'services';

export const getTaxRegimeListThunk = createAsyncThunk('invoicing/getTaxRegimeListThunk', async () => {
  return await invoicingServices.getTaxRegimeList();
});

export const getCFDIListThunk = createAsyncThunk('invoicing/getCFDIListThunk', async () => {
  return await invoicingServices.getCFDIList();
});

export const getInvoicingProfileListThunk = createAsyncThunk('invoicing/getInvoicingProfileListThunk', async (uid: string) => {
  return await invoicingServices.getInvoicingProfileList(uid);
});

export const resendVerificationEmailThunk = createAsyncThunk('invoicing/resendVerificationEmailThunk', async (email: string) => {
  return await invoicingServices.resendVerificationEmail(email);
});

export const getTicketThunk = createAsyncThunk('invoicing/getTicketThunk', async (ticket: InvoicingSevenTicketRequestInterface | InvoicingPetroTicketRequestInterface) => {
  return await invoicingServices.getTicket(ticket);
});

export const getInvoiceThunk = createAsyncThunk('invoicing/getInvoiceThunk', async (tickets: InvoiceInterface) => {
  return await invoicingServices.getInvoice(tickets);
});