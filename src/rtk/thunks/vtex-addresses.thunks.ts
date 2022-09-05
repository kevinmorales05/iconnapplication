/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Address, setAddressesList } from 'rtk';
import { vtexDocsServices } from 'services/vtexdocs.services';

/**
 * Function to get User Addresses
 * here we can see the effective use of the thunk.
 * AD = addresses context from vtex.
 */
export const getUserAddressesThunk = createAsyncThunk('vtex/getUserAddressesThunk', async (userId: string, thunk) => {
  const response: Address[] = await vtexDocsServices.getAllDocByUserID('AD', userId);
  thunk.dispatch(setAddressesList(response));
});

/**
 * Function to autopopulate city and state in the Addresses modal screen.
 * postalCode: p:e 50200
 */
export const getAddressByPostalCodeThunk = createAsyncThunk('vtex/getAddressByPostalCodeThunk', async (postalCode: string) => {
  return await vtexDocsServices.getAddressByPostalCode(postalCode);
});

/**
 * Function to save a user address
 */
export const saveUserAddressThunk = createAsyncThunk('vtex/saveUserAddressThunk', async (address: Address) => {
  return await vtexDocsServices.createDoc('AD', address);
});
