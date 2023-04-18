import { HelpCenterApi } from '../http/api-helpCenter';

/**
 * Function to get modules list
 */
 async function getHelpModulesList(): Promise<any> {
  const response = await HelpCenterApi.getInstance().getRequest(`modules/list`);
  if (response === undefined) return Promise.reject(new Error('getHelpModulesList:modules/list/'));
  const { data } = response;
  return data;
}

/**
 * Function to get questions list by module identifier
 */
 async function getQuestionsListByModuleId(moduleId: number): Promise<any> {
  const response = await HelpCenterApi.getInstance().getRequest(`questions/list/${moduleId}`);
  if (response === undefined) return Promise.reject(new Error('getQuestionsListByModuleId:questions/list/'));
  const { data } = response;
  return data;
}

/**
 * Function to get steps list by question identifier
 */
 async function getStepsListByQuestionId(questionId: number): Promise<any> {
  const response = await HelpCenterApi.getInstance().getRequest(`steps/list/${questionId}`);
  if (response === undefined) return Promise.reject(new Error('getStepsListByQuestionId:steps/list/'));
  const { data } = response;
  return data;
}

/**
 * Function to get qualification by question identifier
 */
 async function getQualificationByQuestionIdAndUserId(questionId: number, userId: string): Promise<any> {
  const response = await HelpCenterApi.getInstance().getRequest(`qualification/get/${questionId}/${userId}`);
  if (response === undefined) return Promise.reject(new Error('getQualificationByQuestionId:qualification/get/'));
  const { data } = response;
  return data;
}

/**
 * Function to qualify by question identifier
 */
 async function qualifyByQuestionId(questionBody: any): Promise<any> {
  const response = await HelpCenterApi.getInstance().postRequest(`qualification/create`, questionBody);
  if (response === undefined) return Promise.reject(new Error('qualifyByQuestionId:qualification/create/'));
  const { data } = response;
  console.log('questionBody', questionBody);
  console.log('qualify response', response);
  return await data;
}

/**
 * Function to qualify by question identifier
 */
 async function updateQualificationByQuestionId(questionBody: any, questionId: number): Promise<any> {
  const response = await HelpCenterApi.getInstance().putRequest(`qualification/update/${questionId}`, questionBody);
  if (response === undefined) return Promise.reject(new Error('getQualificationByQuestionId:qualification/update/'));
  const { data } = response;
  return data;
}

export const helpCenterServices = {
  getHelpModulesList,
  getQuestionsListByModuleId,
  getStepsListByQuestionId,
  getQualificationByQuestionIdAndUserId,
  qualifyByQuestionId,
  updateQualificationByQuestionId
};
