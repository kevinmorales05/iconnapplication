import { InvoicingApi } from '../http/api-invoicing';
import { DocsApi } from '../http/api-docs'



/**
 * Function to create doc
 * TODO error handling
 * TODO interface for doc
 */

async function createDoc(dataentity:string, doc:any) : Promise<any> {
    const response = await DocsApi.getInstance().postRequest(`/${dataentity}/documents?_schema=schema`, doc);
    const { data } = response;
    return data;
}


/**
 * Function to get all of the docs
 * TODO error handling
 * TODO interface for doc
 */

 async function getDocByUserID(dataentity:string, userId:string): Promise<any> {
    const response = await DocsApi.getInstance().getRequest(`/dataentities/${dataentity}/search?_fields=_all&_where=userId=${userId}`);
    //error handling
    const { data } = response;
    return data;
}

/**
 * Function to get all of the docs
 * TODO error handling
 * TODO interface for doc
 */

 async function getAllDocByUserID(dataentity:string, userId:string): Promise<any> {
    const response = await DocsApi.getInstance().getRequest(`/dataentities/${dataentity}/search?_fields=_all&_where=id=${userId}`);
    //error handling
    const { data } = response;
    return data;
}

/**
 * Function to detele one doc
 * TODO error handling
 * TODO interface for doc
 */
 async function deleteDocByUserID(dataentity:string, docId:string): Promise<any> {
    const response = await DocsApi.getInstance().getRequest(`dataentities/${dataentity}/documents/${docId}`);
    //error handling}
    const { data } = response;
    return data;
}
/**
 * Function to  update one doc
 * TODO error handling
 * TODO interface for doc
 */

//dataentities/AD/documents/:id

async function updateDocByUserID(dataentity:string, docId:string, doc:any): Promise<any> {
    const response = await DocsApi.getInstance().patchRequest(`dataentities/${dataentity}/documents/${docId}`, doc);
    //error handling}
    const { data } = response;
    return data;
}




export const invoicingServices = {
  createDoc, getAllDocByUserID, deleteDocByUserID, updateDocByUserID, getDocByUserID
};
