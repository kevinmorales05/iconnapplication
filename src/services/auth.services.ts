import { AxiosRequestConfig } from 'axios';
import { AuthCookie, AuthDataInterface } from 'rtk';
import { OtpsApi } from '../http/api-otps';
import { OnboardingApi } from '../http/vtex-api-onboarding';
import { AuthUserSocial } from '../http/api-authUserSocial';
import { UsersApi } from '../http/api-users';
import { HttpClient } from '../http/http-client';
import Config from 'react-native-config';
import config from 'react-native-config';
const {ACCOUNT_NAME} = config;

// TODO: relocate the headers to api-config file.
async function newUser(userEmail: AuthDataInterface): Promise<any> {
  const response = await OnboardingApi.getInstance().postRequest(`/dataentities/CL/documents`, userEmail, {
    headers: { Accept: 'application/json', 'Content-type': 'application/json' }
  });
  if (response === undefined) return Promise.reject(new Error(`/vtexid/pub/authentication/logout?scope=${ACCOUNT_NAME}`));
  const { data } = response;
  console.log('NEW USER', data);
  return data;
}

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
  const response = await OnboardingApi.getInstance().postRequest(`/vtexid/pub/authentication/classic/validate`, formData);
  if (response === undefined) return Promise.reject(new Error(`login:/vtexid/pub/authentication/classic/validate`));
  const { data } = response;
  return data;
}

/**
 * Function to logout
 */
async function logOutUser(): Promise<any> {
  const response = await OnboardingApi.getInstance().getRequest(`/vtexid/pub/authentication/logout?scope=${ACCOUNT_NAME}`);
  if (response === undefined) return Promise.reject(new Error(`/vtexid/pub/authentication/logout?scope=${ACCOUNT_NAME}`));
  const { data } = response;
  console.log('LOGOUT', data);
  return data;
}

async function startAuthentication(email: string): Promise<any> {
  const { API_VTEX_AUTH } = Config;
  const response = await OnboardingApi.getInstance().getRequest(
    `/vtexid/pub/authentication/start?callbackUrl=${API_VTEX_AUTH}/vtexid/pub/authentication/finish&scope=${ACCOUNT_NAME}&user=${email}&locale=MX&accountName=${ACCOUNT_NAME}&returnUrl=/&appStart=true`
  );
  if (response === undefined) return Promise.reject(new Error('startAuthentication:vtexid/pub/authentication/finish'));
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

  const response = await OnboardingApi.getInstance().postRequest(`/vtexid/pub/authentication/accesskey/send`, formData);

  if (response === undefined) return Promise.reject(new Error(`sendAccessKey:vtexid/pub/authentication/accesskey/send`));

  const { data } = await response;

  return data;
}

async function createPassword(newPassword: string, accesskey: string, email: string, authenticationToken: string): Promise<any> {
  const formData = new FormData();
  formData.append('newPassword', newPassword);
  formData.append('accesskey', accesskey);
  formData.append('email', email);
  formData.append('authenticationToken', authenticationToken);

  const response = await OnboardingApi.getInstance().postRequest(`/vtexid/pub/authentication/classic/setpassword?scope=${ACCOUNT_NAME}&locale=MX`, formData, {
    headers: {
      Accept: 'application/json'
    }
  });

  if (response === undefined) return Promise.reject(new Error(`createPassword:/vtexid/pub/authentication/classic/setpassword`));
  const { data } = await response;
  return data;
}

// TODO: relocate this headers to api-config file.
async function createUser(email: string, name: string | null = null): Promise<any> {
  const response = await OnboardingApi.getInstance().postRequest(
    `/license-manager/users`,
    { email, name },
    { headers: { Accept: 'application/json', 'content-type': 'application/json' } }
  );

  if (response === undefined) return Promise.reject(new Error(`createUser:/license-manager/users`));

  const { data } = await response;

  return data;
}

/**
 * Function to validate user status
 * @param email
 */
