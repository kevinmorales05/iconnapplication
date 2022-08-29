import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCFDIListThunk,
  getInvoicingProfileListThunk,
  getTaxRegimeListThunk,
  getTicketThunk,
  getInvoiceThunk,
  forwardInvoiceThunk
} from '../thunks/invoicing.thunks';
import {
  InvoicingProfileInterface,
  InvoicingPetroTicketResponseInterface,
  InvoicingSevenTicketResponseInterface,
  InvoicingPetroTicketResponseWithPositionInterface,
  InvoicingSevenTicketResponseWithPositionInterface
} from '../types';

const initialStateProfileList: InvoicingProfileInterface[] = [];
const initialStateSevenTicketList: InvoicingSevenTicketResponseInterface[] = [];
const initialStatePetroTicketList: InvoicingPetroTicketResponseInterface[] = [];

const invoicingSlice = createSlice({
  name: 'invoicing',
  initialState: {
    invoicingProfileList: initialStateProfileList,
    invoicingSevenTicketList: initialStateSevenTicketList,
    invoicingPetroTicketList: initialStatePetroTicketList,
    invoicingPaymentMethodForSevenTicketList: '',
    invoicingStoreForSevenTicketList: '',
    invoicingPaymentMethodForPetroTicketList: '',
    invoicingStoreForPetroTicketList: '',
    loading: false
  },
  reducers: {
    setInvoicingInitialState(state) {
      state.invoicingProfileList = initialStateProfileList;
      state.invoicingSevenTicketList = initialStateSevenTicketList;
      state.invoicingPetroTicketList = initialStatePetroTicketList;
      state.invoicingPaymentMethodForSevenTicketList = '';
      state.invoicingStoreForSevenTicketList = '';
      state.invoicingPaymentMethodForPetroTicketList = '';
      state.invoicingStoreForPetroTicketList = '';
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
    },
    replaceTicketSevenFromList(state, action: PayloadAction<InvoicingSevenTicketResponseWithPositionInterface>) {
      state.invoicingSevenTicketList.splice(action.payload.position, 1, action.payload.ticket);
    },
    replaceTicketPetroFromList(state, action: PayloadAction<InvoicingPetroTicketResponseWithPositionInterface>) {
      state.invoicingPetroTicketList.splice(action.payload.position, 1, action.payload.ticket);
    },
    setInvoicingPaymentMethodForSevenTicketList(state, action: PayloadAction<string>) {
      state.invoicingPaymentMethodForSevenTicketList = action.payload;
    },
    setInvoicingStoreForSevenTicketList(state, action: PayloadAction<string>) {
      state.invoicingStoreForSevenTicketList = action.payload;
    },
    setInvoicingPaymentMethodForPetroTicketList(state, action: PayloadAction<string>) {
      state.invoicingPaymentMethodForPetroTicketList = action.payload;
    },
    setInvoicingStoreForPetroTicketList(state, action: PayloadAction<string>) {
      state.invoicingStoreForPetroTicketList = action.payload;
    },
    resetInvoicingPetroTicketList(state) {
      state.invoicingPetroTicketList = initialStatePetroTicketList;
    },
    resetInvoicingSevenTicketList(state) {
      state.invoicingSevenTicketList = initialStateSevenTicketList;
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
    builder.addCase(forwardInvoiceThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(forwardInvoiceThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(forwardInvoiceThunk.rejected, state => {
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
  deleteTicketPetroFromList,
  replaceTicketSevenFromList,
  replaceTicketPetroFromList,
  setInvoicingPaymentMethodForSevenTicketList,
  setInvoicingStoreForSevenTicketList,
  setInvoicingPaymentMethodForPetroTicketList,
  setInvoicingStoreForPetroTicketList,
  resetInvoicingPetroTicketList,
  resetInvoicingSevenTicketList
} = invoicingSlice.actions;
export default invoicingSlice.reducer;
