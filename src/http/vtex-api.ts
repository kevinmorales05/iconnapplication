import axios, { AxiosError } from 'axios';
import { HttpClient } from './http-client';
import { VTEXApiConfig } from './vtex-api-config';
import { GeneralApiProblem, getGeneralApiProblem } from './api-errors';
import { DeviceEventEmitter } from 'react-native';
import { store } from 'rtk';
import config from 'react-native-config';

// This contants are used to build custom base urls by branch/store according to the selected store.
// i.e: https://oneiconntienda50011.myvtex.com/ or https://oneiconntienda5005.myvtex.com/
const { VTEX_BRANCH_PREFIX, VTEX_BRANCH_SUFIX } = config;

export class VtexApi extends HttpClient {
  static classInstance?: VtexApi;

  private constructor() {
    if (global.showLogs__api_vtex) {
      console.log('AxiosRequestConfig ===> VTEXApiConfig ===> \n\n', JSON.stringify(VTEXApiConfig('vtex'), null, 3));
    }

    super(VTEXApiConfig('vtex'));

    // Interceptors (only for debug purpose), please do not remove the "return" line,
    // is  necessary to prevent a very confusing error and spend sometime to debug it.
    // https://github.com/svrcekmichal/redux-axios-middleware/issues/83
    this.instance.interceptors.request.use(
      (request: any) => {
        const newConfig: any = this.handleApiConfigByBranch(request.url);

        if (newConfig) {
          const { appKey, appToken } = newConfig.newHeaders;
          const { newBaseUrl } = newConfig;
          request.baseURL = newBaseUrl;
          request.headers['X-VTEX-API-AppKey'] = appKey;
          request.headers['X-VTEX-API-AppToken'] = appToken;
        }

        const { headers, baseURL, method, url, data } = request;

        if (global.showLogs__api_vtex) {
          console.log(
            'INTERCEPTOR - Starting Request ===> \n\n',
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
        console.error('INTERCEPTOR Request Error ===> \n\n', JSON.stringify(error, null, 3));
      }
    );

    this.instance.interceptors.response.use(
      (response: any) => {
        const { data, config } = response;
        if (global.showLogs__api_vtex) {
          console.log(
            `INTERCEPTOR - \nThe Response of METHOD: ${config.method} \nENDPOINT: ${config.baseURL}/${config.url} is ===> \n\n`,
            JSON.stringify(data, null, 3)
          );
        }
        return response;
      },
      (error: any) => {
        console.error('INTERCEPTOR Response Error ===> \n\n', JSON.stringify(error, null, 3));
        this.handlerError(error);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new VtexApi();
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
      let problem: GeneralApiProblem;
      problem = getGeneralApiProblem(err.response._response || err.response.status);
      console.error('GLOBAL EXCEPCIÓN ===> ', problem);
      if (problem) DeviceEventEmitter.emit('error', problem.kind.toString());
    } else {
      DeviceEventEmitter.emit('error', 'UNKNOWN ERROR');
    }
  };

  /**
   * Manage request according to the selected store.
   * Build a new URL to request for specific store/branch. Only applies for the following endpoints.
   * catalog/pvt/collection & pricing/prices (to get products and get their prices).
   * @param url
   * @returns an object with new headers for specific branch/store.
   */
  private handleApiConfigByBranch = (url: string) => {
    const { '# Tienda': storeId, '# Plaza': squareId } = store.getState().seller.defaultSeller!;
    const { VTEX_APPKEY: appKey } = store.getState().seller.defaultSeller!;
    const { VTEX_APPTOKEN: appToken } = store.getState().seller.defaultSeller!;

    if (url.includes('catalog/pvt/collection') || url.includes('pricing/prices')) {
      let branchConfig = {
        newBaseUrl: `${VTEX_BRANCH_PREFIX}${squareId}${storeId}${VTEX_BRANCH_SUFIX}`,
        newHeaders: { appKey: appKey, appToken: appToken }
      };

      return branchConfig;
    }
    return null;
  };
}
