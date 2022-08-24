import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCFDIListThunk, getInvoicingProfileListThunk, getTaxRegimeListThunk, getTicketThunk, getInvoiceThunk } from '../thunks/invoicing.thunks';
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
      state.invoicingSevenTicketList.splice(action.payload, 1);
    },
    addTicketPetroToList(state, action: PayloadAction<InvoicingPetroTicketResponseInterface>) {
      state.invoicingPetroTicketList.push(action.payload);
    },
    deleteTicketPetroFromList(state, action: PayloadAction<number>) {
      state.invoicingPetroTicketList.splice(action.payload, 1);
    }
  },
  extraReducers: builder => {
    builder.addCase(getTaxRegimeListThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTaxRegimeListThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getTaxRegimeListThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getCFDIListThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCFDIListThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getCFDIListThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getInvoicingProfileListThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getInvoicingProfileListThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getInvoicingProfileListThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getTicketThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTicketThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getTicketThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getInvoiceThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getInvoiceThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getInvoiceThunk.rejected, state => {
      state.loading = false;
    });
  }
});

export const {
  setInvoicingInitialState,
  setInvoicing,
  setInvoicingProfilesList,
  addTicketSevenToList,
  deleteTicketSevenFromList,
  addTicketPetroToList,
  deleteTicketPetroFromList
} = invoicingSlice.actions;
export default invoicingSlice.reducer;
