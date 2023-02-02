import { useCallback } from 'react';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';
import { setFav, setFavId, useAppDispatch } from 'rtk';

export const useFavorites = () => {
  const dispatch = useAppDispatch();

  const getFavorites = useCallback(async (userEmail: string) => {
    const response = await vtexFavoriteServices.getFavoritesByUserEmail(userEmail);
    const list = response[0].ListItemsWrapper[0].ListItems;
    dispatch(setFav(list));
    dispatch(setFavId(response[0].id));
  }, []);

  return {
    getFavorites
  };
};
