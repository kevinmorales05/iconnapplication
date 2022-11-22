/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { vtexSearchProductsServices } from 'services';

/**
 * Function to get category items.
 */
export const searchProductsThunk = createAsyncThunk('vtex/searchProductsThunk', async (filter: string) => {
  return await vtexSearchProductsServices.searchProducts(filter);
});
