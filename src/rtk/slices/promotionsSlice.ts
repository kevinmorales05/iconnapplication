import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//import the thunks
import { getShoppingCartThunk, emptyShoppingCartThunk, updateShoppingCartThunk } from '../thunks/vtex-shoppingCart.thunks';

//importo interfaz de carrito de compras
import { ShoppingCartInteface, updateShoppingCartInterface } from '../types';

//estado inicial del promociones
const initialStatePromotions: any = [];
const initialStateProductPromotions: any = Map<string, Object>;

// creo slice de promotions
const promotionsSlice = createSlice({
  name: 'promotions',
  initialState: {
    productVsPromotion: initialStateProductPromotions,
    promotions: initialStatePromotions,
  },
  reducers: {
    setPromotionsInitialState(state) {
      state.promotions = { ...initialStatePromotions };
    },
    setPromotions(state, action: PayloadAction<any>) {
      state.promotions = action.payload;
    },
    setProductVsPromotions(state, action: PayloadAction<any>) {
      state.productVsPromotion = (action.payload);
    },
  }
});

export const { setPromotionsInitialState, setPromotions, setProductVsPromotions } = promotionsSlice.actions;
export default promotionsSlice.reducer;
