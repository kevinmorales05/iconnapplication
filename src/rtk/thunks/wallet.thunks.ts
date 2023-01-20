import { createAsyncThunk } from '@reduxjs/toolkit';
import { vtexDocsServices } from 'services';

/**
 * GetPrefixes of wallet
 */
export const getWalletPrefixesThunk = createAsyncThunk('wallet/getWalletPrefixesThunk', async () => {
  return await vtexDocsServices.getPrefixesWallet();
});

/**
 * GetPrefixes of wallet
 */
 export const getBanksWalletThunk = createAsyncThunk('wallet/getBanksWalletThunk', async () => {
  return await vtexDocsServices.getBanksWallet();
});

