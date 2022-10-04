import { Product } from '../http/api-product';
import { ProductPrice } from '../http/api-productPrice';


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

export {
  getProductDetailById,
  getSkuFilesById,
  getProductPriceById
};
