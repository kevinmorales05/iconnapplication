import { useLoading } from 'context';
import { useCallback, useEffect, useState } from 'react';
import { getProductsByCollectionIdThunk, ProductResponseInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';

export const useProducts = () => {
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const loader = useLoading();

  const [products, setProducts] = useState<ProductResponseInterface[] | null>();
  const [otherProducts, setOtherProducts] = useState<ProductResponseInterface[] | null>();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const fetchProducts = useCallback(async (collectionId: string) => {
    const { Data } = await dispatch(getProductsByCollectionIdThunk(collectionId)).unwrap();
    const productsArr: ProductResponseInterface[] = Data.map(
      ({ ProductId, SkuId, SubCollectionId, Position, ProductName, SkuImageUrl }: ProductResponseInterface) => ({
        ProductId,
        SkuId,
        SubCollectionId,
        Position,
        ProductName,
        SkuImageUrl
      })
    );

    if (collectionId === '137') setProducts(productsArr);
    if (collectionId === '138') setOtherProducts(productsArr);
  }, []);

  return {
    fetchProducts,
    products,
    otherProducts
  };
};
