import { AxiosRequestConfig } from 'axios';

// TODO: comnplete the rest of configuration, bearer token, auth headers, environment with react-native-config...
const API_URL = 'https://3043-45-162-72-91.sa.ngrok.io/api';

/**
 * ICONN API
 * |^^^^^| Use this to consume every API Iconn context.
 * |  1  | For every API ICONN context (i.e: onboarding, billing etc.)
 * |,,,,,|
 */
export const ApiConfig = (): AxiosRequestConfig => {  
  return {
    baseURL: API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
};
