import { VTEXApiConfig } from '../http/vtex-api-config';
import { Auth } from '../http/vtex-api-auth';
import { HttpClient } from '../http/http-client';
import Config from 'react-native-config';
import config from 'react-native-config';

const { ACCOUNT_NAME } = config;

 async function startAuthentication(email:string): Promise<any> {
    const { API_VTEX_AUTH } = Config;
    const response = await Auth.getInstance().getRequest(`start?callbackUrl=${API_VTEX_AUTH}/api/vtexid/pub/authentication/finish&scope=oneiconn&user=${email}&locale=MX&accountName=${ACCOUNT_NAME}&returnUrl=/&appStart=true`);
    if (response === undefined) return Promise.reject(new Error('/api/vtexid/pub/authentication/start/'));
    console.log('Aqui termina el start Authentication')
    const { data } = await response;
    
    let access_token = await data.authenticationToken;

    // TODO: check if this is useful or works.
    HttpClient.accessToken = access_token;

    return data;
  }
  


export const vtexauthServices = {
    startAuthentication,
};
