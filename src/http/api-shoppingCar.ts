import axios, { AxiosError } from 'axios';
import { HttpClient } from './http-client';
import { VTEXApiConfig } from './vtex-api-config';
import { GeneralApiProblem, getGeneralApiProblem } from './api-errors';
import { DeviceEventEmitter } from 'react-native';

export class ShoppingCar extends HttpClient {
  static classInstance?: ShoppingCar;

  private constructor() {
    if (global.showLogs__api_shoppingCart) {
      // console.log('AxiosRequestConfig ===> VTEXApiConfig ===> \n\n', JSON.stringify(VTEXApiConfig('shoppingCar'), null, 3));
    }

    super(VTEXApiConfig('shoppingCar'));

    // Interceptors (only for debug purpose), please do not remove the "return" line,
    // is  necessary to prevent a very confusing error and spend sometime to debug it.
    // https://github.com/svrcekmichal/redux-axios-middleware/issues/83
    this.instance.interceptors.request.use(
      (request: any) => {
        // const { headers, baseURL, method, url, data } = request;
        // const { common, get, head, delete: toDelete, post, put, patch, ...mainHeaders } = headers;

        // if (global.showLogs__api_shoppingCart) {
        //   console.log(
        //     'INTERCEPTOR - Starting Request ===> \n\n',
        //     JSON.stringify(mainHeaders, null, 3),
        //     '\n',
        //     `baseURL: ${baseURL}`,
        //     '\n',
        //     `url: ${url}`,
        //     '\n',
        //     `method: ${method}`,
        //     '\n',
        //     `data: ${JSON.stringify(data, null, 3)}`
        //   );
        // }

        return request;
      }
      // (error: any) => {
      //   if (global.showLogs__api_shoppingCart) {
      //     // console.log('INTERCEPTOR Request Error ===> \n\n', JSON.stringify(error, null, 3));
      //   }
      // }
    );

    this.instance.interceptors.response.use(
      (response: any) => {
        // const { data, config } = response;
        if (global.showLogs__api_shoppingCart) {
          // console.log(
          //   `INTERCEPTOR - \nThe Response of METHOD: ${config.method} \nENDPOINT: ${config.baseURL}/${config.url} is ===> \n\n`,
          //   JSON.stringify(data, null, 3)
          // );
        }
        return response;
      },
      (error: any) => {
        if (global.showLogs__api_shoppingCart) {
          // console.log('INTERCEPTOR Response Error ===> \n\n', JSON.stringify(error, null, 3));
        }
        this.handlerError(error);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ShoppingCar();
    }

    return this.classInstance;
  }

  async getRequest(path: string) {
    return this.instance.get(path);
  }

  async putRequest(path: string, payload: any) {
    return this.instance.put(path, payload);
  }

  async postRequest(path: string, payload?: any) {
    return this.instance.post(path, payload);
  }

  async patchRequest(path: string, payload?: any) {
    return this.instance.patch(path, payload);
  }

  private handlerError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      let problem: GeneralApiProblem;
      problem = getGeneralApiProblem(err.response._response || err.response.status);
      // console.error('GLOBAL EXCEPCIÓN ===> ', problem);
      if (problem) DeviceEventEmitter.emit('error', problem.kind.toString());
    } else {
      DeviceEventEmitter.emit('error', 'UNKNOWN ERROR');
    }
  };
}
