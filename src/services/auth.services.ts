import { AuthDataInterface } from 'rtk';
import { OtpsApi } from '../http/api-otps';
import { UsersApi } from '../http/api-users';

/**
 * Function to validate user status
 * @param email
 */
async function validateUser(email: string): Promise<any> {
  const response = await UsersApi.getInstance().getRequest(`/users/validateUser/${email}`);
  if (response === undefined) return Promise.reject(new Error(`validateUser:/users/validateUser/${email}`));
  const { data } = response;
  return data.resp;
}

/**
 * function to save email in DB and send to it an OTP. (pre-register)
 * @param email
 * @returns
 */
async function preSignUp(email: string): Promise<any> {  
  const response = await OtpsApi.getInstance().postRequest('/otps/create', {email});
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

export const authServices = {
  validateUser,
  preSignUp,
  otpValidate,
  register,
  registerWithFirebase,
  getUser
};
