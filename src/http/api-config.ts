import { AxiosRequestConfig } from 'axios';

// TODO: comnplete the rest of configuration, bearer token, auth headers, environment with react-native-config...
const API_URL_USERS = 'https://api-users-dev.apps-backend.iconn.com.mx';
const API_URL_OTPS = 'https://api-otps-dev.apps-backend.iconn.com.mx';
const API_URL_INVOICING = 'https://api-invoicing-dev.apps-backend.iconn.com.mx';
const API_AUTHORIZATION = 'PhMMVFxFPNwk6sloACc5';

const getApiUrl = (type: string) => {
  switch (type) {
    case 'users':
      return API_URL_USERS;
    case 'otps':
      return API_URL_OTPS;
    case 'invoicing':
      return API_URL_INVOICING;
    default:
      break;
  }
};

/**
 * ICONN API
 * |^^^^^| Use this to consume every API Iconn context.
 * |  1  | For every API ICONN context (i.e: onboarding, billing etc.)
 * |,,,,,|
 */
export const ApiConfig = (type: string): AxiosRequestConfig => {
  return {
    baseURL: getApiUrl(type),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: API_AUTHORIZATION
    }
  };
};
