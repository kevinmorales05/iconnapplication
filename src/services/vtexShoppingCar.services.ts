import { ShoppingCar } from '../http/api-shoppingCar';
import moment from 'moment'
import { LengthType } from '../components/types/length-type';
import { SizeType } from '../components/types/size-type';

/**
 * Function to create a shoppingCart
 */
 async function getCurrentShoppingCartOrCreateNewOne(authName: string, authValue:string ,accountTName: string,accountTValue:string): Promise<any> {
  console.log('***************************************');
    const response = await ShoppingCar.getInstance().getRequest(``,{ headers: { Cookie:  accountTName+'='+accountTValue+'; '+authName+'='+authValue} });
    if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
    const { data } = response;
    return data;
  }

/**
 * Function to get shoppingCartById
 * shoppingCartId is the shopping cart identifier.
 */
 async function getShoppingCart(shoppingCartId:string): Promise<any> {
  console.log('***************************************');
    const response = await ShoppingCar.getInstance().getRequest(`${shoppingCartId}`,undefined);
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
 async function emptyShoppingCar(shoppingCartId:string, doc: any): Promise<any> {
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/items/removeAll`,doc);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format())
  return data;
}

/**
 * Function to update shopping cart
 * shoppingCartId is the Cart identififer to update.
 */
 async function updateShoppingCart(shoppingCartId:string, doc: any): Promise<any> {
  console.log('shoppingCartId:',shoppingCartId);
  const response = await ShoppingCar.getInstance().patchRequest(`/${shoppingCartId}/items`, doc);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format())
  return data;
}

/**
 * Function to clear shoppingCart messages
 * shoppingCartId is the Cart identififer to update.
 */
 async function clearShoppingCartMessages(shoppingCartId:string, doc: any): Promise<any> {
  console.log('shoppingCartId:',shoppingCartId);
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/messages/clear`, doc);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format())
  return data;
}

export {
  getCurrentShoppingCartOrCreateNewOne,
  getShoppingCart,
  updateShoppingCart,
  emptyShoppingCar,
  clearShoppingCartMessages
};
