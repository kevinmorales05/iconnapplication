import { ProductCacheInterface, ProductsByCollectionInterface } from 'rtk';
import { BEApi } from '../http/api-be';

/**
 * Function to get products by collection id.
 */
async function getProductsByCollectionId(collectionData: ProductsByCollectionInterface): Promise<any> {
  const response = await BEApi.getInstance().postRequest('cache/getProducts/fromCollection', collectionData);
  const { data } = response;
  return data;
}

/**
 * Function to get product detail by id.
 */
async function getProductCacheDetailById(productId: string, product: ProductCacheInterface): Promise<any> {
  const response = await BEApi.getInstance().postRequest(`cache/product/detail/${productId}`, product);
  const { data } = response;
  return data;
}

/**
 * Function to get product detail by id.
 */
 async function getHomeItems(): Promise<any> {
  const response = await BEApi.getInstance().getRequest('cache/getHome');
  const { data } = response;
  return data;
}

export const homeServices = {
  getProductsByCollectionId,
  getProductCacheDetailById,
  getHomeItems
};
