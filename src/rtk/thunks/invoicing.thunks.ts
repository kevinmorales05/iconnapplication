import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvoicingInterface } from '../types';
import { invoicingServices } from 'services';

export const getTaxRegimeListThunk = createAsyncThunk('invoicing/getTaxRegimeListThunk', async () => {
  return await invoicingServices.getTaxRegimeList();
});

export const getCFDIListThunk = createAsyncThunk('invoicing/getCFDIListThunk', async () => {
  return await invoicingServices.getCFDIList();
});
