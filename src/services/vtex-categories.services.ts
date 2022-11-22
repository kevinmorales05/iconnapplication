import { DocsApi } from 'apis';
import { ProductsByCategoryFilter } from 'rtk/types/category.types';

/**
 * Function to get all categories with childrens.
 */
async function getCategories(): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`/catalog_system/pub/category/tree/5`);
  const { data } = response;
  return data;
}

/**
 * Function to get all categories with childrens.
 */
async function getProductsByCategoryAndFilters(filter: ProductsByCategoryFilter, categoryId: string, subCategory: string, itemToLoad: number): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(
    `/catalog_system/pub/products/search?_from=${itemToLoad}&_to=${itemToLoad + 9}&fq=C:/${categoryId}/${categoryId !== subCategory ? `${subCategory}/` : ''}&O=${filter}`
  );
  const { data } = response;
  return data;
}

export const vtexCategoriesServices = {
  getCategories,
  getProductsByCategoryAndFilters
};
