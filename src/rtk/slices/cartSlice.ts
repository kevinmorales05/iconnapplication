import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//estado inicial del carrito de compras
const initialStateShoppingCart: any = {};

const initiallLoadingItems: string[] = [];

// creo slice de shopping cart
const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    detailSelected: '',
    cart: initialStateShoppingCart,
    loadingItems: initiallLoadingItems
  },
  reducers: {
    setShoppingCartInitialState(state) {
      state.cart = { ...initialStateShoppingCart };
    },
    setOrderFormId(state, action: PayloadAction<any>) {
      state.cart.orderFormId = action.payload.orderFormId;
    },
    setDetailSelected(state, action: PayloadAction<string>) {
      state.detailSelected = action.payload;
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
    },
    updateItemsLoading(state, action: PayloadAction<string[]>) {
      state.loadingItems = action.payload;
    }
  }
});

export const {
  setShoppingCartInitialState,
  getShoppingCartItems,
  updateShoppingCartItems,
  cleanShoppingCart,
  createShoppingCart,
  setOrderFormId,
  setDetailSelected,
  updateItemsLoading
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
