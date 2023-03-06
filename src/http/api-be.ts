import axios, { AxiosError } from 'axios';
import { HttpClient } from './http-client';
import { ApiConfig } from './api-config';
import { GeneralApiProblem, getGeneralApiProblem } from './api-errors';
import { DeviceEventEmitter } from 'react-native';

export class BEApi extends HttpClient {
  static classInstance?: BEApi;

  private constructor() {
    if (global.showLogs__api_invoicing) {

    }

    super(ApiConfig('be'));

    // Interceptors (only for debug purpose), please do not remove the "return" line,
    // is  necessary to prevent a very confusing error and spend sometime to debug it.
    // https://github.com/svrcekmichal/redux-axios-middleware/issues/83
    this.instance.interceptors.request.use((request: any) => {
      if (global.showLogs__api_invoicing) {

      }
      return request;
    });

    this.instance.interceptors.response.use(
      (response: any) => {
        if (global.showLogs__api_invoicing) {

        }
        return response;
      },
      (error: any) => {
        if (global.showLogs__api_invoicing) {

        }
        this.handlerError(error);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new BEApi();
    }

    return this.classInstance;
  }

  async postRequest(path: string, payload: any) {
    return this.instance.post(path, payload);
  }

  async putRequest(path: string, payload: any) {
    return this.instance.put(path, payload);
  }

  async getRequest(path: string, payload?: any) {
    return this.instance.get(path, payload);
  }

  async deleteRequest(path: string, payload?: any) {
    return this.instance.get(path, payload);
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
