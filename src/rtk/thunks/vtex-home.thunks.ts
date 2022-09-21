/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { vtexDocsServices } from 'services';

/**
 * Function to get Home Items
 */
export const getHomeItemsThunk = createAsyncThunk('vtex/getHomeItemsThunk', async () => {
  return await vtexDocsServices.getHomeItems('BA');
});
