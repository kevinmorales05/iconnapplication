import { useLoading } from 'context';
import { useCallback, useEffect, useState } from 'react';
import { getProductsByCollectionIdThunk, ProductResponseInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';

export const useProducts = () => {
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const loader = useLoading();

  const [products, setProducts] = useState<ProductResponseInterface[] | null>();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const fetchProducts = useCallback(async () => {
    const { Data } = await dispatch(getProductsByCollectionIdThunk('137')).unwrap();
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
    setProducts(productsArr);
  }, []);

  return {
    fetchProducts,
    products
  };
};
