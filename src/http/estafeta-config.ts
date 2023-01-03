import { AxiosRequestConfig } from 'axios';

export const EstafetaApiConfig = (): AxiosRequestConfig => {
  return {
    baseURL: 'https://trackingqa.estafeta.com',
    headers: {
      Accept: '*/*',
      'Content-Type': 'text/xml',
      charset: 'utf-8'
    }
  };
};
