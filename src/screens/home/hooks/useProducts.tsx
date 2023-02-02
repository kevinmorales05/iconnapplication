import { useLoading } from 'context';
import { useCallback, useEffect, useState } from 'react';
import {
  getProductsByCollectionIdThunk,
  ProductInterface,
  ProductResponseInterface,
  ProductsByCollectionInterface,
  RootState,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import Config from 'react-native-config';

export const useProducts = () => {
  const { RECOMMENDED_PRODUCTS, OTHER_PRODUCTS } = Config;
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const loader = useLoading();

  const [products, setProducts] = useState<ProductInterface[] | null>();
  const [otherProducts, setOtherProducts] = useState<ProductInterface[] | null>();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const fetchProducts = useCallback(async (collectionData: ProductsByCollectionInterface) => {
    const response = await dispatch(getProductsByCollectionIdThunk(collectionData)).unwrap();
    if (response.responseCode === 603) {
      const productsArr: ProductInterface[] = response.data.products.map(
        ({ ProductId, ProductName, SkuImageUrl, qualificationAverage, sellingPrice, promotion, costDiscountPrice }: ProductResponseInterface) => ({
          productId: ProductId,
          name: ProductName ? ProductName : '',
          image: { uri: SkuImageUrl },
          price: Number.parseFloat(sellingPrice),
          oldPrice: Number.parseFloat(sellingPrice),
          porcentDiscount: 0,
          quantity: 0,
          ratingValue: qualificationAverage,
          promotionType: promotion && promotion.type,
          promotionName: promotion && promotion.name,
          percentualDiscountValue: promotion && promotion.percentual_discount_value,
          maximumUnitPriceDiscount: promotion && promotion.maximum_unit_price_discount,
          costDiscountPrice: costDiscountPrice
        })
      );
      if (collectionData.collectionId == RECOMMENDED_PRODUCTS) setProducts(productsArr);
      if (collectionData.collectionId == OTHER_PRODUCTS) setOtherProducts(productsArr);
    }
  }, []);

  return {
    fetchProducts,
    products,
    otherProducts
  };
};
