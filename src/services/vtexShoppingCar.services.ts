import { ShoppingCar } from '../http/api-shoppingCar';
import { ShoppingCarCreation } from '../http/api-shoppingCarCreation';
import { ClientProfileDataInterface, ShippingData } from 'rtk';
import { DocsApi } from 'apis';

/**
 * Function to create a shoppingCart
 */
async function getCurrentShoppingCartOrCreateNewOne(): Promise<any> {
  const response = await ShoppingCarCreation.getInstance().getRequest('/orderForm');
  if (response === undefined) return Promise.reject(new Error('getCurrentShoppingCartOrCreateNewOne'));
  const { data } = response;
  return data;
}

/**
 * Function to create a shoppingCart
 */
async function forceToCreateNewShoppingCart(): Promise<any> {
  const response = await ShoppingCarCreation.getInstance().getRequest('/orderForm/?forceNewCart=true');
  if (response === undefined) return Promise.reject(new Error('forceToCreateNewShoppingCart'));
  const { data } = response;
  return data;
}

/**
 * Function to get shoppingCartById
 * shoppingCartId is the shopping cart identifier.
 */
async function getShoppingCart(shoppingCartId: string): Promise<any> {
  const response = await ShoppingCar.getInstance().getRequest(`${shoppingCartId}`);
  if (response === undefined) return Promise.reject(new Error('getShoppingCart'));
  const { data } = response;
  return data;
}

/**
 * Function to empty shopping cart
 * shoppingCartId is the shopping cart identifier.
 */
async function emptyShoppingCar(shoppingCartId: string, doc: any): Promise<any> {
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/items/removeAll`, doc);
  if (response === undefined) return Promise.reject(new Error('emptyShoppingCar'));
  const { data } = response;
  return data;
}

/**
 * Function to update shopping cart
 * shoppingCartId is the Cart identififer to update.
 */
async function updateShoppingCart(shoppingCartId: string, doc: any): Promise<any> {
  const response = await ShoppingCar.getInstance().patchRequest(`/${shoppingCartId}/items`, doc);
  if (response === undefined) return Promise.reject(new Error('updateShoppingCart'));
  const { data } = response;
  return data;
}

/**
 * Function to clear shoppingCart messages
 * shoppingCartId is the Cart identififer to update.
 */
async function clearShoppingCartMessages(shoppingCartId: string, doc: any): Promise<any> {
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/messages/clear`, doc);
  if (response === undefined) return Promise.reject(new Error('clearShoppingCartMessages'));
  const { data } = response;
  return data;
}

/**
 * Function to save the clientProfileData for the shopping cart.
 * shoppingCartId is the Cart identififer to update.
 */
async function saveClientProfileData(shoppingCartId: string, clientProfileData: ClientProfileDataInterface): Promise<any> {
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/attachments/clientProfileData`, clientProfileData);
  if (response === undefined) return Promise.reject(new Error('saveClientProfileData:/attachments/clientProfileData'));
  const { data } = response;
  return data;
}

/**
 * Function to set address in shoppingCart.
 */
async function saveShippingData(shoppingCartId: string, shippingData: ShippingData): Promise<any> {
  const response = await DocsApi.getInstance().postRequest(`/checkout/pub/orderForm/${shoppingCartId}/attachments/shippingData`, shippingData);
  if (response === undefined) return Promise.reject(new Error('saveClientProfileData:/attachments/shippingData'));
  const { data } = response;
  return data;
}

/**
 * Function to setCustom values in the orderForm.
 */
async function setCustomValues(orderFormId: string): Promise<any> {
  const response = await ShoppingCar.getInstance().putRequest(`/${orderFormId}/customData/dispositivo/mobile`, { value: 'true' });
  if (response === undefined) return Promise.reject(new Error('setCustomValues:/attachments'));
  const { data } = response;
  return data;
}

export {
  getCurrentShoppingCartOrCreateNewOne,
  getShoppingCart,
  updateShoppingCart,
  emptyShoppingCar,
  clearShoppingCartMessages,
  saveClientProfileData,
  saveShippingData,
  setCustomValues,
  forceToCreateNewShoppingCart
};
