import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBanksWalletThunk, getWalletPrefixesThunk } from 'rtk/thunks/wallet.thunks';
import { BeneficiaryInterface, HistoryServices, WalletFav, WalletSliceInterface } from 'rtk/types';

const initialState: WalletSliceInterface = {
  prefixes: [],
  banks: [],
  beneficiaries: [],
  dateSync: undefined,
  amountOfRecharge: '',
  numberRecharge: '',
  tagName: '',
  favs: [],
  history: []
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    setWalletInitialState(state) {
      state.prefixes = [];
      state.banks = [];
      state.beneficiaries = [];
      state.dateSync = undefined;
      state.amountOfRecharge = '';
      state.numberRecharge = '';
      state.tagName = '';
      state.favs = [];
      state.history = [];
    },
    setBeneficiaries(state, action: PayloadAction<BeneficiaryInterface[]>) {
      state.beneficiaries = action.payload;
    },
    setDateSync(state, action: PayloadAction<Date>) {
      state.dateSync = action.payload;
    },
    setAmountOfRecharge(state, action: PayloadAction<string>) {
      state.amountOfRecharge = action.payload;
    },
    setNumberRecharge(state, action: PayloadAction<string>) {
      state.numberRecharge = action.payload;
    },
    setTagName(state, action: PayloadAction<string>) {
      state.tagName = action.payload;
    },
    setFavs(state, action: PayloadAction<WalletFav[]>) {
      state.favs = action.payload;
    },
    setHistory(state, action: PayloadAction<HistoryServices[]>) {
      state.history = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getWalletPrefixesThunk.pending, state => {
      state.prefixes = [];
    });
    builder.addCase(getWalletPrefixesThunk.fulfilled, (state, action) => {
      state.prefixes = action.payload;
    });
    builder.addCase(getWalletPrefixesThunk.rejected, () => {});
    builder.addCase(getBanksWalletThunk.pending, state => {
      state.banks = [];
    });
    builder.addCase(getBanksWalletThunk.fulfilled, (state, action) => {
      state.banks = action.payload;
    });
    builder.addCase(getBanksWalletThunk.rejected, () => {});
  }
});

export const { setWalletInitialState, setBeneficiaries, setDateSync, setAmountOfRecharge, setNumberRecharge, setTagName, setFavs, setHistory } = walletSlice.actions;
export default walletSlice.reducer;
