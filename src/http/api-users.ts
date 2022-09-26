import { AxiosRequestConfig } from 'axios';
import { HttpClient } from './http-client';
import { VTEXApiAuthConfig } from './vtex-api-config';

export class UsersApi extends HttpClient {
  
  static classInstance?: UsersApi;

  private constructor() {
    // console.log(
    //   'AxiosRequestConfig ===> ApiConfig ===> \n\n',
    //   JSON.stringify(VTEXApiAuthConfig('auth'), null, 3)
    // );

    super(VTEXApiAuthConfig('auth'));

    // Interceptors (only for debug purpose), please do not remove the "return" line,
    // is  necessary to prevent a very confusing error and spend sometime to debug it.
    // https://github.com/svrcekmichal/redux-axios-middleware/issues/83
    this.instance.interceptors.request.use(
      (request: any) => {
        const { headers, baseURL, method, url, data } = request;
        // console.log(
        //   'INTERCEPTOR - Starting Request ===> \n\n',
        //   JSON.stringify(headers, null, 3),
        //   '\n',
        //   `baseURL: ${baseURL}`,
        //   '\n',
        //   `url: ${url}`,
        //   '\n',
        //   `method: ${method}`,
        //   '\n',
        //   `data: ${JSON.stringify(data, null, 3)}`
        // );

        return request;
      },
      (error: any) => console.log('INTERCEPTOR Request Error ===> \n\n', JSON.stringify(error, null, 3))
    );

    this.instance.interceptors.response.use(
      (response: any) => {
        const { data } = response;
        // console.log(
        //   'INTERCEPTOR - The Response is ===> \n\n',
        //   JSON.stringify(data, null, 3)
        // );
        return response;
      }
    );
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UsersApi();
    }

    return this.classInstance;
  }

  async postRequest(path: string, payload: any, config?: AxiosRequestConfig) {
    return this.instance.post(path, payload, config);
  }

  async putRequest(path: string, payload: any) {
    return this.instance.put(path, payload);
  }

  async getRequest(path: string, payload?: any) {
    return this.instance.get(path, payload);
  }

}
