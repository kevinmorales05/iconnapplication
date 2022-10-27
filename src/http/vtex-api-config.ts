import { AxiosRequestConfig } from 'axios';
import { store } from 'rtk';
import config from 'react-native-config';

const {
  API_VTEX_ORDERS,
  API_VTEX_ORDER,
  API_VTEX_USER,
  API_VTEX_SHOPPINGCAR,
  API_VTEX_SHOPPINGCAR_CREATION,
  API_VTEX_PRODUCTS,
  API_VTEX_PRODUCT,
  API_VTEX_SUGGESTED_PRODUCTS,
  API_VTEX_PRICE,
  API_VTEX_PROMOTIONS,
  VTEX_APPKEY,
  VTEX_APPTOKEN,
  VTEX_DOCS,
  VTEX_DOCS_NO_API_PREFIX,
  API_VTEX_SEARCH_PRODUCTS,
  VTEX_REVIEWS_RATINGS,
  API_VTEX_PICKUP,
  API_VTEX_PATHC_FAVORITES
} = config;

const getApiUrl = (type: string) => {
  switch (type) {
    case 'orders':
      return API_VTEX_ORDERS;
    case 'order':
      return API_VTEX_ORDER;
    case 'auth':
      return VTEX_DOCS;
    case 'shoppingCar':
      return API_VTEX_SHOPPINGCAR;
    case 'shoppingCarCreation':
      return API_VTEX_SHOPPINGCAR_CREATION;
    case 'docs':
      return VTEX_DOCS;
    case 'products':
      return API_VTEX_PRODUCTS;
    case 'product':
      return API_VTEX_PRODUCT;
    case 'promotions':
      return API_VTEX_PROMOTIONS;
    case 'suggestedProducts':
      return API_VTEX_SUGGESTED_PRODUCTS;
    case 'productPrice':
      return API_VTEX_PRICE;
    case 'docsNoApiPrefix':
      return VTEX_DOCS_NO_API_PREFIX;
    case 'searchProducts':
      return API_VTEX_SEARCH_PRODUCTS;
    case 'user':
      return API_VTEX_USER;
    case 'reviews':
      return VTEX_REVIEWS_RATINGS;
    case 'authUserSocial':
      return VTEX_DOCS;
    case 'pickUpPoints':
      return API_VTEX_PICKUP;
    case 'favorites':
      return API_VTEX_PATHC_FAVORITES;
    default:
      break;
  }
};

/**
 * VTEX API
 * |^^^^^| Use this to consume every VTEX API.
 * |  1  | For every VTEX API context (i.e: login, onboarding, orders etc.)
 * |,,,,,|
 */
export const VTEXApiConfig = (type: string): AxiosRequestConfig => {
  const { authCookie, accountAuthCookie } = store.getState().auth.user;
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APPKEY!,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN!,
      Cookie: authCookie?.Name + '=' + authCookie?.Value + '; ' + accountAuthCookie?.Name + '=' + accountAuthCookie?.Value + ';'
    }
  };
};

export const VTEXApiAuthConfig = (type: string): AxiosRequestConfig => {
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
      'X-VTEX-API-AppKey': VTEX_APPKEY!,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN!
    }
  };
};

export const VTEXApiUserConfig = (type: string): AxiosRequestConfig => {
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: 'application/vnd.vtex.ds.v10+json',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APPKEY!,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN!
    }
  };
};
export const VTEXApiFavConfig = (type: string): AxiosRequestConfig => {
  const { authCookie, accountAuthCookie } = store.getState().auth.user;
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APPKEY!,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN!,
      Cookie: authCookie?.Name + '=' + authCookie?.Value + '; ' + accountAuthCookie?.Name + '=' + accountAuthCookie?.Value + ';'
    }
  };
};
