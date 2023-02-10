/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsByCollectionInterface } from 'rtk/types';
import { homeServices } from 'services/home-services';

/**
 * Function to get home products by collection id.
 */
export const getProductsByCollectionIdThunk = createAsyncThunk('citi/getHomeProductsByCollectionIdThunk', async (collection: ProductsByCollectionInterface) => {
  return await homeServices.getProductsByCollectionId(collection);
});

/**
 * Function to get home items.
 */
export const getHomeItemsThunk = createAsyncThunk('citi/getHomeItemsThunk', async () => {
  return await homeServices.getHomeItems();
});
