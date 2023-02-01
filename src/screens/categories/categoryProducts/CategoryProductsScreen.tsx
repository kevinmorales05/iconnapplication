import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { AccordeonItemTypeProps } from 'components/types/Accordion';
import {
  ExistingProductInCartInterface,
  getProductsByCategoryAndFiltersItemsThunk,
  ProductInterface,
  ProductsBySubCategorieRequestInterface,
  RootState,
  TabItem,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { AccordionFilter, Button, CardProduct, CardProductSkeleton, Container, CustomText, SafeArea, SearchBar, TabAnimatable } from 'components';
import { DrawerLayout } from 'react-native-gesture-handler';
import theme from 'components/theme/theme';
import { FilterItemTypeProps } from 'components/types/FilterITem';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { useLoading } from 'context';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { FlashList } from '@shopify/flash-list';

const ordenBy: FilterItemTypeProps[] = [
  {
    name: 'Relevancia',
    filter: 'OrderByTopSaleDESC'
  },
  {
    name: 'Más reciente',
    filter: 'OrderByReleaseDateDESC'
  }
  // {
  //   name: "Descuento",
  //   filter: "OrderByBestDiscountDESC"
  // },
  // {
  //   name: "Precio: Menor a mayor",
  //   filter: "OrderByPriceASC"
  // },
  // {
  //   name: "Precio: Mayor a menor",
  //   filter: "OrderByPriceDESC"
  // }
];

const filters: AccordeonItemTypeProps[] = [
  {
    sectionName: 'Ordenar por',
    filters: ordenBy,
    type: 'radio',
    hasMultiCheck: false
  }
];

const CategoryProductsScreen: React.FC = () => {
  const { setOptions, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'CategoryProducts'>>();
  const loader = useLoading();

  const dispatch = useAppDispatch();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);

  const { category } = route.params;

  const [idCategorySelected, setIdCategorySelected] = useState<string>(category.id + '');
  const [categoriesBar, setCategoriesBar] = useState<TabItem[]>([]);
  const [productsRender, setProductsRender] = useState<ProductInterface[]>([]);
  // const [filterSelect, setFilterSelect] = useState<ProductsByCategoryFilter>('OrderByTopSaleDESC');
  // const [selectBrand, setSelectBrand] = useState<string[]>([]);
  const [itemToLoad, setItemToLoad] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [ selectFilters, setSelectFilters] = useState({})
  const [visible, setVisible] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingNewTab, setLoadingNewTab] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(true);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(false);

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

  const drawerComponet = useRef<DrawerLayout>(null);

  useEffect(() => {
    setOptions({
      title: category.name
    });
    // setIdCategorySelected(category.id + '');
  }, [category, route.params]);

  useEffect(() => {
    if (category.subCategories.length) {
      const categoriesTab: TabItem[] = [
        {
          id: category.id + '',
          name: 'Todo'
        }
      ];
      category.subCategories.forEach(categoryFilter => {
        categoriesTab.push({
          id: categoryFilter.sub_categories_id + '',
          name: categoryFilter.title ? categoryFilter.title : ''
        });
      });
      setIdCategorySelected(categoriesTab[0].id + '');
      setCategoriesBar(categoriesTab);
    }
  }, [category, route.params]);

  useEffect(() => {
    if (!isLoading && isLoadingNewTab) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      productsEffect(existingProducts);
    }
  }, [idCategorySelected, isLoading, isLoadingNewTab, route.params]);

  useEffect(() => {
    const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
    productsEffect(existingProducts);
  }, []);

  useEffect(() => {
    if (productsRender?.length! > 0) {
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
            productId: product.products_id,
            name: product.name,
            image: { uri: product.image },
            price: Number.parseFloat(product.selling_price),
            oldPrice: Number.parseFloat(product.selling_price),
            quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.products_id.toString())?.quantity : 0,
            ratingValue: 0,
            promotionType: product.promotions && product.promotions.type,
            promotionName: product.promotions && product.promotions.name,
            percentualDiscountValue: product.promotions && product.promotions.percentual_discount_value,
            maximumUnitPriceDiscount: product.promotions && product.promotions.maximum_unit_price_discount,
            costDiscountPrice: product.costDiscountPrice
          };
        });
        await setProductsRender(productsTem);
        await setItemToLoad(1);
        loader.hide();
        setLoading(false);
        setLoadingMore(true);
        setRefreshing(false);
      } else {
        loader.hide();
        setProductsRender([]);
        setRefreshing(false);
      }
      setLoadingNewTab(false);
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
    if (productsRequest.responseCode === 603) {
      if (productsRequest.data.products.length) {
        const productsTem: ProductInterface[] = productsRequest.data.products.map(product => {
          return {
            productId: product.products_id,
            name: product.name,
            image: { uri: product.image },
            price: Number.parseFloat(product.selling_price),
            oldPrice: Number.parseFloat(product.selling_price),
            quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.products_id.toString())?.quantity : 0,
            ratingValue: 0,
            promotionType: product.promotions && product.promotions.type,
            promotionName: product.promotions && product.promotions.name,
            percentualDiscountValue: product.promotions && product.promotions.percentual_discount_value,
            maximumUnitPriceDiscount: product.promotions && product.promotions.maximum_unit_price_discount,
            costDiscountPrice: product.costDiscountPrice
          };
        });
        if (!productsRequest.data.products.length) {
          setLoading(false);
          setLoadingMore(false);
        } else {
          const productsToRender: ProductInterface[] = productsRender.concat(productsTem);
          await setProductsRender(productsToRender);
          await setItemToLoad(itemToLoad + 1);
          setLoading(false);
        }
      }
    }
  };

  const getProducts = async (itemToLoad: number) => {
    const data: ProductsBySubCategorieRequestInterface = {
      storeId: defaultSeller?.Campo ? Number.parseInt(defaultSeller.seller.split('oneiconntienda')[1]) : 0,
      subCategoryId: Number.parseInt(idCategorySelected),
      categoryId: category.id ? Number.parseInt(category.id) : 0,
      pageNumber: itemToLoad,
      pageSize: 10
    };
    return await dispatch(getProductsByCategoryAndFiltersItemsThunk(data)).unwrap();
  };

  const onPressTab = (cateogry: TabItem) => {
    if (cateogry.id) {
      loader.show();
      setLoadingNewTab(true);
      setProductsRender([]);
      setIdCategorySelected(cateogry.id);
    }
  };

  const onPressFilter = () => {
    // filter: ProductsByCategoryFilter props
    // setFilterSelect(filter);
  };

  const onPressCleanFilter = () => {
    // setFilterSelect('OrderByTopSaleDESC');
  };

  const onPressSearch = () => {
    navigate('SearchProducts');
  };

  const renderDrawer = () => {
    return (
      <Container backgroundColor={theme.brandColor.iconn_white}>
        <Container style={{ padding: moderateScale(16) }} height={Dimensions.get('window').height * 0.76}>
          <AccordionFilter sections={filters} onPressFilter={onPressFilter} />
        </Container>
        <View style={styles.containerBottom}>
          <Container
            width={'100%'}
            backgroundColor={theme.brandColor.iconn_white}
            row
            space="between"
            height={Dimensions.get('window').height * 0.15}
            style={{ padding: moderateScale(16), opacity: 0.5 }}
          >
            <Button
              width="small"
              size="medium"
              borderColor="iconn_green_original"
              fontSize="h3"
              fontBold
              color="iconn_green_original"
              round
              onPress={() => {
                onPressCleanFilter();
                drawerComponet.current?.closeDrawer();
              }}
              outline
              length="short"
            >
              {'Limpiar'}
            </Button>
            <Button
              width="small"
              size="small"
              borderColor="iconn_green_original"
              fontSize="h3"
              fontBold
              color="iconn_white"
              onPress={() => {
                drawerComponet.current?.closeDrawer();
              }}
              style={{ backgroundColor: theme.brandColor.iconn_green_original, borderRadius: moderateScale(14), height: moderateScale(50) }}
              length="short"
            >
              {'Aplicar'}
            </Button>
          </Container>
        </View>
      </Container>
    );
  };

  const _renderItem = ({ item, index }: { item: ProductInterface; index: number }) => {
    return (
      <CardProduct
        key={item.productId}
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
    return <Container height={moderateScale(20)} />;
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

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <DrawerLayout
        drawerWidth={moderateScale(305)}
        ref={drawerComponet}
        drawerPosition={DrawerLayout.positions.Right}
        drawerType="front"
        minSwipeDistance={0}
        drawerBackgroundColor={theme.brandColor.iconn_white}
        renderNavigationView={renderDrawer}
      >
        <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap' }}>
          <Container style={styles.containerHeader}>
            <SearchBar isButton onPressSearch={onPressSearch} />
            {/* <Touchable onPress={()=>{
                  drawerComponet.current.openDrawer();
                }}>
                  <Container style={styles.containerButton}>
                    <Ionicons name="options-outline" size={theme.iconSize.large} color={theme.brandColor.iconn_accent_secondary} />
                  </Container>
                </Touchable> */}
            <Container style={{ marginTop: moderateScale(10) }}>
              <TabAnimatable items={categoriesBar} onPressItem={onPressTab} idSelected={idCategorySelected} />
            </Container>
          </Container>
          <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15) }}>
            {productsRender.length ? (
              <Container width={'100%'}>
                <Container style={{ marginTop: moderateScale(15) }}>
                  {/* <CustomText
                    text={`${productsRender.length} producto${productsRender.length > 1 ? 's' : ''} encontrado${productsRender.length > 1 ? 's' : ''}`}
                    textColor={theme.fontColor.placeholder}
                    fontSize={theme.fontSize.h6}
                  /> */}
                </Container>
                <Container height={verticalScale(520)} width={'100%'}>
                  <FlashList
                    data={productsRender}
                    renderItem={_renderItem}
                    onEndReachedThreshold={0}
                    onEndReached={loadMoreItem}
                    refreshing={refreshing}
                    removeClippedSubviews={true}
                    onRefresh={() => _onRefresh()}
                    onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
                    keyExtractor={item => item.productId + ''}
                    numColumns={2}
                    estimatedItemSize={moderateScale(250)}
                    ListFooterComponent={_renderFooter}
                    ListFooterComponentStyle={{ width: '100%' }}
                  />
                </Container>
              </Container>
            ) : (
              <Container width={'100%'} height={'100%'} center>
                <Container width={'80%'} height={'40%'} center style={{ justifyContent: 'flex-end' }}>
                  <SearchLoupeDeleteSvg size={moderateScale(50)} />
                  <Container style={{ marginTop: moderateScale(13) }}>
                    <CustomText text="Sin productos" fontWeight="900" fontSize={theme.fontSize.h4} />
                  </Container>
                  <Container style={{ marginTop: moderateScale(13) }}>
                    <CustomText
                      text="Por el momento no hay ningún producto disponible para esta categoría."
                      fontSize={theme.fontSize.h6}
                      fontWeight={'500'}
                      textAlign={'center'}
                    />
                  </Container>
                </Container>
                {/* <Container style={{ marginTop: moderateScale(200) }}>
                  <Button
                    style={{ width: moderateScale(328) }}
                    size="small"
                    borderColor="iconn_green_original"
                    fontSize="h3"
                    fontBold
                    color="iconn_green_original"
                    round
                    onPress={() => {
                      onPressCleanFilter();
                    }}
                    length="short"
                  >
                    {'Limpiar'}
                  </Button>
                </Container> */}
              </Container>
            )}
          </Container>
          <AdultAgeVerificationScreen onPressClose={hideModalForAdult} visible={visible} productId={productId!} userUpdated={userUpdated} />
        </Container>
      </DrawerLayout>
    </SafeArea>
  );
};

export default CategoryProductsScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(7),
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
