import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SellerInterface } from '../types';

interface SellerSliceInterface {
  defaultSeller: SellerInterface | null;
}

const initialState: SellerSliceInterface = {
  defaultSeller: null
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState: initialState,
  reducers: {
    setDefaultSeller(state, action: PayloadAction<SellerSliceInterface>) {
      state.defaultSeller = action.payload.defaultSeller;
    }
  }
});
// TODO: validate if it is possible to reduce extra reducers.
export const { setDefaultSeller } = sellerSlice.actions;
export default sellerSlice.reducer;
