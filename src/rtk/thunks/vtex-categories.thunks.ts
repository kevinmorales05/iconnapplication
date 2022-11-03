/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsByCategoryFilter } from 'rtk/types/category.types';
import { vtexCategoriesServices } from 'services';

/**
 * Function to get category items.
 */
export const getCategoryItemsThunk = createAsyncThunk('vtex/getCategoryItemsThunk', async () => {
  return await vtexCategoriesServices.getCategories();
});

/**
 * Function to get product items by category and other filters.
 */
export const getProductsByCategoryAndFiltersItemsThunk = createAsyncThunk(
  'vtex/getCategoryItemsThunk',
  async (filters: { filter: ProductsByCategoryFilter; categoryId: string; subCategory: string; itemToLoad: number }) => {
    return await vtexCategoriesServices.getProductsByCategoryAndFilters(filters.filter, filters.categoryId, filters.subCategory, filters.itemToLoad);
  }
);
