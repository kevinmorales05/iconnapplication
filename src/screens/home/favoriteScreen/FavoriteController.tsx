import React, { useCallback, useEffect, useState } from 'react';
import FavoriteScreen from './FavoriteScreen';
import { useLoading } from 'context';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';
import {
  ExistingProductInCartInterface,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  ItemsFavoritesInterface,
  ProductInterface,
  RootState,
  setFav,
  setFavId,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { getSkuFilesById } from 'services/vtexProduct.services';
import Config from 'react-native-config';

const InviteSignUpController: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { favs, user, favsId } = useAppSelector((state: RootState) => state.auth);
  const [favList, setFavList] = useState<ItemsFavoritesInterface[]>(favs);
  const { email } = user;
  const [completeList, setCompleteList] = useState<ProductInterface[] | null>();
  const { FAVORITE_ASSETS } = Config;
  const loader = useLoading();

  const getFavorites = useCallback(async () => {
    loader.show();
    const response = await vtexFavoriteServices.getFavoritesByUserEmail(email as string);
    if (response.length) {
      if (response[0].ListItemsWrapper.length) {
        const list = response[0].ListItemsWrapper[0].ListItems;
        if (!list.length) {
          loader.hide();
        }
        setFavList(list);
        dispatch(setFav(favList));
        dispatch(setFavId(response[0].id));
      } else {
        loader.hide();
      }
    } else {
      loader.hide();
    }
  }, []);

  useEffect(() => {
    getFavorites();
  }, []);

  const getPicture = async (productId: string) => {
    const imgRoot = FAVORITE_ASSETS;
    let pics = [];
    await getSkuFilesById(productId)
      .then(async responseSku => {
        let skuForImages = [];
        if (responseSku) {
          if (responseSku.length > 0) {
            responseSku.map(sku => {
              skuForImages.push({ skuId: sku.Id, name: sku.Name, isMain: sku.IsMain, label: sku.Label, url: imgRoot + sku.ArchiveId + '-' + sku.Id + '-' });
            });
          }
          pics = skuForImages;
        }
      })
      .catch(err => {
        console.log(err);
      });
    return pics;
  };

  const getPriceByProductId = async (productId: string) => {
    return await dispatch(getProductPriceByProductIdThunk(productId)).unwrap();
  };

  const getRatingByProductId = async (productId: string) => {
    return await dispatch(getProductRatingByProductIdThunk(productId)).unwrap();
  };

  async function getProductsInfo(existingProductsInCart: ExistingProductInCartInterface[]) {
    const arr: ItemsFavoritesInterface[] | null | undefined = favs;
    const favProductsArr: ProductInterface[] | undefined = [];
    for (const product of arr) {
      const price = await getPriceByProductId(product.Id);
      const raiting = await getRatingByProductId(product.Id);
      const pic = await getPicture(product.Id);
      if (price && raiting) {
        const newProduct: ProductInterface = {
          productId: product.Id,
          name: product.Name,
          image: pic && pic.length ? pic[0].url : '',
          price: price.sellingPrice,
          oldPrice: price.sellingPrice,
          porcentDiscount: 0,
          quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.Id.toString())?.quantity : 0,
          ratingValue: raiting.average
        };
        favProductsArr.push(newProduct);
      }
    }
    setCompleteList(favProductsArr);
    loader.hide();
  }

  const getExistingProductsInCart = () => {
    const { items } = cart;
    if (items && items.length > 0) {
      const existingProducts: ExistingProductInCartInterface[] = items.map((p: any) => {
        const product: ExistingProductInCartInterface = {
          itemId: p.productId,
          quantity: p.quantity
        };
        return product;
      });
      return existingProducts;
    }
  };

  useEffect(() => {
    if (favs?.length! > 0) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      getProductsInfo(existingProducts);
    }
  }, [favs, cart]);

  return <FavoriteScreen completeList={completeList as ProductInterface[]} />;
};

export default InviteSignUpController;
