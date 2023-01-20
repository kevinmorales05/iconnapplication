import { AxiosRequestConfig } from 'axios';
import config from 'react-native-config';

const { API_URL_USERS, API_URL_OTPS, API_URL_INVOICING, API_URL_HELP_CENTER, API_AUTHORIZATION, API_URL_BE } = config;

const getApiUrl = (type: string) => {
  switch (type) {
    case 'users':
      return API_URL_USERS;
    case 'otps':
      return API_URL_OTPS;
    case 'invoicing':
      return API_URL_INVOICING;
    case 'helpCenter':
      return API_URL_HELP_CENTER;
    case 'be':
      return API_URL_BE;
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
      Authorization: API_AUTHORIZATION!
    }
  };
};
