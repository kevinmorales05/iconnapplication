import { AuthDataInterface } from 'rtk';
import { VtexUserApi } from '../http/vtex-api-users';

async function getUserByEmail(email: string): Promise<any> {
  const response = await VtexUserApi.getInstance().getRequest(`/dataentities/CL/search?email=${email}&_fields=_all`);
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  console.log('Aqui termina el getUserByEmail');
  return response;
}
async function putUserByEmail(updatedUser: AuthDataInterface): Promise<any> {
  const response = await VtexUserApi.getInstance().putRequest('/dataentities/CL/documents', updatedUser);
  if (response === undefined) return Promise.reject(new Error('putUser:/users/putUser'));
  const { data } = response;
  return data;
}

export const vtexUserServices = {
  getUserByEmail,
  putUserByEmail
};
