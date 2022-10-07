import { postReviewInterface } from 'rtk';
import { Reviews } from '../http/vtex-api-reviews';


 async function getReviewByProductID(id:number): Promise<any> {
    const response = await Reviews.getInstance().getRequest(`rating/${id}`);
    if (response === undefined) return Promise.reject(new Error('error'));
  
    console.log("Respuesta get review");
    console.log(response.data);

    return response.data;
  }

  async function getReviewList(id:number, from?:number, to?:number): Promise<any> {
    const response = await Reviews.getInstance().getRequest(`reviews?from=${from ? from : 0}&to=${to ? to : 50}&product_id=${id}`);
    if (response === undefined) return Promise.reject(new Error('error'));
  
    console.log("Respuesta review list");
    // console.log(response.data);

    return response.data;
  }
  

  async function postReview(payload: any): Promise<any> {
    console.log("LLAMANDO POST REVIEW");
    const response = await Reviews.getInstance().postRequest(`reviews`, payload);
    console.log("PROBANDO "+response);
    if (response === undefined) return Promise.reject(new Error('error'));
  
    console.log("Respuesta post review");
    console.log(response.data);

    return response.data;
  }


export const vtexReviewsRatings = {
    getReviewByProductID,
    getReviewList,
    postReview
};
