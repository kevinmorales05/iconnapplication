import { DocsApi } from '../http/api-docs';

/**
 * Function to get full Home Items.
 */
async function getHomeItems(dataentity: string): Promise<any> {
  const response = await DocsApi.getInstance().getRequest(
    `/dataentities/${dataentity}/scroll?_fields=id,description,image,link,navigationType,promotion_name,promotion_type,screeen,status`
  );
  const { data } = response;
  return data;
}

export const vtexHomeServices = {
  getHomeItems
};
