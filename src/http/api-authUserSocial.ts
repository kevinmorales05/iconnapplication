import axios, { AxiosError } from 'axios';
import { HttpClient } from './http-client';
import { VTEXApiConfig } from './vtex-api-config';
import { GeneralApiProblem, getGeneralApiProblem } from './api-errors';
import { DeviceEventEmitter } from 'react-native';

export class AuthUserSocial extends HttpClient {
  static classInstance?: AuthUserSocial;

  private constructor() {
    if (global.showLogs__api_product) {
      console.log('AxiosRequestConfig ===> VTEXApiConfig social ===> \n\n', JSON.stringify(VTEXApiConfig('authUserSocial'), null, 3));
    }

    super(VTEXApiConfig('authUserSocial'));

    // Interceptors (only for debug purpose), please do not remove the "return" line,
    // is  necessary to prevent a very confusing error and spend sometime to debug it.
    // https://github.com/svrcekmichal/redux-axios-middleware/issues/83
    this.instance.interceptors.request.use(
      (request: any) => {
        const { headers, baseURL, method, url, data } = request;
        if (global.showLogs__api_product) {
          console.log(
            'INTERCEPTOR - Starting Request Social ===> \n\n',
            JSON.stringify(headers, null, 3),
            '\n',
            `baseURL: ${baseURL}`,
            '\n',
            `url: ${url}`,
            '\n',
            `method: ${method}`,
            '\n',
            `data: ${JSON.stringify(data, null, 3)}`
          );
        }

        return request;
      },
      (error: any) => {
        if (global.showLogs__api_product) {
          console.log('INTERCEPTOR Request Error ===> \n\n', JSON.stringify(error, null, 3));
        }
      }
    );

    this.instance.interceptors.response.use(
      (response: any) => {
        const { data, config } = response;
        if (global.showLogs__api_product) {
          console.log(
            `INTERCEPTOR - \nThe Response of METHOD: ${config.method} \nENDPOINT: ${config.baseURL}/${config.url} is ===> \n\n`,
            JSON.stringify(data, null, 3)
          );
        }
        return response;
      },
      (error: any) => {
        if (global.showLogs__api_product) {
          console.log('INTERCEPTOR Response Error ===> \n\n', JSON.stringify(error, null, 3));
        }
        this.handlerError(error);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(isNewLogin?: boolean) {
    if (!this.classInstance || isNewLogin) {
      this.classInstance = new AuthUserSocial();
    }

    return this.classInstance;
  }

  async getRequest(path: string) {
    return this.instance.get(path);
  }

  private handlerError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      let problem: GeneralApiProblem;
      problem = getGeneralApiProblem(err.response._response || err.response.status);
      console.error('GLOBAL EXCEPCIÓN ===> ', problem);
      if (problem) DeviceEventEmitter.emit('error', problem.kind.toString());
    } else {
      DeviceEventEmitter.emit('error', 'UNKNOWN ERROR');
    }
  };
}
