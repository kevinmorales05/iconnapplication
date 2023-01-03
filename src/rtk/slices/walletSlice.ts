import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBanksWalletThunk, getWalletPrefixesThunk } from 'rtk/thunks/wallet.thunks';
import { BeneficiaryInterface, WalletSliceInterface } from 'rtk/types';

const initialState: WalletSliceInterface = {
  prefixes: [],
  banks: [],
  beneficiaries: [],
  dateSync: undefined
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
    },
    setBeneficiaries(state, action: PayloadAction<BeneficiaryInterface[]>) {
      state.beneficiaries = action.payload;
    },
    setDateSync(state, action: PayloadAction<Date>) {
      state.dateSync = action.payload;
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

export const { setWalletInitialState, setBeneficiaries, setDateSync } = walletSlice.actions;
export default walletSlice.reducer;
