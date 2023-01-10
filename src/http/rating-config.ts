import { AxiosRequestConfig } from 'axios';
import config from 'react-native-config';

export const RatingConfig = (): AxiosRequestConfig => {
  const { API_AUTHORIZATION, RATING_BASE_URL } = config;
  return {
    baseURL: RATING_BASE_URL,
    headers: {
      Accept: '*/*',
      Authorization: API_AUTHORIZATION!
    }
  };
};
