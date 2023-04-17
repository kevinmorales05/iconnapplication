import { BEApi } from '../http/api-be';
import { ProductListCacheRequestInterface, ProductsByPromotionsRequestInterface, ProductsBySubCategorieRequestInterface } from 'rtk';

/**
 * Function to get all categories with childrens.
 */
async function getCategories(): Promise<any> {
  const response = await BEApi.getInstance().getRequest('cache/categories/list');
  const { data } = response;
  return data;
}

/**
 * Function to get all categories with childrens.
 */
async function getProductsByCategoryAndFilters(filter: ProductsBySubCategorieRequestInterface): Promise<any> {
  if (filter.categoryId === filter.subCategoryId) {
    const response = await BEApi.getInstance().getRequest(
      `cache/categories?storeId=${filter.storeId}&pageSize=${filter.pageSize}&pageNumber=${filter.pageNumber}&categoryId=${filter.categoryId}`
    );
    const { data } = response;
    return data;
  } else {
    const response = await BEApi.getInstance().getRequest(
      `cache/categories?storeId=${filter.storeId}&pageSize=${filter.pageSize}&pageNumber=${filter.pageNumber}&subCategoryId=${filter.subCategoryId}&categoryId=${filter.categoryId}`
    );
    const { data } = response;
    return data;
  }
}

/**
 * Function to get all categories with childrens.
 */
async function getProductsByPromotions(filter: ProductsByPromotionsRequestInterface): Promise<any> {
  const response = await BEApi.getInstance().getRequest(
    `cache/promotions/list?pageSize=${filter.pageSize}&pageNumber=${filter.pageNumber}&selectedStore=${filter.storeId}`
  );
  const { data } = response;
  return data;
}

/**
 * Function to get products by ids.
 */
async function getProductsList(filter: ProductListCacheRequestInterface): Promise<any> {
  console.log("this is the filter", JSON.stringify(filter));
  const response = await BEApi.getInstance().postRequest(`cache/products/list?selectedStore=${filter.storeId}`, filter.products);
  const { data } = response;
  return data;
}

export const citiCategoriesServices = {
  getCategories,
  getProductsByCategoryAndFilters,
  getProductsByPromotions,
  getProductsList
};
