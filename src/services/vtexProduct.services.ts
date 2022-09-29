import { Product } from '../http/api-product';
import moment from 'moment'

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

export {
  getProductDetailById,
  getSkuFilesById
};
