import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList } from 'react-native';
import {
  ExistingProductInCartInterface,
  getProductsListItemsThunk,
  ProductInterface,
  ProductListCacheRequestInterface,
  ProductResponseInterface,
  ProductSearchItemInterface,
  RootState,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { BasketCounter, Button, CardProduct, Container, CustomText, SafeArea, SearchBar, Touchable } from 'components';
import Feather from 'react-native-vector-icons/Feather';
import theme from 'components/theme/theme';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { useLoading } from 'context';

const SearchProductResult: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'SearchProductsResults'>>();
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();

  const dispatch = useAppDispatch();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);

  const { products, textSearch } = route.params;
  const [productsRender, setProductsRender] = useState<ProductInterface[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>();

  const hideModalForAdult = () => {
    setVisible(false);
  };

  const showModalForAdult = () => {
    setVisible(true);
  };

  const userUpdated = (productId: string) => {
    updateShoppingCartProduct!('create', productId);
    hideModalForAdult();
  };

  const validateCategoryForAddItem = (isAdult: boolean, productId: string) => {
    if (isAdult) {
      updateShoppingCartProduct!('create', productId);
    } else {
      setProductId(productId);
      showModalForAdult();
    }
  };

  useEffect(() => {
    if (products?.length! > 0) {
      loader.show();
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      refillProductsWithPrice(existingProducts);
    }
  }, [products, visible]);

  useEffect(() => {
    if (products?.length! > 0) {
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
  }

  const getProducts = async (favProductsArr: ProductSearchItemInterface[] | null | undefined) => {
    if (favProductsArr) {
      const data: ProductListCacheRequestInterface = {
        storeId: defaultSeller?.Campo ? Number.parseInt(defaultSeller.seller.split('oneiconntienda')[1]) : 0,
        products: favProductsArr.map(item => item.productId)
      };
      return await dispatch(getProductsListItemsThunk(data)).unwrap();
    }
  };

  async function refillProductsWithPrice(existingProductsInCart: ExistingProductInCartInterface[]) {
    const response = await getProducts(products);
    if (response.responseCode === 603) {
      const productsArr: ProductInterface[] = response.data.map((product: ProductResponseInterface) => ({
        productId: product.ProductId,
        name: product.ProductName,
        image: { uri: product.SkuImageUrl },
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
      setProductsRender(productsArr);
      loader.hide();
    } else {
      loader.hide();
    }
  }

  const _renderItem = ({ item }: { item: ProductInterface }) => {
    return (
      <CardProduct
        key={item.productId}
        ratingValue={item.ratingValue}
        price={item.price}
        porcentDiscount={item.porcentDiscount}
        name={item.name}
        image={item.image}
        quantity={item.quantity}
        productId={item.productId}
        oldPrice={item.oldPrice}
        promotionType={item.promotionType}
        percentualDiscountValue={item.percentualDiscountValue}
        promotionName={item.promotionName}
        costDiscountPrice={item.costDiscountPrice}
        onPressAddCart={validateCategoryForAddItem}
        onPressAddQuantity={() => {
          updateShoppingCartProduct!('add', item.productId);
        }}
        onPressDeleteCart={() => {
          updateShoppingCartProduct!('remove', item.productId);
        }}
        onPressDecreaseQuantity={() => {
          updateShoppingCartProduct!('substract', item.productId);
        }}
        onPressOut={hideModalForAdult}
        notNeedMarginLeft
      />
    );
  };

  const onPressBack = () => {
    goBack();
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap' }}>
        <Container row style={styles.containerHeader}>
          <Container style={{ justifyContent: 'center' }} flex={0.12}>
            <Touchable onPress={onPressBack}>
              <Feather name="arrow-left" size={theme.iconSize.medium} color={theme.brandColor.iconn_accent_secondary} />
            </Touchable>
          </Container>
          <Container flex={0.73}>
            <SearchBar isButton onPressSearch={onPressBack} onChangeTextSearch={() => {}} textSearch={textSearch} />
          </Container>
          <Container width={'100%'} flex={0.16} style={{ paddingLeft: moderateScale(10), height: moderateScale(25) }}>
            <BasketCounter />
          </Container>
        </Container>
        <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15) }}>
          {productsRender.length ? (
            <Container width={'100%'}>
              <Container style={{ marginTop: moderateScale(15) }}>
                <CustomText
                  text={`${productsRender.length} producto${productsRender.length > 1 ? 's' : ''} encontrado${productsRender.length > 1 ? 's' : ''}`}
                  textColor={theme.fontColor.placeholder}
                  fontSize={theme.fontSize.h6}
                />
              </Container>
              <Container height={verticalScale(575)} width={'100%'}>
                <FlatList
                  data={productsRender}
                  renderItem={_renderItem}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingBottom: moderateScale(50)
                  }}
                />
              </Container>
            </Container>
          ) : (
            <Container width={'100%'} height={'100%'} center>
              <Container width={'80%'} height={'40%'} center style={{ justifyContent: 'flex-end' }}>
                <SearchLoupeDeleteSvg size={moderateScale(50)} />
                <Container style={{ marginTop: moderateScale(13) }}>
                  <CustomText text="No hay coincidencias" fontWeight="900" fontSize={theme.fontSize.h4} />
                </Container>
                <Container style={{ marginTop: moderateScale(13) }}>
                  <CustomText
                    text="No se encontraron productos que coincidan con los filtros seleccionados."
                    fontSize={theme.fontSize.h6}
                    fontWeight={'500'}
                    textAlign={'center'}
                  />
                </Container>
              </Container>
              <Container style={{ marginTop: moderateScale(200) }}>
                <Button
                  style={{ width: moderateScale(328) }}
                  size="small"
                  borderColor="iconn_green_original"
                  fontSize="h3"
                  fontBold
                  color="iconn_green_original"
                  round
                  onPress={onPressBack}
                  length="short"
                >
                  {'Regresar a Inicio'}
                </Button>
              </Container>
            </Container>
          )}
        </Container>
        <AdultAgeVerificationScreen onPressClose={hideModalForAdult} visible={visible} productId={productId!} userUpdated={userUpdated} />
      </Container>
    </SafeArea>
  );
};

export default SearchProductResult;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(13),
    paddingBottom: moderateScale(6),
    borderBottomWidth: 1,
    paddingTop: theme.paddingHeader,
    backgroundColor: theme.brandColor.iconn_white,
    borderBottomColor: theme.brandColor.iconn_med_grey
  }
});
