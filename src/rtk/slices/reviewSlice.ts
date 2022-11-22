import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  postReviewThunk,
  getReviewByProductIDThunk,
  getReviewListThunk
} from '../thunks/vtex-reviews.thunks';
import {
  ReviewInterface
} from '../types';


const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    loading:false
  },
  reducers: {
    
  },
  extraReducers: builder => {
    builder.addCase(getReviewByProductIDThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getReviewByProductIDThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getReviewByProductIDThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getReviewListThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getReviewListThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getReviewListThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(postReviewThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(postReviewThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(postReviewThunk.rejected, state => {
      state.loading = false;
    });
  }
});


export default reviewSlice.reducer;
