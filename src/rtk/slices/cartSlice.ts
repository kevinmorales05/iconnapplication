import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//import the thunks
import { getShoppingCartThunk, emptyShoppingCartThunk, updateShoppingCartThunk } from '../thunks/vtex-shoppingCart.thunks';

//importo interfaz de carrito de compras
import { ShoppingCartInteface, updateShoppingCartInterface } from '../types';

//estado inicial del carrito de compras
const initialStateShoppingCart: any = {};

// creo slice de shopping cart
const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    cart: initialStateShoppingCart
  },
  reducers: {
    setShoppingCartInitialState(state) {
      state.cart = initialStateShoppingCart;
    },
    setOrderFormId(state, action: PayloadAction<any>) {
      state.cart.orderFormId = action.payload.orderFormId;
    },
    getShoppingCartItems(state, action: PayloadAction<any>) {
      state.cart = action.payload;
    },
    updateShoppingCartItems(state, action: PayloadAction<any>) {
      state.cart = action.payload;
    },
    cleanShoppingCart(state, action: PayloadAction<any>) {
      state.cart = action.payload;
    },
    createShoppingCart(state, action: PayloadAction<any>) {
      state.cart = action.payload;
    }
  }
});

export const { setShoppingCartInitialState, getShoppingCartItems, updateShoppingCartItems, cleanShoppingCart, createShoppingCart, setOrderFormId } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
