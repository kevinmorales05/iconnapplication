import { DocsNoPrefixApi, DocsApi } from 'apis';

/**
 * Function to get products by collection id.
 */
async function getProductsByCollectionId(collection: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`/catalog/pvt/collection/${collection}/products?Active=true&Visible=true&page=1&pageSize=20`);
  const { data } = response;
  return data;
}

/**
 * Function to get product price by product id.
 */
async function getProductPriceByProductId(productId: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`/pricing/prices/${productId}`);
  const { data } = response;
  return data;
}

/**
 * Function to get product raiting by product id.
 */
async function getProductRatingByProductId(productId: string): Promise<any> {
  const response = await DocsNoPrefixApi.getInstance().getRequest(`/reviews-and-ratings/api/rating/${productId}`);
  const { data } = response;
  return data;
}

export const vtexProductsServices = {
  getProductsByCollectionId,
  getProductPriceByProductId,
  getProductRatingByProductId
};
