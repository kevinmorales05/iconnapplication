import React, { useCallback, useEffect, useState } from 'react';
import FavoriteScreen from './FavoriteScreen';
import { useLoading } from 'context';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';
import {
  ExistingProductInCartInterface,
  getProductsListItemsThunk,
  ItemsFavoritesInterface,
  ProductInterface,
  ProductListCacheRequestInterface,
  ProductResponseInterface,
  RootState,
  setFav,
  setFavId,
  useAppDispatch,
  useAppSelector
} from 'rtk';

const InviteSignUpController: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { favs, user } = useAppSelector((state: RootState) => state.auth);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const [favList, setFavList] = useState<ItemsFavoritesInterface[]>(favs);
  const { email } = user;
  const [completeList, setCompleteList] = useState<ProductInterface[] | null>();
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

  async function getProductsInfo(existingProductsInCart: ExistingProductInCartInterface[]) {
    const response = await getProducts(favs);
    if (response.responseCode === 603 && response.data) {
      const productsArr: ProductInterface[] = response.data.map((product: ProductResponseInterface) => ({
        productId: product.ProductId,
        name: product.ProductName,
        image: product.SkuImageUrl,
        price: Number.parseFloat(product.sellingPrice),
        oldPrice: Number.parseFloat(product.sellingPrice),
        porcentDiscount: 0,
        quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.ProductId.toString())?.quantity : 0,
        ratingValue: product.qualificationAverage,
        promotionType: product.promotion && product.promotion.type,
        promotionName: product.promotion && product.promotion.name,
        percentualDiscountValue: product.promotion && product.promotion.percentual_discount_value,
        maximumUnitPriceDiscount: product.promotion && product.promotion.maximum_unit_price_discount,
        costDiscountPrice: product.costDiscountPrice
      }));
      setCompleteList(productsArr);
      loader.hide();
    } else {
      loader.hide();
    }
  }

  const getProducts = async (favProductsArr: ItemsFavoritesInterface[] | null | undefined) => {
    if (favProductsArr) {
      const data: ProductListCacheRequestInterface = {
        storeId: defaultSeller?.Campo ? Number.parseInt(defaultSeller.seller.split('oneiconntienda')[1]) : 0,
        products: favProductsArr.map(item => item.Id + '')
      };
      return await dispatch(getProductsListItemsThunk(data)).unwrap();
    }
  };

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
