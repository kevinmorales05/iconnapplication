import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCFDIListThunk, getInvoicingProfileListThunk, getTaxRegimeListThunk } from '../thunks/invoicing.thunks';
import { InvoicingProfileInterface } from '../types';

const initialState: InvoicingProfileInterface[] = [];

const invoicingSlice = createSlice({
  name: 'invoicing',
  initialState: {
    invoicingProfileList: initialState,
    loading: false,
  },
  reducers: {
    setAuthInitialState(state) {
      state.invoicingProfileList = { ...initialState };
      state.loading = false;
    },
    setInvoicing(state, action: PayloadAction<InvoicingProfileInterface>) {
      state.invoicingProfileList.push(action.payload);
    },
    setInvoicingProfilesList(state, action: PayloadAction<InvoicingProfileInterface[]>) {
      state.invoicingProfileList = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getTaxRegimeListThunk.pending, state => {
      console.log('getTaxRegimeListThunk pending...');
      state.loading = true;
    })
    builder.addCase(getTaxRegimeListThunk.fulfilled, state => {      
      console.log('getTaxRegimeListThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(getTaxRegimeListThunk.rejected, state => {
      console.log('getTaxRegimeListThunk rejected...');
      state.loading = false;
    })
    builder.addCase(getCFDIListThunk.pending, state => {
      console.log('getCFDIListThunk pending...');
      state.loading = true;
    })
    builder.addCase(getCFDIListThunk.fulfilled, state => {      
      console.log('getCFDIListThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(getCFDIListThunk.rejected, state => {
      console.log('getCFDIListThunk rejected...');
      state.loading = false;
    })
    builder.addCase(getInvoicingProfileListThunk.pending, state => {
      console.log('getInvoicingProfileListThunk pending...');
      state.loading = true;
    })
    builder.addCase(getInvoicingProfileListThunk.fulfilled, state => {      
      console.log('getInvoicingProfileListThunk fullfilled...');
      state.loading = false;
    })
    builder.addCase(getInvoicingProfileListThunk.rejected, state => {
      console.log('getInvoicingProfileListThunk rejected...');
      state.loading = false;
    })
  }
});
// TODO: validate if it is possible to reduce extra reducers.
export const { setAuthInitialState, setInvoicing, setInvoicingProfilesList } = invoicingSlice.actions;
export default invoicingSlice.reducer;
