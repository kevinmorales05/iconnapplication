import { AxiosRequestConfig } from 'axios';

// TODO: comnplete the rest of configuration, bearer token, auth headers, environment with react-native-config...
const API_VTEX_ORDERS = 'https://oneiconn.myvtex.com/api/oms/pvt/orders';
const API_VTEX_ORDER = 'https://oneiconn.myvtex.com/api/orders/pvt';
const API_VTEX_USER = 'https://api.vtex.com/oneiconn'
const API_VTEX_SHOPPINGCAR = 'https://oneiconn.myvtex.com/api/checkout/pub/orderForm';
const API_VTEX_PRODUCTS = 'https://oneiconn.myvtex.com/api/catalog_system/pvt/products';
const API_VTEX_PRODUCT = 'https://oneiconn.myvtex.com/api/catalog/pvt';
const VTEX_APPKEY = 'vtexappkey-oneiconn-PSWGUP';
const VTEX_APPTOKEN = 'SOLVDAEGJAIWHXZATCDTDGNYKYYKKEUKEQNGWBAKCTJNLTMKIXFQMCASWIQTZEPZZVUWNCFZYXPPAUVSQNRFTWYBRIFRJKBIFSQBJVWBAGOKVBQAYAMKPOOUFGEJTJYV';
const VTEX_DOCS = 'https://oneiconn.myvtex.com/api';
const VTEX_DOCS_NO_API_PREFIX = 'https://oneiconn.myvtex.com';
const API_VTEX_SEARCH_PRODUCTS = 'http://oneiconn.vtexcommercestable.com.br/buscaautocomplete?productNameContains=';

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
    case 'docs':
      return VTEX_DOCS;
    case 'products':
      return API_VTEX_PRODUCTS;
    case 'product':
      return API_VTEX_PRODUCT;
    case 'docsNoApiPrefix':
      return VTEX_DOCS_NO_API_PREFIX;
    case 'searchProducts':
      return API_VTEX_SEARCH_PRODUCTS;
    case 'user': 
      return API_VTEX_USER;
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
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APPKEY,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN
    }
  };
};

export const VTEXApiAuthConfig = (type: string): AxiosRequestConfig => {
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
      'X-VTEX-API-AppKey': VTEX_APPKEY,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN
    }
  };
};

export const VTEXApiUserConfig = (type: string): AxiosRequestConfig => {
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: 'application/vnd.vtex.ds.v10+json',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APPKEY,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN
    }
  };
};
