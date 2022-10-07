import { ShoppingCar } from '../http/api-shoppingCar';
import moment from 'moment';
import { ClientProfileDataInterface } from 'rtk';

/**
 * Function to create a shoppingCart
 */
async function getCurrentShoppingCartOrCreateNewOne(): Promise<any> {
  console.log('***************************************');
  const response = await ShoppingCar.getInstance().getRequest(``);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  return data;
}

/**
 * Function to get shoppingCartById
 * shoppingCartId is the shopping cart identifier.
 */
async function getShoppingCart(shoppingCartId: string): Promise<any> {
  console.log('***************************************');
  const response = await ShoppingCar.getInstance().getRequest(`${shoppingCartId}`);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
  console.log('size: ', Object.values(data.items).length);
  //console.log('text: ',data.messages[0].text);
  //console.log('imagen: ',data.items[0].imageUrl);
  //console.log('quantity: ',data.items[0].quantity);
  //console.log('name: ',data.items[0].name);
  console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
  return data;
}

/**
 * Function to empty shopping cart
 * shoppingCartId is the shopping cart identifier.
 */
async function emptyShoppingCar(shoppingCartId: string, doc: any): Promise<any> {
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/items/removeAll`, doc);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format());
  return data;
}

/**
 * Function to update shopping cart
 * shoppingCartId is the Cart identififer to update.
 */
async function updateShoppingCart(shoppingCartId: string, doc: any): Promise<any> {
  console.log('shoppingCartId:', shoppingCartId);
  const response = await ShoppingCar.getInstance().patchRequest(`/${shoppingCartId}/items`, doc);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format());
  return data;
}

/**
 * Function to clear shoppingCart messages
 * shoppingCartId is the Cart identififer to update.
 */
async function clearShoppingCartMessages(shoppingCartId: string, doc: any): Promise<any> {
  console.log('shoppingCartId:', shoppingCartId);
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/messages/clear`, doc);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format());
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

export { getCurrentShoppingCartOrCreateNewOne, getShoppingCart, updateShoppingCart, emptyShoppingCar, clearShoppingCartMessages, saveClientProfileData };
