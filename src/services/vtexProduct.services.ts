import { Product } from '../http/api-product';
import { Products } from '../http/api-products';
import { ProductPrice } from '../http/api-productPrice';
import { SuggestedProducts } from '../http/api-suggestedProduct';

/**
 * Function to get product detail by id.
 */
async function getProductDetailById(productId: string): Promise<any> {
  const response = await Product.getInstance().getRequest(`/product/${productId}`);
  const { data } = response;
  return data;
}

/**
 * Function to get SKU files by id.
 */
async function getSkuFilesById(skuId: string): Promise<any> {
  const response = await Product.getInstance().getRequest(`/stockkeepingunit/${skuId}/file`);
  const { data } = response;
  return data;
}

/**
 * Function to get product price by id.
 */
async function getProductPriceById(productId: string): Promise<any> {
  const response = await ProductPrice.getInstance().getRequest(`/${productId}`);
  const { data } = response;
  return data;
}

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

export { getProductDetailById, getSkuFilesById, getProductPriceById, getSuggestedProductsBySellerIdAndSellerSkuId, getProductSpecification };
