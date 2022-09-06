/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Address } from '../types';
import { setAddressesList } from '../slices/authSlice';
import { vtexDocsServices } from 'services';

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
 * Function to save a user address.
 */
export const saveUserAddressThunk = createAsyncThunk('vtex/saveUserAddressThunk', async (address: Address) => {
  return await vtexDocsServices.createDoc('AD', address);
});

/**
 * Function to delete a user address.
 */
export const deleteUserAddressThunk = createAsyncThunk('vtex/deleteUserAddressThunk', async (id: string) => {
  return await vtexDocsServices.deleteDocByDocID('AD', id);
});

/**
 * Function to update a user address.
 */
export const updateUserAddressThunk = createAsyncThunk('vtex/updateUserAddressThunk', async (address: Address) => {
  return await vtexDocsServices.updateDocByDocID('AD', address.id!, address);
});
