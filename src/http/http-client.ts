import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AuthCookie } from 'rtk';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public static bearerToken?: string = '';
  public static accessToken?: string = '';
  public static authCookie?: AuthCookie;
  public static accountAuthCookie?: AuthCookie;

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }
}
