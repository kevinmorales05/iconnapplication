import { SearchApi } from 'apis';

/**
 * Function to search products in searchbar.
 */
async function searchProducts(filter: string): Promise<any> {
  const response = await SearchApi.getInstance().getRequest(filter);
  const { data } = response;
  return data;
}

export const vtexSearchProductsServices = {
  searchProducts
};
