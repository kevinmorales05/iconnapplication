import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewInterface } from 'rtk/types';
/* import interfaces from types
   import slice */
import { vtexReviewsRatings } from 'services';

export const getReviewByProductIDThunk = createAsyncThunk(`rating/`, async (id:number) => {
  return await vtexReviewsRatings.getReviewByProductID(id);
});

export const getReviewListThunk = createAsyncThunk(`reviews?from&to&product_id`, async (id:number) => {
    return await vtexReviewsRatings.getReviewList(id);
});

export const postReviewThunk = createAsyncThunk(`reviews`, async (request:ReviewInterface) => {
    return await vtexReviewsRatings.postReview(request);
});