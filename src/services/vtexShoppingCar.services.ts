import { ShoppingCar } from '../http/api-shoppingCar';
import moment from 'moment'
import { LengthType } from '../components/types/length-type';
import { SizeType } from '../components/types/size-type';

/**
 * Function to get shoppingCartById
 * shoppingCartId is the shopping cart identifier.
 */
 async function getShoppingCart(shoppingCartId:string): Promise<any> {
  console.log('***************************************');
    const response = await ShoppingCar.getInstance().getRequest(`${shoppingCartId}`);
    if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
    const { data } = response;
    console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('size: ', Object.values(data.items).length);
    console.log('text: ',data.messages[0].text);
    console.log('imagen: ',data.items[0].imageUrl);
    console.log('quantity: ',data.items[0].quantity);
    console.log('name: ',data.items[0].name);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
    return data;
  }

/**
 * Function to empty shopping cart
 * shoppingCartId is the shopping cart identifier.
 */
 async function emptyShoppingCar(shoppingCartId:string): Promise<any> {
  const response = await ShoppingCar.getInstance().postRequest(`/${shoppingCartId}/items/removeAll`);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format())
  return data;
}

/**
 * Function to update shopping cart
 * shoppingCartId is the Cart identififer to update.
 */
 async function updateShoppingCart(shoppingCartId:string, allowedOutdatedData:string): Promise<any> {
  const response = await ShoppingCar.getInstance().patchRequest(`/${shoppingCartId}/items?allowedOutdatedData=${allowedOutdatedData}`,45);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  const { data } = response;
  console.log(moment().format())
  return data;
}
  
export {
  getShoppingCart,
  updateShoppingCart,
  emptyShoppingCar
};
