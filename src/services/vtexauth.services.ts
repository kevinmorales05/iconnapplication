import { VTEXApiConfig } from '../http/vtex-api-config';
import { Auth } from '../http/vtex-api-auth';
import { HttpClient } from '../http/http-client';

// TODO: relocate this url to .ENV
const API_VTEX_AUTH = 'https://oneiconn.myvtex.com/api/vtexid/pub/authentication/';

 async function startAuthentication(email:string): Promise<any> {
    const response = await Auth.getInstance().getRequest(`start?callbackUrl=${API_VTEX_AUTH}/api/vtexid/pub/authentication/finish&scope=oneiconn&user=${email}&locale=MX&accountName=oneiconn&returnUrl=/&appStart=true`);
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
