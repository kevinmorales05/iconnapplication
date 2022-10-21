import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, FlatList, View } from 'react-native';
import {
  ExistingProductInCartInterface,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  getProductsByCategoryAndFiltersItemsThunk,
  ProductInterface,
  ProductPriceResponseInterface,
  ProductRaitingResponseInterface,
  ProductSearchItemInterface,
  RootState,
  TabItem,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { BasketCounter, Button, CardProduct, Container, CustomText, SafeArea, SearchBar, TabAnimatable, Touchable } from 'components';
import Feather from 'react-native-vector-icons/Feather';
import theme from 'components/theme/theme';
import { ProductsByCategoryFilter } from 'rtk/types/category.types';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { moderateScale } from 'utils/scaleMetrics';
import AdultAgeVerificationScreen  from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { getProductDetailById } from 'services/vtexProduct.services';
import { vtexUserServices } from 'services';

const SearchProductResult: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'SearchProductsResults'>>();
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const { products, textSearch } = route.params;
  const [productsRender, setProductsRender] = useState<ProductInterface[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const onPressOut = () => {
    setVisible(!visible);
  };

  const validateCategoryForAddItem = (itemId: string) => {
    console.log('validate itemId:::', itemId);
    getProductDetailById(itemId).then(productDetail => {
      if (productDetail.DepartmentId == 167) {
        if (user.email) {
          vtexUserServices.getUserByEmail(user.email).then(userResponse => {
            let isAdult = false;
            if (userResponse) {
              const { data } = userResponse;
              if (data) {
                if (data.length > 0) {
                  isAdult = data[0].isAdult;
                  if (isAdult) {
                    updateShoppingCartProduct!('create', itemId);
                  } else {
                    onPressOut();
                  }
                }
              }
            }
          })
        }
      } else {
        updateShoppingCartProduct!('create', ItemId);
      }
    })
  };

  useEffect(() => {
    if (products?.length! > 0) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      refillProductsWithPrice(existingProducts);
    }
  }, [products, cart, visible]);

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

  async function refillProductsWithPrice(
    existingProductsInCart: ExistingProductInCartInterface[],
  ){
    let productsToRender: ProductInterface[] = [];
    let productsTem: ProductSearchItemInterface[] = [];
    productsTem = products.concat(productsTem)
    for( const p of products ) {
      const price = await getPriceByProductId(p.productId);
      const raiting = await getRatingByProductId(p.productId)
      if(price && raiting){
        productsToRender.push({
          ratingValue: raiting.average,
          price: price?.basePrice,
          oldPrice: price?.basePrice,
          name: p.nameComplete,
          image: { uri: p.imageUrl },
          quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0,
          productId: p.productId
        })
      }
      console.log({productsToRender})
    }
    console.log({productsToRender})
    setProductsRender(productsToRender);
  }

  const getPriceByProductId = async (productId: string) => {
    return await dispatch(getProductPriceByProductIdThunk(productId)).unwrap();
  };

  const getRatingByProductId = async (productId: string) => {
    return await dispatch(getProductRatingByProductIdThunk(productId)).unwrap();
  };

  async function getPrices() {
    const withPrice = await Promise.all(products!.map(product => getPriceByProductId(product.productId)));
    return withPrice;
  }

  async function getRatings() {
    const withRating = await Promise.all(products!.map(product => getRatingByProductId(product.productId)));
    return withRating;
  }

  const _renderItem = ({ item }) => {
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
        onPressAddCart={() => {validateCategoryForAddItem(item.productId)}}
        onPressAddQuantity={() => {
          updateShoppingCartProduct!('add', item.productId);
        }}
        onPressDeleteCart={() => {
          updateShoppingCartProduct!('remove', item.productId);
        }}
        onPressDecreaseQuantity={() => {
          updateShoppingCartProduct!('substract', item.productId);
        }}
        onPressOut={onPressOut}
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
          <Container flex={0.67}>
            <SearchBar isButton onPressSearch={onPressBack} onChangeTextSearch={() => {}} textSearch={textSearch} />
          </Container>
          <Container width={'100%'} flex={0.23} style={{ paddingLeft: moderateScale(10), height: moderateScale(25) }}>
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
              <Container height={Dimensions.get('window').height * 0.75} width={'100%'}>
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
        <AdultAgeVerificationScreen onPressClose={onPressOut}
            visible={visible} />
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
