import { ReviewInterface } from 'rtk';
import { Reviews } from '../http/vtex-api-reviews';


 async function getReviewByProductID(id:number): Promise<any> {
    const response = await Reviews.getInstance().getRequest(`rating/${id}`);
    if (response === undefined) return Promise.reject(new Error('error'));
  
    console.log("Respuesta get review");
    console.log(response.data);

    return response.data;
  }

  async function getReviewList(id:number): Promise<any> {
    const response = await Reviews.getInstance().getRequest(`reviews?from=0&to=31&product_id=${id}`);
    if (response === undefined) return Promise.reject(new Error('error'));
  
    console.log("Respuesta review list");
    console.log(response.data);

    return response.data;
  }
  

  async function postReview(request: ReviewInterface): Promise<any> {
    const response = await Reviews.getInstance().postRequest(`reviews`, request);
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
