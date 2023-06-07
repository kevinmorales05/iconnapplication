import { WalletApi } from '../http/api-citi-wallet';
/**
 * Function to get all info about wallet services.
 */
async function getWalletBalance(): Promise<any> {
  const response = await WalletApi.getInstance().getRequest('walletservice');
  const { data } = response;
  return data;
}

async function payServiceRecharge(): Promise<any> {
  const response = await WalletApi.getInstance().postRequest('walletservice/placepayment', {});
  const { data } = response;
  return data;
}

export const citiWalletServices = {
  getWalletBalance,
  payServiceRecharge
};
