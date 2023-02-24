import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import theme from 'components/theme/theme';
import { CustomText, Container, SearchBar, CardProduct, CardProductSkeleton } from 'components';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import {
  RootState,
  useAppSelector,
  ExistingProductInCartInterface,
  ProductInterface,
  useAppDispatch,
  getProductsByCollectionIdThunk,
  ProductsByCollectionInterface
} from 'rtk';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { useLoading } from 'context';
import { logEvent } from 'utils/analytics';
import { FlashList } from '@shopify/flash-list';

const PromotionsScreen: React.FC = () => {
  const { navigate, setOptions } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();
  const route = useRoute<RouteProp<HomeStackParams, 'CollectionsProducts'>>();
  const dispatch = useAppDispatch();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const [productsRender, setProductsRender] = useState<ProductInterface[]>([]);
  const [itemToLoad, setItemToLoad] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(true);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(false);
  const { title, collectionId } = route.params;

  const hideModalForAdult = () => {
    setVisible(false);
  };

  const showModalForAdult = () => {
    setVisible(true);
  };

  useEffect(() => {
    setOptions({
      title: title
    });
  }, [title]);

  const userUpdated = (productId: string) => {
    updateShoppingCartProduct('create', productId);
    logEvent('promoAddProduct', { id: user.id, description: 'Añadir producto a la canasta', productId: productId.toString() });
    hideModalForAdult();
  };

  const validateCategoryForAddItem = (isAdult: boolean, productId: string) => {
    if (isAdult) {
      logEvent('promoAddProduct', { id: user.id, description: 'Añadir producto a la canasta', productId: productId.toString() });
      updateShoppingCartProduct('create', productId);
    } else {
      setProductId(productId);
      showModalForAdult();
    }
  };

  useEffect(() => {
    const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
    productsEffect(existingProducts);
  }, []);

  useEffect(() => {
    if (productsRender?.length > 0) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      updateQuantityProducts(existingProducts);
    }
  }, [cart]);

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

  async function updateQuantityProducts(existingProductsInCart: ExistingProductInCartInterface[]) {
    let productsToRender: ProductInterface[] = [];
    productsToRender = productsRender.concat(productsToRender);
    for (const p of productsToRender) {
      p.quantity = existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0;
    }
    setProductsRender(productsToRender);
    setRefreshing(false);
  }

  const productsEffect = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    loader.show();
    setProductsRender([]);
    const productsRequest = await getProducts(0);
    if (productsRequest.responseCode === 603 && productsRequest.data) {
      if (productsRequest.data.products.length) {
        const productsTem: ProductInterface[] = productsRequest.data.products.map(product => {
          return {
            productId: product.ProductId,
            name: product.ProductName,
            image: { uri: product.SkuImageUrl },
            price: Number.parseFloat(product.sellingPrice),
            oldPrice: Number.parseFloat(product.sellingPrice),
            quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.ProductId.toString())?.quantity : 0,
            ratingValue: product.qualificationAverage,
            promotionType: product.promotion && product.promotion.type,
            promotionName: product.promotion && product.promotion.name,
            percentualDiscountValue: product.promotion && product.promotion.percentual_discount_value,
            maximumUnitPriceDiscount: product.promotion && product.promotion.maximum_unit_price_discount,
            costDiscountPrice: product.costDiscountPrice,
            promotionId: product.promotion && product.promotion.promotionId
          };
        });
        setProductsRender(productsTem);
        loader.hide();
        setLoading(false);
        setLoadingMore(true);
        setRefreshing(false);
      } else {
        loader.hide();
        setProductsRender([]);
        setRefreshing(false);
      }
    } else {
      loader.hide();
      setLoading(false);
      setLoadingMore(true);
      setRefreshing(false);
    }
  };

  const loadMoreProducts = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    setLoading(true);
    const productsRequest = await getProducts(itemToLoad + 1);
    if (productsRequest.responseCode === 603 && productsRequest.data) {
      if (productsRequest.data.products.length) {
        const productsTem: ProductInterface[] = productsRequest.data.products.map(product => {
          return {
            productId: product.ProductId,
            name: product.ProductName,
            image: { uri: product.SkuImageUrl },
            price: Number.parseFloat(product.sellingPrice),
            oldPrice: Number.parseFloat(product.sellingPrice),
            quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.ProductId.toString())?.quantity : 0,
            ratingValue: product.qualificationAverage,
            promotionType: product.promotion && product.promotion.type,
            promotionName: product.promotion && product.promotion.name,
            percentualDiscountValue: product.promotion && product.promotion.percentual_discount_value,
            maximumUnitPriceDiscount: product.promotion && product.promotion.maximum_unit_price_discount,
            costDiscountPrice: product.costDiscountPrice,
            promotionId: product.promotion && product.promotion.promotionId
          };
        });
        if (!productsRequest.data.products.length) {
          setLoading(false);
          setLoadingMore(false);
        } else {
          const productsToRender: ProductInterface[] = productsRender.concat(productsTem);
          setProductsRender(productsToRender);
          setItemToLoad(itemToLoad + 1);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  const getProducts = async (itemToLoad: number) => {
    const collectionData: ProductsByCollectionInterface = {
      collectionId: collectionId,
      pageSize: 10,
      pageNumber: itemToLoad,
      selectedStore: defaultSeller?.Campo ? Number.parseInt(defaultSeller.seller.split('oneiconntienda')[1], 10) : 0
    };
    return await dispatch(getProductsByCollectionIdThunk(collectionData)).unwrap();
  };

  const _renderItem = ({ item, index }: { item: ProductInterface; index: number }) => {
    return (
      <CardProduct
        key={item.productId + item.promotionId}
        ratingValue={item.ratingValue}
        price={item.price ? item.price : 0}
        porcentDiscount={item.porcentDiscount}
        name={item.name ? item.name : ''}
        image={item.image ? item.image : {}}
        quantity={item.quantity ? item.quantity : 0}
        productId={item.productId}
        oldPrice={item.oldPrice}
        index={index}
        promotionType={item.promotionType}
        percentualDiscountValue={item.percentualDiscountValue}
        promotionName={item.promotionName}
        costDiscountPrice={item.costDiscountPrice}
        onPressAddCart={validateCategoryForAddItem}
        onPressAddQuantity={() => {
          updateShoppingCartProduct('add', item.productId);
          logEvent('promoAddProduct', { id: user.id, description: 'Sumar un producto a la canasta', productId: item.productId.toString() });
        }}
        onPressDeleteCart={() => {
          updateShoppingCartProduct('remove', item.productId);
          logEvent('promoDeleteProduct', { id: user.id, description: 'Eliminar un producto de la canasta', productId: item.productId.toString() });
        }}
        onPressDecreaseQuantity={() => {
          updateShoppingCartProduct('substract', item.productId);
          logEvent('promoMinusProduct', { id: user.id, description: 'Restar un producto de la canasta', productId: item.productId.toString() });
        }}
        onPressOut={hideModalForAdult}
        notNeedMarginLeft
      />
    );
  };

  const _renderFooter = () => {
    if (isLoading) {
      const residuoOperation = productsRender.length % 2;
      if (residuoOperation === 0) {
        return (
          <Container
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: Dimensions.get('screen').width,
              paddingHorizontal: moderateScale(15),
              left: -moderateScale(15)
            }}
          >
            <CardProductSkeleton notMarinLeft />
            <CardProductSkeleton notMarinLeft />
          </Container>
        );
      } else {
        return (
          <Container row>
            <CardProductSkeleton notMarinLeft />
          </Container>
        );
      }
    }
    return <Container height={moderateScale(60)} />;
  };

  const loadMoreItem = () => {
    if (!onEndReachedCalledDuringMomentum) {
      if (!isLoading && isLoadingMore) {
        const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
        loadMoreProducts(existingProducts);
        setOnEndReachedCalledDuringMomentum(true);
      }
    }
  };

  const _onRefresh = () => {
    setRefreshing(true);
    const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
    productsEffect(existingProducts);
  };

  const onPressBack = () => {
    navigate('SearchProducts');
  };

  return (
    <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap', backgroundColor: theme.brandColor.iconn_background }}>
      <Container style={styles.containerHeader}>
        <SearchBar isButton onPressSearch={onPressBack} onChangeTextSearch={() => {}} />
        <Container style={{ marginTop: moderateScale(10) }} />
      </Container>
      <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15) }}>
        {productsRender.length ? (
          <Container height={verticalScale(560)} width={'100%'}>
            <FlashList
              data={productsRender}
              renderItem={_renderItem}
              onEndReachedThreshold={0}
              onEndReached={loadMoreItem}
              refreshing={refreshing}
              removeClippedSubviews={true}
              onRefresh={() => _onRefresh()}
              onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
              keyExtractor={item => item.productId + item.promotionId}
              numColumns={2}
              estimatedItemSize={moderateScale(250)}
              ListFooterComponent={_renderFooter}
              ListFooterComponentStyle={{ width: '100%' }}
            />
          </Container>
        ) : (
          <Container width={'100%'} height={'100%'} center>
            <Container width={'80%'} height={'40%'} center style={{ justifyContent: 'flex-end' }}>
              <SearchLoupeDeleteSvg size={moderateScale(50)} />
              <Container style={{ marginTop: moderateScale(13) }}>
                <CustomText text="Sin productos" fontWeight="900" fontSize={theme.fontSize.h4} />
              </Container>
              <Container style={{ marginTop: moderateScale(13) }}>
                <CustomText text="Por el momento no hay ningún producto en promoción" fontSize={theme.fontSize.h6} fontWeight={'500'} textAlign={'center'} />
              </Container>
            </Container>
          </Container>
        )}
      </Container>
      <AdultAgeVerificationScreen onPressClose={hideModalForAdult} visible={visible} productId={productId!} userUpdated={userUpdated} />
    </Container>
  );
};

export default PromotionsScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(7),
    backgroundColor: theme.brandColor.iconn_white
  },
  containerButton: {
    width: moderateScale(40),
    height: moderateScale(36),
    borderRadius: moderateScale(5),
    borderColor: theme.brandColor.iconn_med_grey,
    borderWidth: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(20)
  },
  containerBottom: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: -moderateScale(3) },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    width: '100%',
    height: Dimensions.get('window').height * 0.08
  }
});
