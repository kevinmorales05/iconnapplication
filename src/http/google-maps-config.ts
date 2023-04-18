import { AxiosRequestConfig } from 'axios';
import config from 'react-native-config';

const { GOOGLE_MAPS_URL_BASE } = config;

export const GoogleMapsApiConfig = (): AxiosRequestConfig => {
  return {
    baseURL: GOOGLE_MAPS_URL_BASE,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
};
