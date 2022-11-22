import { useCallback } from 'react';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';
import {
  FavoritesResponseInterface,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  ListItemsWrapperInterface,
  NewFavoritesResponseInterface,
  ProductInterface,
  ProductPriceResponseInterface,
  ProductRaitingResponseInterface,
  ProductResponseInterface,
  RootState,
  setFav,
  setFavId,
  useAppDispatch,
  useAppSelector
} from 'rtk';

interface props {
  userEmail: string;
  userId: string;
}



export const useFavorites = () => {
  const dispatch = useAppDispatch();

  const getFavorites = useCallback(async (userEmail: string) => {
    const response = await vtexFavoriteServices.getFavoritesByUserEmail(userEmail);
    const list = response[0].ListItemsWrapper[0].ListItems;
    console.log('PRUEBA', list);
    console.log('PRUEBA2', response[0].id);
    console.log('PRUEBA4', response);
    dispatch(setFav(list));
    dispatch(setFavId(response[0].id));
  }, []);

  
  return {
    getFavorites
  }

};
