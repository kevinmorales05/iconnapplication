import { OrderInterface } from 'rtk';
import { OrderApi } from '../http/api-order';

 async function getOrderById(orderId: string): Promise<any> {
    const response = await OrderApi.getInstance().getRequest(`/document/${orderId}?reason=data-validation`);
    if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
    console.log('Aqui termina la funcion getOrderById');
    const { data } = response;
    return data;
  }
  


export const vtexsingleOrdersServices = {
    getOrderById,
};
