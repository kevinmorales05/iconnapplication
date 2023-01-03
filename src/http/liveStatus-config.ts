import { AxiosRequestConfig } from 'axios';
import config from 'react-native-config';

const { LIVE_STATUS_WIDGET_BASE_URL, LIVE_STATUS_WIDGET_API_KEY } = config;

export const LiveStatusApiConfig = (): AxiosRequestConfig => {
  // console.log({liveStatusApiConfig: LIVE_STATUS_WIDGET_BASE_URL})
  return {
    baseURL: LIVE_STATUS_WIDGET_BASE_URL,
    headers: {
      'x-api-key': LIVE_STATUS_WIDGET_API_KEY,
      Accept: '*/*'
    }
  };
};
