import { EvaluateServiceInterface } from 'components/types/StepsWallet';
import { BEApi } from '../http/api-be';
/**
 * Function to valid a ticket
 */
async function getTicketValid(requestData: EvaluateServiceInterface): Promise<any> {
  const response = await BEApi.getInstance().postRequest('ticket/isValid', requestData);
  if (response === undefined) return Promise.reject(new Error('getTicketValid:/ticket/isValid'));
  const { data } = response;
  return data;
}

/**
 * Function to get a list of suggestion
 */
async function getSuggestions(type: number): Promise<any> {
  const response = await BEApi.getInstance().getRequest(`suggestions/list/${type}`);
  if (response === undefined) return Promise.reject(new Error('getSuggestions:suggestions/list/'));
  const { data } = response;
  return data;
}

/**
 * Function to get a list of suggestion
 */
 async function setEvaluation(requestData: EvaluateServiceInterface): Promise<any> {
  const response = await BEApi.getInstance().postRequest('store/create', requestData);
  if (response === undefined) return Promise.reject(new Error('getSuggestions:suggestions/list/'));
  const { data } = response;
  return data;
}
export const evaluatedServices = {
  getTicketValid,
  getSuggestions,
  setEvaluation
};
