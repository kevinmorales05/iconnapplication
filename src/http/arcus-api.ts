import { ARCUSApiConfig } from './arcus-config';
import { DeviceEventEmitter } from 'react-native';
import { GeneralApiProblem, getGeneralApiProblem } from './api-errors';
import { HttpClient } from './http-client';
import axios, { AxiosError } from 'axios';
import config from 'react-native-config';
import CryptoJS from 'crypto-js';

const { ARCUS_APIKEY, ARCUS_SECRETKEY } = config;

export class ArcusApi extends HttpClient {
  static classInstance?: ArcusApi;

  private constructor() {
    super(ARCUSApiConfig());

    this.instance.interceptors.request.use(
      (request: any) => {
        const { url } = request;
        const currentDate = new Date().toUTCString();
        const contentMD5 = '';
        const checksumString = `application/json,${contentMD5},${url},${currentDate}`;
        const hash = CryptoJS.HmacSHA1(checksumString, ARCUS_SECRETKEY!);
        const token = hash.toString(CryptoJS.enc.Base64);

        request.headers.Date = currentDate;
        request.headers.Authorization = `APIAuth ${ARCUS_APIKEY}:${token}`;

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
      this.classInstance = new ArcusApi();
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
