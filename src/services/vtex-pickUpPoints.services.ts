import { PickUpPoints } from '../http/vtex-api-pickUpPoints';


  async function getPickUpPointsByCP(cp:string): Promise<any> {
    const response = await PickUpPoints.getInstance().getRequest(`pickup-points?postalCode=${cp}&countryCode=MEX`);
    if (response === undefined) return Promise.reject(new Error('error'));
    return response.data;
  }

  async function getPickUpPointsByAddress(lat: number, lng: number): Promise<any> {
    const response = await PickUpPoints.getInstance().getRequest(`pickup-points?geoCoordinates=${lat};${lng}&countryCode=MEX`);
    if (response === undefined) return Promise.reject(new Error('error'));
    return response.data;
  }

export const vtexPickUpPoints = {
    getPickUpPointsByCP,
    getPickUpPointsByAddress
};
