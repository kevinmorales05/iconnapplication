import { Products } from '../http/api-products';
import { SuggestedProducts } from '../http/api-suggestedProduct';


/**
 * Function to get suggested products of product selected by sellerId and sellerSkuId.
 */
async function getSuggestedProductsBySellerIdAndSellerSkuId(sellerId: string, sellerSkuId: string): Promise<any> {
  const response = await SuggestedProducts.getInstance().getRequest(`/${sellerId}/${sellerSkuId}`);
  const { data } = response;
  return data;
}

/**
 * Function to get product specification.
 */
 async function getProductSpecification(productId: string): Promise<any> {
  const response = await Products.getInstance().getRequest(`/${productId}/specification`);
  const { data } = response;
  return data;
}

export { getSuggestedProductsBySellerIdAndSellerSkuId, getProductSpecification };
