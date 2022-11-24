import { AxiosRequestConfig } from 'axios';
import config from 'react-native-config';

const { LIVE_STATUS_WIDGET_BASE_URL } = config;

export const LiveStatusApiConfig = (): AxiosRequestConfig => {
  // console.log({liveStatusApiConfig: LIVE_STATUS_WIDGET_BASE_URL})
  return {
    baseURL: LIVE_STATUS_WIDGET_BASE_URL,
    headers: {
      'x-api-key': 'cDp6bEjr4AyBkKMLhAwwLQErmrEEzHuebZpogbAr4rLGYeeA',
      Accept: '*/*'
    }
  };
};
