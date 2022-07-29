import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCFDIListThunk, getTaxRegimeListThunk } from '../thunks/invoicing.thunks';
import { InvoicingInterface } from '../types';

const initialState: InvoicingInterface[] = [];

const invoicingSlice = createSlice({
  name: 'invoicing',
  initialState: {
    invoicingProfiles: initialState,
    loading: false,
  },
  reducers: {
    setAuthInitialState(state) {
      state.invoicingProfiles = { ...initialState };
      state.loading = false;
    },
    setInvoicing(state, action: PayloadAction<InvoicingInterface>) {
      state.invoicingProfiles.push(action.payload);
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
  }
});
// TODO: validate if it is possible to reduce extra reducers.
export const { setAuthInitialState, setInvoicing } = invoicingSlice.actions;
export default invoicingSlice.reducer;
