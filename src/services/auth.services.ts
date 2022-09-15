import { AuthDataInterface } from 'rtk';
import { OtpsApi } from '../http/api-otps';
import { UsersApi } from '../http/api-users';
import { HttpClient } from '../http/http-client';

/**
 * Function to login user
 * @param email
 * @param password
 * @param authenticationToken
 */
async function login(email: string, password: string, authenticationToken: string): Promise<any> {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('authenticationToken', authenticationToken);

  const response = await UsersApi.getInstance().postRequest(`/vtexid/pub/authentication/classic/validate`, formData);

  if (response === undefined) return Promise.reject(new Error(`login:/vtexid/pub/authentication/classic/validate`));

  const { data } = response;
  let authCookie = await data.authCookie;
  HttpClient.authCookie = authCookie;
  let accountAuthCookie = await data.accountAuthCookie;
  HttpClient.accountAuthCookie = accountAuthCookie;
  return data;
}

const API_VTEX_AUTH = 'https://oneiconn.myvtex.com/api/vtexid/pub/authentication/';

async function startAuthentication(email: string): Promise<any> {
  const response = await UsersApi.getInstance().getRequest(
    `/vtexid/pub/authentication/start?callbackUrl=${API_VTEX_AUTH}/api/vtexid/pub/authentication/finish&scope=oneiconn&user=${email}&locale=MX&accountName=oneiconn&returnUrl=/&appStart=true`
  );
  if (response === undefined) return Promise.reject(new Error('/api/vtexid/pub/authentication/start/'));
  console.log('Aqui termina el start Authentication');
  const { data } = response;

  let access_token = await data.authenticationToken;

  HttpClient.accessToken = access_token;

  return data;
}

async function sendAccessKey(email: string, authenticationToken: string): Promise<any> {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('authenticationToken', authenticationToken);

  const response = await UsersApi.getInstance().postRequest(`/accesskey/send`, formData);

  if (response === undefined) return Promise.reject(new Error(`/accesskey/send`));

  const { data } = await response;

  return data;
}
/**
 * Function to validate user status
 * @param email
 */
async function validateUser(uidOrEmail: string): Promise<any> {
  const response = await UsersApi.getInstance().getRequest(`/users/validateUser/${uidOrEmail}`);
  if (response === undefined) return Promise.reject(new Error(`validateUser:/users/validateUser/${uidOrEmail}`));
  const { data } = response;
  return data;
}

/**
 * function to save email in DB and send to it an OTP. (pre-register)
 * @param email
 * @returns
 */
async function preSignUp(email: string): Promise<any> {
  const response = await OtpsApi.getInstance().postRequest('/otps/create', { email });
  if (response === undefined) return Promise.reject(new Error('preSignUp:otps/create'));
  const { data } = response;
  return data.resp;
}

/**
 * Function to validate sended OTP via email.
 * @param otp
 * @returns
 */
async function otpValidate(email?: string, code?: string): Promise<any> {
  const response = await OtpsApi.getInstance().getRequest(`/otps/validate/${code}/${email}`);
  if (response === undefined) return Promise.reject(new Error('otpValidate:/otps/validate'));
  const { data } = response;
  return data.resp;
}

/**
 * (DEPRECATED)
 * TODO: Remove this function, currently isn't used.
 * Function to register user. (signup)
 * @param user
 * @returns
 */
async function register(user: AuthDataInterface): Promise<any> {
  const response = await UsersApi.getInstance().postRequest('/users/register', user);
  if (response === undefined) return Promise.reject(new Error('register:/users/register'));
  const { data } = response;
  return data.resp;
}

/**
 * Function to register with firebase. (signup)
 * @param user
 * @returns
 */
async function registerWithFirebase(user: AuthDataInterface): Promise<any> {
  const response = await UsersApi.getInstance().postRequest('/users/registerWithFireBase', user);
  if (response === undefined) return Promise.reject(new Error('registerWithFirebase:/users/registerWithFireBase'));
  const { data } = response;
  return data.resp;
}

/**
 * Function to get current User.
 * @param user
 * @returns
 */
async function getUser(user: AuthDataInterface): Promise<any> {
  const response = await UsersApi.getInstance().getRequest(`/users/getUser/${user.user_id}`);
  if (response === undefined) return Promise.reject(new Error('getUser:/users/getUser'));
  const { data } = response;
  return data.resp;
}

/**
 * Function to update current User.
 * @param user
 * @returns
 */
async function putUser(user: AuthDataInterface): Promise<any> {
  const { user_id } = user;
  const response = await UsersApi.getInstance().putRequest(`/users/putUser/${user_id}`, user);
  if (response === undefined) return Promise.reject(new Error('putUser:/users/putUser'));
  const { data } = response;
  return data;
}

/**
 * Function to update the current User password.
 * @param user
 * @returns
 */
async function updateUserPassword(user: AuthDataInterface): Promise<any> {
  const { user_id } = user;
  const response = await UsersApi.getInstance().putRequest(`/users/updateUserPassword/${user_id}`, user);
  if (response === undefined) return Promise.reject(new Error('updateUserPassword:/users/updateUserPassword'));
  const { data } = response;
  return data;
}

/**
 * Function to send an email to recover password.
 * @param user
 * @returns
 */
async function sendEmailtoRecoverPassword(user: AuthDataInterface): Promise<any> {
  const response = await UsersApi.getInstance().getRequest(`/users/sendEmailForPasswordRecovery/${user.email}`);
  if (response === undefined) return Promise.reject(new Error('sendEmailtoRecoverPassword:users/sendEmailForPasswordRecovery'));
  const { data } = response;
  return data;
}

export const authServices = {
  login,
  sendAccessKey,
  validateUser,
  preSignUp,
  otpValidate,
  register,
  registerWithFirebase,
  getUser,
  putUser,
  sendEmailtoRecoverPassword,
  updateUserPassword,
  startAuthentication
};
