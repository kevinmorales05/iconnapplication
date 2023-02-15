/************************************************** VTEX **********************************************************/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductListCacheRequestInterface, ProductsByPromotionsRequestInterface, ProductsBySubCategorieRequestInterface } from 'rtk/types';
import { citiCategoriesServices } from 'services';

/**
 * Function to get category items.
 */
export const getCategoryItemsThunk = createAsyncThunk('citi/getCategoryItemsThunk', async () => {
  return await citiCategoriesServices.getCategories();
});

/**
 * Function to get product items by subCategory and other filters.
 */
export const getProductsByCategoryAndFiltersItemsThunk = createAsyncThunk(
  'citi/getSubCategoryItemsThunk',
  async (filter: ProductsBySubCategorieRequestInterface) => {
    return await citiCategoriesServices.getProductsByCategoryAndFilters(filter);
  }
);

/**
 * Function to get product items by promotions.
 */
export const getProductsByPromotionsItemsThunk = createAsyncThunk(
  'citi/getProductsByPromotionsItemsThunk',
  async (filter: ProductsByPromotionsRequestInterface) => {
    return await citiCategoriesServices.getProductsByPromotions(filter);
  }
);

/**
 * Function to get product items by promotions.
 */
export const getProductsListItemsThunk = createAsyncThunk('citi/getProductsListItemsThunk', async (filter: ProductListCacheRequestInterface) => {
  return await citiCategoriesServices.getProductsList(filter);
});
