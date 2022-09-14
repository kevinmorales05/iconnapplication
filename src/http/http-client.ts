import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public static bearerToken?: string = '';
  public static accessToken?: string = '';

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }
}
