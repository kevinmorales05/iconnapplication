import { GoogleMapsApiConfig } from './google-maps-config';
import { DeviceEventEmitter } from 'react-native';
import { GeneralApiProblem, getGeneralApiProblem } from './api-errors';
import { HttpClient } from './http-client';
import axios, { AxiosError } from 'axios';

export class GoogleMapsApi extends HttpClient {
  static classInstance?: GoogleMapsApi;

  private constructor() {
    super(GoogleMapsApiConfig());

    this.instance.interceptors.request.use(
      (request: any) => {
        return request;
      },
      (error: any) => {
        DeviceEventEmitter.emit('error', `Error: ${JSON.stringify(error)}`);
      }
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
      this.classInstance = new GoogleMapsApi();
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
    return this.instance.delete(path, payload);
  }
  async patchRequest(path: string, payload?: any) {
    return this.instance.patch(path, payload);
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
