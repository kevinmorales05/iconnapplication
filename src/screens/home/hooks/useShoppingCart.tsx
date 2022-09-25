import { CounterType } from 'components/types/counter-type';
import { useCallback } from 'react';
import { cartItemInterface, cartItemsRequestInterface, useAppDispatch } from 'rtk';
import { updateShoppingCartItems } from 'rtk/slices/cartSlice';
import { updateShoppingCart } from 'services';
import { store } from 'rtk';

export const useShoppingCart = () => {
  const dispatch = useAppDispatch();
  const getCartItemsFromRedux = (): cartItemInterface[] | undefined => {
    const { items } = store.getState().cart.cart;
    if (items && items.length > 0) {
      const cartItems: cartItemInterface[] = items.map(({ id, quantity, seller }: cartItemInterface, index: number) => ({
        id,
        quantity,
        seller,
        index
      }));
      return cartItems;
    } else {
      return [];
    }
  };

  const buildNewCartItems = (type: CounterType, productId: string): cartItemsRequestInterface | undefined => {
    const reduxCartItems: cartItemInterface[] | undefined = getCartItemsFromRedux();
    let cartItemsRequest: cartItemsRequestInterface;

    if (type === 'create') {
      reduxCartItems?.push({
        id: productId,
        quantity: 1,
        seller: '1'
      });

      cartItemsRequest = { orderItems: reduxCartItems! };
      return cartItemsRequest;
    } else if (type === 'add' || type === 'substract' || type === 'remove') {
      const cartItemsUpdated: cartItemInterface[] = reduxCartItems!.map(({ id, quantity, seller }: cartItemInterface, index: number) => {
        if (id == productId) {
          const cartItemAdded: cartItemInterface = {
            id: id,
            quantity: type === 'add' ? quantity + 1 : type === 'substract' ? quantity - 1 : 0,
            seller: seller,
            index: index
          };
          return cartItemAdded;
        } else {
          return {
            id: id,
            quantity: quantity,
            seller: seller,
            index: index
          };
        }
      }) as cartItemInterface[];

      cartItemsRequest = { orderItems: cartItemsUpdated };
      return cartItemsRequest;
    }
  };

  const updateShoppingCartProduct = useCallback(async (type: CounterType, productId: string) => {
    const { orderFormId } = store.getState().cart.cart;
    const newCartItemsRequest = buildNewCartItems(type, productId);
    const response = await updateShoppingCart(orderFormId, newCartItemsRequest);
    dispatch(updateShoppingCartItems(response));
  }, []);

  return {
    updateShoppingCartProduct
  };
};