async function validateUser(uidOrEmail: string): Promise<any> {
  const response = await OnboardingApi.getInstance().getRequest(`/users/validateUser/${uidOrEmail}`);
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
 * Function to register user after vtex register. (signup)
 * @param user
 * @returns
 */
async function register(user: AuthDataInterface): Promise<any> {
  const response = await UsersApi.getInstance().postRequest('/users/register', user);
  if (response === undefined) return Promise.reject(new Error('register:/users/register'));
  const { data } = response;
  return data;
}

/**
 * Function to get current User.
 * @param user
 * @returns
 */
async function getUser(user: AuthDataInterface): Promise<any> {
  const response = await OnboardingApi.getInstance().getRequest(`/users/getUser/${user.userId}`);
  if (response === undefined) return Promise.reject(new Error('getUser:/users/getUser'));
  const { data } = response;
  return data.resp;
}

/**
 * Function to get current UserProfile.
 * @param email
 * @returns
 */
async function getProfile(email: string): Promise<any> {
  const { baseUrl } = Config;
  const response = await OnboardingApi.getInstance().getRequest(`/dataentities/CL/search?email=${email}&_fields=_all`, {
    baseUrl: baseUrl
  } as AxiosRequestConfig);

  if (response === undefined) return Promise.reject(new Error(`checkout/pub/profiles`));

  const { data } = response;
  return data;
}

/**
 * Function to get document client by userID
 * @param userId
 * @returns
 */
 async function getDocumentClient(userId: string): Promise<any> {
  const response = await OnboardingApi.getInstance().getRequest(`/dataentities/CL/search?&_where=userId=${userId}&_fields=_all`);
  if (response === undefined) return Promise.reject(new Error(`checkout/pub/profiles`));
  const { data } = response;
  return data;
}

/**
 * Function to get document AD addresses
 * @param userId
 * @returns
 */
 async function getDocumentAddresses(userId: string): Promise<any> {
  const response = await OnboardingApi.getInstance().getRequest(`/dataentities/AD/search?&_where=userId=${userId}&_fields=_all`);
  if (response === undefined) return Promise.reject(new Error(`checkout/pub/profiles`));
  const { data } = response;
  return data;
}

/**
 * Function to delete address document
 * @param entityName
 * @param id
 * @returns
 */
 async function deleteDocumentById(entityName: string ,id: string): Promise<any> {
  const response = await OnboardingApi.getInstance().delete(`/dataentities/${entityName}/documents/${id}`);
  if (response === undefined) return Promise.reject(new Error(`checkout/pub/profiles`));
  const { data } = response;
  return data;
}

/**
 * Function to update current User.
 * @param user
 * @returns
 */
async function putUser(user: AuthDataInterface): Promise<any> {
  const { userId } = user;
  const response = await OnboardingApi.getInstance().putRequest(`/users/putUser/${userId}`, user);
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
  const { userId } = user;
  const response = await OnboardingApi.getInstance().putRequest(`/users/updateUserPassword/${userId}`, user);
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
  const response = await OnboardingApi.getInstance().getRequest(`/users/sendEmailForPasswordRecovery/${user.email}`);
  if (response === undefined) return Promise.reject(new Error('sendEmailtoRecoverPassword:users/sendEmailForPasswordRecovery'));
  const { data } = response;
  return data;
}

async function getLoginProviders(): Promise<any> {
  const response = await OnboardingApi.getInstance().getRequest(
    `/vtexid/pub/authentication/start?callbackUrl=oneiconn.vtexcommercestable.com.br/api/vtexid/pub/authentication/finish&scope=${ACCOUNT_NAME}&locale=MX&accountName=${ACCOUNT_NAME}&returnUrl=/&appStart=true`
  );
  const { data } = response;
  return data;
}

// TODO: is used this function?
/**
 * Function saveAuthCookies whit socialNetwork
 * @param authCookie
 * @param accountAuthCookie
 */
async function loginWhitSocialNetwork(authCookie: AuthCookie, accountAuthCookie: AuthCookie): Promise<any> {
  HttpClient.authCookie = authCookie;
  HttpClient.accountAuthCookie = accountAuthCookie;

  console.log('HttpClient.authCookie:', HttpClient.authCookie);
  console.log('HttpClient.accountAuthCookie:', HttpClient.accountAuthCookie);
}

/**
 * Function to get User by Id.
 * @param user
 * @returns
 */
async function valideteUserSocial(): Promise<any> {
  const response = await AuthUserSocial.getInstance(true).getRequest(`/vtexid/pub/authenticated/user`);
  if (response === undefined) return Promise.reject(new Error('getUser:/users/getUser'));
  const { data } = response;
  return data;
}

/**
 * Function to get User by Id.
 * @param user
 * @returns
 */
async function getUserById(user_id: string): Promise<any> {
  const response = await OnboardingApi.getInstance().getRequest(`/users/getUser/${user_id}`);
  if (response === undefined) return Promise.reject(new Error('getUser:/users/getUser'));
  const { data } = response;
  return data.resp;
}

export const authServices = {
  logOutUser,
  login,
  sendAccessKey,
  validateUser,
  preSignUp,
  otpValidate,
  register,
  getUser,
  putUser,
  sendEmailtoRecoverPassword,
  updateUserPassword,
  startAuthentication,
  getProfile,
  getDocumentClient,
  getDocumentAddresses,
  deleteDocumentById,
  createUser,
  createPassword,
  newUser,
  getLoginProviders,
  loginWhitSocialNetwork,
  getUserById,
  valideteUserSocial
};
