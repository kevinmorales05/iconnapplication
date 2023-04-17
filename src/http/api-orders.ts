import axios, { AxiosError } from 'axios';
import { HttpClient } from './http-client';
import { ApiConfig } from './api-config';
import { GeneralApiProblem, getGeneralApiProblem } from './api-errors';
import { DeviceEventEmitter } from 'react-native';

export class OrdersApi extends HttpClient {
  static classInstance?: OrdersApi;

  private constructor() {
    super(ApiConfig('orders'));

    this.instance.interceptors.request.use(
      (request: any) => {
        return request;
      },
      (_error: any) => {}
    );

    this.instance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        this.handlerError(error);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new OrdersApi();
    }

    return this.classInstance;
  }

  async postRequest(path: string, payload: any) {
    return this.instance.post(path, payload);
  }

  async putRequest(path: string, payload: any) {
    return this.instance.put(path, payload);
  }

  async getRequest(path: string) {
    return this.instance.get(path);
  }

  async deleteRequest(path: string, payload?: any) {
    return this.instance.get(path, payload);
  }

  private handlerError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      if (err.response?.data) return;
      let problem: GeneralApiProblem;
      problem = getGeneralApiProblem(err.response!.status);
      if (problem) DeviceEventEmitter.emit('error', problem.kind.toString());
    } else {
      DeviceEventEmitter.emit('error', `Error: ${err.name}\nMessage: ${err.message}`);
    }
  };
}
