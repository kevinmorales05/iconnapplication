import { AxiosRequestConfig } from 'axios';
import config from 'react-native-config';

const { ARCUS_BASE_URL } = config;

export const ARCUSApiConfig = (): AxiosRequestConfig => {
  return {
    baseURL: ARCUS_BASE_URL,
    headers: {
      Accept: 'application/vnd.regalii.v3.mx+json',
      'Content-Type': 'application/json'
    }
  };
};
