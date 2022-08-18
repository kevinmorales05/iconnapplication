import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCFDIListThunk, getInvoicingProfileListThunk, getTaxRegimeListThunk, getTicketThunk } from '../thunks/invoicing.thunks';
import { InvoicingPetroTicketResponseInterface, InvoicingProfileInterface, InvoicingSevenTicketResponseInterface } from '../types';

const initialStateProfileList: InvoicingProfileInterface[] = [];
const initialStateSevenTicketList: InvoicingSevenTicketResponseInterface[] = [];
const initialStatePetroTicketList: InvoicingPetroTicketResponseInterface[] = [];

const invoicingSlice = createSlice({
  name: 'invoicing',
  initialState: {
    invoicingProfileList: initialStateProfileList,
    invoicingSevenTicketList: initialStateSevenTicketList,
    invoicingPetroTicketList: initialStatePetroTicketList,
    loading: false
  },
  reducers: {
    setInvoicingInitialState(state) {
      state.invoicingProfileList = initialStateProfileList;
      state.invoicingSevenTicketList = initialStateSevenTicketList;
      state.invoicingPetroTicketList = initialStatePetroTicketList;
      state.loading = false;
    },
    setInvoicing(state, action: PayloadAction<InvoicingProfileInterface>) {
      state.invoicingProfileList.push(action.payload);
    },
    setInvoicingProfilesList(state, action: PayloadAction<InvoicingProfileInterface[]>) {
      state.invoicingProfileList = action.payload;
    },
    addTicketSevenToList(state, action: PayloadAction<InvoicingSevenTicketResponseInterface>) {
      state.invoicingSevenTicketList.push(action.payload);
    },
    deleteTicketSevenFromList(state, action: PayloadAction<number>) {
      state.invoicingSevenTicketList.splice(action.payload, 1); // TODO check this!
    }
  },
  extraReducers: builder => {
    builder.addCase(getTaxRegimeListThunk.pending, state => {
      console.log('getTaxRegimeListThunk pending...');
      state.loading = true;
    });
    builder.addCase(getTaxRegimeListThunk.fulfilled, state => {
      console.log('getTaxRegimeListThunk fullfilled...');
      state.loading = false;
    });
    builder.addCase(getTaxRegimeListThunk.rejected, state => {
      console.log('getTaxRegimeListThunk rejected...');
      state.loading = false;
    });
    builder.addCase(getCFDIListThunk.pending, state => {
      console.log('getCFDIListThunk pending...');
      state.loading = true;
    });
    builder.addCase(getCFDIListThunk.fulfilled, state => {
      console.log('getCFDIListThunk fullfilled...');
      state.loading = false;
    });
    builder.addCase(getCFDIListThunk.rejected, state => {
      console.log('getCFDIListThunk rejected...');
      state.loading = false;
    });
    builder.addCase(getInvoicingProfileListThunk.pending, state => {
      console.log('getInvoicingProfileListThunk pending...');
      state.loading = true;
    });
    builder.addCase(getInvoicingProfileListThunk.fulfilled, state => {
      console.log('getInvoicingProfileListThunk fullfilled...');
      state.loading = false;
    });
    builder.addCase(getInvoicingProfileListThunk.rejected, state => {
      console.log('getInvoicingProfileListThunk rejected...');
      state.loading = false;
    });
    builder.addCase(getTicketThunk.pending, state => {
      console.log('getTicketThunk pending...');
      state.loading = true;
    });
    builder.addCase(getTicketThunk.fulfilled, state => {
      console.log('getTicketThunk fullfilled...');
      state.loading = false;
    });
    builder.addCase(getTicketThunk.rejected, state => {
      console.log('getTicketThunk rejected...');
      state.loading = false;
    });
  }
});
// TODO: validate if it is possible to reduce extra reducers.
export const { setInvoicingInitialState, setInvoicing, setInvoicingProfilesList, addTicketSevenToList, deleteTicketSevenFromList } = invoicingSlice.actions;
export default invoicingSlice.reducer;
