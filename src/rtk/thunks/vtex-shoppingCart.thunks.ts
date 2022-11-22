import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientProfileDataWithOrderFormInterface, ShoppingCartInteface, updateShoppingCartInterface } from '../types';
import { getShoppingCartItems, cleanShoppingCart, updateShoppingCartItems } from '../slices/cartSlice';
import { getShoppingCart, updateShoppingCart, emptyShoppingCar, saveClientProfileData } from 'services/vtexShoppingCar.services';

/**
 * * Function to get all of the shopping cart items and information of the shopping cart
 * * here we can see the effective use of the thunk.
 */
export const getShoppingCartThunk = createAsyncThunk('vtex/getShoppingCartThunk', async (orderFormId: string, thunk) => {
  const response: ShoppingCartInteface[] = await getShoppingCart(orderFormId);
  thunk.dispatch(getShoppingCartItems(response));
});

/**
 * * Function to clean the shopping cart
 * * here we can see the effective use of the thunk.
 */

export const emptyShoppingCartThunk = createAsyncThunk('vtex/cleanShoppingCartThunk', async (orderFormId: string, thunk) => {
  const response: ShoppingCartInteface[] = await emptyShoppingCar(orderFormId, {});
  thunk.dispatch(cleanShoppingCart(response));
});

/**
 * * Function to update the shopping cart
 * * here we can see the effective use of the thunk.
 */
export const updateShoppingCartThunk = createAsyncThunk('vtex/updateShoppingCartThunk', async (object: updateShoppingCartInterface, thunk) => {
  const response: ShoppingCartInteface[] = await updateShoppingCart(object.orderFormId, object.doc);
  thunk.dispatch(updateShoppingCartItems(response));
});

/**
 * Function to save ClientProfileData. This data is important to prepopulate the user info in the checkout webview.
 */
export const saveClientProfileDataThunk = createAsyncThunk('vtex/saveClientProfileDataThunk', async (object: ClientProfileDataWithOrderFormInterface) => {
  return await saveClientProfileData(object.orderFormId, object.clientProfileData);
});
