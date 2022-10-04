import { CounterType } from 'components/types/counter-type';
import { useCallback } from 'react';
import { cartItemInterface, cartItemsRequestInterface, useAppDispatch } from 'rtk';
import { updateShoppingCartItems } from 'rtk/slices/cartSlice';
import { updateShoppingCart } from 'services';
import { store } from 'rtk';

export const useShoppingCart = () => {
  const dispatch = useAppDispatch();
  /**
   *
   * @param newSeller: optional, is used when we want migrate the cart to another branch, in this case we must send the new branch/store/seller name.
   * @param zeroQuantity: optional, is used when we want empty shopping cart, in this case we must send this param with zero value.
   * @returns
   */
  const getCartItemsFromRedux = (newSeller?: string, zeroQuantity?: number): cartItemInterface[] | undefined => {
    const { items } = store.getState().cart.cart;
    if (items && items.length > 0) {
      const cartItems: cartItemInterface[] = items.map(({ id, quantity, seller }: cartItemInterface, index: number) => ({
        id,
        quantity: zeroQuantity === 0 ? 0 : quantity,
        seller: newSeller ? newSeller : seller,
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
      const { defaultSeller } = store.getState().seller;
      reduxCartItems?.push({
        id: productId,
        quantity: 1,
        seller: defaultSeller?.seller!
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

  const migrateCartToAnotherBranch = useCallback(async (seller: string) => {
    const { orderFormId } = store.getState().cart.cart;

    // 1. We need to empty the shopping cart:
    const clearCartItems: cartItemInterface[] | undefined = getCartItemsFromRedux(undefined, 0);
    const newEmptyCartItems = { orderItems: clearCartItems };
    const emptyCart = await updateShoppingCart(orderFormId, newEmptyCartItems);
    // 2. Once it has been emptied, we proceed to migrate to the new branch/store/seller:
    if (emptyCart) {
      const cartItems: cartItemInterface[] | undefined = getCartItemsFromRedux(seller);
      // Very important: When you need to migrate a shopping cart to another branch, you need to send the products array without indexes!
      const cartItemsWithoutIndexes: cartItemInterface[] = cartItems?.map(({ id, quantity, seller }: cartItemInterface) => {
        return {
          id: id,
          quantity: quantity,
          seller: seller
        };
      }) as cartItemInterface[];
      const newCartItemsRequest = { orderItems: cartItemsWithoutIndexes };
      const response = await updateShoppingCart(orderFormId, newCartItemsRequest);
      dispatch(updateShoppingCartItems(response));
    } else {
      console.warn('Ups! algo pasó al vaciar el carrito');
    }
  }, []);

  return {
    updateShoppingCartProduct,
    migrateCartToAnotherBranch
  };
};
