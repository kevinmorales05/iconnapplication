import { AxiosRequestConfig } from 'axios';

// TODO: comnplete the rest of configuration, bearer token, auth headers, environment with react-native-config...
const API_VTEX_ORDERS = 'https://oneiconn.myvtex.com/api/oms/user/orders';
const API_VTEX_AUTH = '';
const VTEX_APPKEY = 'vtexappkey-oneiconn-SOYFEO';
const VTEX_APPTOKEN = 'PNOSOIQKQXOYQSNSEIBGIYAWBWUWKPISEXCKGFMHMJYWKVXRQVEXRDTUSDPBTRTIEJFGLTUIVRLFTFTPGGYVAKOLCLCFYFVGYYMQJNAKMBTEAZFTORXDZWCYFALXSELQ'


const getApiUrl = (type: string) => {
  switch (type) {
    case 'orders':
      return API_VTEX_ORDERS;
    case 'auth':
      return API_VTEX_AUTH;
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
      'X-VTEX-API-AppKey': VTEX_APPKEY ,
      'X-VTEX-API-AppToken': VTEX_APPTOKEN ,
    }
  };
};
