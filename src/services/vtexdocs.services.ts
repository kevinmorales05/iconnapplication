import { DocsApi } from '../http/api-docs';
/**
 * Function to create doc
 * TODO error handling
 * TODO interface for doc
 */

async function createDoc(dataentity: string, doc: any): Promise<any> {
  const response = await DocsApi.getInstance().postRequest(`/dataentities/${dataentity}/documents?_schema=schema`, doc);
  const { data } = response;
  return data;
}

/**
 * Function to get one doc of the docs
 * TODO error handling
 * TODO interface for doc
 */

async function getDocByDocID(dataentity: string, docID: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`/dataentities/${dataentity}/search?_fields=_all&_where=id=${docID}`);
  //error handling
  const { data } = response;
  return data;
}

/**
 * Function to get all of the docs
 * TODO error handling
 * TODO interface for doc
 */

async function getAllDocByUserID(dataentity: string, userId: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`/dataentities/${dataentity}/search?_fields=_all&_where=userId=${userId}`);
  //error handling
  const { data } = response;
  return data;
}

async function getDocByEmail(dataentity: string, userEmail: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`/dataentities/${dataentity}/search?_fields=_all`);
  console.log('getDocByEmail: '+response);
  //error handling
  const { data } = response;
  return data;
}

async function saveOrderFormIdDoc(dataentity: string, userEmail: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`/dataentities/${dataentity}/search?_fields=_all&_where=userId=${userEmail}`);
  //error handling
  const { data } = response;
  return data;
}

/**
 * Function to detele one doc.
 */
async function deleteDocByDocID(dataentity: string, docId: string): Promise<any> {
  const response = await DocsApi.getInstance().deleteRequest(`dataentities/${dataentity}/documents/${docId}`);
  const { data } = response;
  return data;
}

/**
 * Function to update one doc.
 */
async function updateDocByDocID(dataentity: string, docId: string, doc: any): Promise<any> {
  const response = await DocsApi.getInstance().putRequest(`dataentities/${dataentity}/documents/${docId}`, doc);
  const { data } = response;
  return data;
}

/**
 * Function to get full Address by postalCode.
 * Also get the neighborhood array.
 * @param postalCode
 * @returns
 */
async function getAddressByPostalCode(postalCode: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(`checkout/pub/postal-code/MEX/${postalCode}`);
  const { data } = response;
  return data;
}

export const vtexDocsServices = {
  createDoc,
  getAllDocByUserID,
  getDocByEmail,
  deleteDocByDocID,
  updateDocByDocID,
  getDocByDocID,
  getAddressByPostalCode
};
