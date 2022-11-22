/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { vtexHomeServices, vtexProductsServices } from 'services';

/**
 * Function to get home items.
 */
export const getHomeItemsThunk = createAsyncThunk('vtex/getHomeItemsThunk', async () => {
  return await vtexHomeServices.getHomeItems('BA');
});

/**
 * Function to get home products by collection id.
 */
export const getProductsByCollectionIdThunk = createAsyncThunk('vtex/getHomeProductsByCollectionIdThunk', async (collection: string) => {
  return await vtexProductsServices.getProductsByCollectionId(collection);
});

/**
 * Function to get product price by product id.
 */
export const getProductPriceByProductIdThunk = createAsyncThunk('vtex/getProductPriceByProductIdThunk', async (productId: string) => {
  return await vtexProductsServices.getProductPriceByProductId(productId);
});

/**
 * Function to get product price by product id.
 */
export const getProductRatingByProductIdThunk = createAsyncThunk('vtex/getProductRatingByProductIdThunk', async (productId: string) => {
  return await vtexProductsServices.getProductRatingByProductId(productId);
});
