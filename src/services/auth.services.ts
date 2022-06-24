import { AuthDataInterface } from 'rtk';
// import cryptoAES from 'utils/cryptoAES';
import { IconnApi } from '../http/api-iconn';

/**
 * Pre Signup: Save email in DB and send to it an OTP.
 * @param email
 * @returns
 */
async function preSignUp(email: string): Promise<any> {  
  const response = await IconnApi.getInstance().postRequest('/otps/create/', {email});
  if (response === undefined) return Promise.reject(new Error('preSignUp:otps/create'));
  const { data } = response;
  return data;
}

/**
 * Function to validate sended OTP via email.
 * @param otp
 * @returns
 */
async function otpValidate(email?: string, code?: string): Promise<any> {
  const response = await IconnApi.getInstance().getRequest(`/otps/validate/${code}/${email}`);
  if (response === undefined) return Promise.reject(new Error('otpValidate:/otps/validate'));
  const { data } = response;
  return data;
}

/**
 * Function to register user.
 * @param user
 * @returns
 */
async function register(user: AuthDataInterface): Promise<any> {
  const response = await IconnApi.getInstance().postRequest('/users/register', user);
  if (response === undefined) return Promise.reject(new Error('register:/users/register'));
  const { data } = response;
  return data;
}

/**
 * Function to resend otp.
 * @param email
 * @returns
 */
async function resendOtp(email: string): Promise<any> {
  const response = await IconnApi.getInstance().postRequest('/otps/resend', {email});
  if (response === undefined) return Promise.reject(new Error('resendOtp:/otps/resend'));
  return response;
}

export const authServices = {
  preSignUp,
  otpValidate,
  register,
  resendOtp
};
