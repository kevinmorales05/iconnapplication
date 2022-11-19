import { PromotionsApi } from '../http/api-promotions';
  
  /**
   * Function to get all promotions
   * the date in order to fulfill the requeriment of the last 6 months is in timestamp format.
   */
   async function getAllPromotions(): Promise<any> {
      const response = await PromotionsApi.getInstance().getRequest(`/benefits/calculatorconfiguration`);
      if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
      const { data } = response;
      return data;
    }

  /**
   * Function to get all promotions
   * the date in order to fulfill the requeriment of the last 6 months is in timestamp format.
   */
   async function getPromotionById(calculatorConfigurationId: string): Promise<any> {
    const response = await PromotionsApi.getInstance().getRequest(`/calculatorconfiguration/${calculatorConfigurationId}`);
    if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
    const { data } = response;
    return data;
  }

export const vtexPromotionsServices = {
  getAllPromotions,
  getPromotionById
};
