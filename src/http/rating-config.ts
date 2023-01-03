import { AxiosRequestConfig } from 'axios';
import config from 'react-native-config';

export const RatingConfig = (): AxiosRequestConfig => {
  const { RATING_BASE_URL } = config;
  return {
    baseURL: RATING_BASE_URL,
    headers: {
      Accept: '*/*',
      Authorization: 'PhMMVFxFPNwk6sloACc5'
    }
  };
};
