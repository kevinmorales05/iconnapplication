import { VtexFavoritesApi } from '../http/vtex-api-favorites';
import { VtexFavoritesPatchApi } from '../http/vtex-api-patchFavorite';

async function getFavoritesByUserEmail(email: string): Promise<any> {
  const response = await VtexFavoritesApi.getInstance().getRequest(
    `/dataentities/wishlist/search?_schema=wishlist&_keyword=${email}&_fields=email,ListItemsWrapper,id`
  );
  if (response === undefined) return Promise.reject(new Error('getTaxRegimeList:/invoicing/taxRegime/list'));
  console.log('Aqui termina el GETFAVORITES');
  const { data } = response;
  return data;
}

async function patchFavorites(email: string, newFavorite: any): Promise<any> {
  const response = await VtexFavoritesPatchApi.getInstance().patchRequest('/wishlist/documents', newFavorite);
  if (response === undefined) return Promise.reject(new Error('patchFavorite:/favorites'));
  console.log('Aqui termina el PATCHFAVORITES');
  const { data } = response;
  return data;
}

export const vtexFavoriteServices = {
  getFavoritesByUserEmail,
  patchFavorites
};
