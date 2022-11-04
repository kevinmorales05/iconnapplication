import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { AccordeonItemTypeProps } from 'components/types/Accordion';
import {
  ExistingProductInCartInterface,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  getProductsByCategoryAndFiltersItemsThunk,
  ProductInterface,
  RootState,
  TabItem,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { AccordionFilter, Button, CardProduct, CardProductSkeleton, Container, CustomText, SafeArea, SearchBar, TabAnimatable } from 'components';
import { DrawerLayout } from 'react-native-gesture-handler';
import theme from 'components/theme/theme';
import { ProductsByCategoryFilter } from 'rtk/types/category.types';
import { FilterItemTypeProps } from 'components/types/FilterITem';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { useLoading } from 'context';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';

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
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { categories, category } = route.params;

  const [idCategorySelected, setIdCategorySelected] = useState<string>(category.id + '');
  const [categoriesBar, setCategoriesBar] = useState<TabItem[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [productsRender, setProductsRender] = useState<ProductInterface[]>([]);
  const [filterSelect, setFilterSelect] = useState<ProductsByCategoryFilter>('OrderByTopSaleDESC');
  // const [selectBrand, setSelectBrand] = useState<string[]>([]);
  const [itemToLoad, setItemToLoad] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [ selectFilters, setSelectFilters] = useState({})
  const [visible, setVisible] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingNewTab, setLoadingNewTab] = useState<boolean>(false);

  const hideModalForAdult = () => {
    console.log('hideModalForAdult...');
    setVisible(false);
  };

  const showModalForAdult = () => {
    console.log('showModalForAdult...');
    setVisible(true);
  };

  const userUpdated = (productId: string, isAdult: boolean) => {
    updateShoppingCartProduct!('create', productId);
    hideModalForAdult();
  };

  const validateCategoryForAddItem = (isAdult: boolean, productId: string) => {
    console.log('isAdult', isAdult);
    console.log('pId', productId);
    if (isAdult) {
      console.log('updateShoppingCartProduct');
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
    setIdCategorySelected(category.id + '');
  }, [category, route.params]);

  useEffect(() => {
    console.log({ category });
    if (category.children.length) {
      const categoriesTab: TabItem[] = [
        {
          id: category.id + '',
          name: 'Todo'
        }
      ];
      category.children.map(categoryFilter => {
        categoriesTab.push({
          id: categoryFilter.id + '',
          name: categoryFilter.Title
        });
      });
      setCategoriesBar(categoriesTab);
    }
  }, [category, route.params]);

  useEffect(() => {
    if(!isLoading && isLoadingNewTab){
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      productsEffect(existingProducts);
    }
  }, [idCategorySelected, isLoading, isLoadingNewTab, route.params]);

  useEffect(() => {
    const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
    productsEffect(existingProducts);
  }, []);

  // useEffect(() => {
  //   if (products?.length! > 0) {
  //     const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
  //     refillProductsWithPrice(existingProducts);
  //   }
  // }, [products]);

  useEffect(() => {
    if (products?.length! > 0) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      updateQuantityProducts(existingProducts);
    }
  }, [products, cart]);

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
      const price = await getPriceByProductId(p.productId);
      p.quantity = existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0;
    }
    setProductsRender(productsToRender);
    setRefreshing(false);
  }

  const getPriceByProductId = async (productId: string) => {
    return await dispatch(getProductPriceByProductIdThunk(productId)).unwrap();
  };

  const getRatingByProductId = async (productId: string) => {
    return await dispatch(getProductRatingByProductIdThunk(productId)).unwrap();
  };

  const productsEffect = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    loader.show();
    setProducts([]);
    setProductsRender([]);
    const productsRequest: any[] = await getProducts(1);
    if (productsRequest.length) {
      const productsTem: ProductInterface[] = productsRequest.map(product => {
        return {
          name: product.productTitle,
          image: { uri: product.items[0]?.images[0].imageUrl! },
          quantity: 0,
          productId: product.productId
        };
      });
      let productsToRender: ProductInterface[] = [];
      productsToRender = productsRender.concat(productsToRender);
      for (const p of productsTem) {
        const price = await getPriceByProductId(p.productId);
        const raiting = await getRatingByProductId(p.productId);
        if (price && raiting) {
          p.oldPrice = price?.sellingPrice;
          p.price = price?.sellingPrice;
          p.ratingValue = raiting.average;
          p.quantity = existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0;
          productsToRender.push(p);
        }
      }
      await setProductsRender(productsToRender);
      await setItemToLoad(itemToLoad + 10);
      loader.hide();
      setLoading(false);
    } else {
      setProducts([]);
      loader.hide();
      setProductsRender([]);
    }
    setLoadingNewTab(false)
  };

  const loadMoreProducts = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    setLoading(true);
    const productsRequest: any[] = await getProducts(itemToLoad + 10);
    let productsTem: ProductInterface[] = productsRequest.map(product => {
      return {
        name: product.productTitle,
        image: { uri: product.items[0]?.images[0].imageUrl! },
        quantity: 0,
        productId: product.productId
      };
    });
    if (!productsRequest.length) {
      setLoading(false);
    }else{
      let productsToRender: ProductInterface[] = [];
      productsToRender = productsRender.concat(productsToRender);
      for (const p of productsTem) {
        const price = await getPriceByProductId(p.productId);
        const raiting = await getRatingByProductId(p.productId);
        if (price && raiting) {
          p.oldPrice = price?.sellingPrice;
          p.price = price?.sellingPrice;
          p.ratingValue = raiting.average;
          p.quantity = existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0;
          productsToRender.push(p);
        }
      }
      await setProductsRender(productsToRender);
      await setItemToLoad(itemToLoad + 10);
      setLoading(false);
    }
    // setProducts(productsTem);
  };

  const getProducts = async (itemToLoad: number) => {
    return await dispatch(getProductsByCategoryAndFiltersItemsThunk({ filter: filterSelect, categoryId: category.id + "", subCategory: idCategorySelected ,itemToLoad: itemToLoad })).unwrap();
  };

  const onPressTab = (cateogry: TabItem) => {
    if (cateogry.id) {
      console.log('[onPressTab]', cateogry);
      loader.show();
      setLoadingNewTab(true)
      setIdCategorySelected(cateogry.id);
    }
  };

  const onPressFilter = (filter: ProductsByCategoryFilter) => {
    console.log({ filter });
    setFilterSelect(filter);
  };

  const onPressCleanFilter = () => {
    setFilterSelect('OrderByTopSaleDESC');
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

  const _renderItem = ({ item }) => {
    return (
      <CardProduct
        ratingValue={item.ratingValue}
        price={item.price}
        porcentDiscount={item.porcentDiscount}
        name={item.name}
        image={item.image}
        quantity={item.quantity}
        productId={item.productId}
        oldPrice={item.oldPrice}
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
    if(isLoading){
      const residuoOperation = productsRender.length % 2;
      console.log({residuoOperation})
      if(residuoOperation === 0){
        return(
          <Container style={{justifyContent: 'space-between',flexDirection: 'row', width: Dimensions.get('screen').width, paddingHorizontal: moderateScale(15), left: -moderateScale(15)}}>
            <CardProductSkeleton notMarinLeft />
            <CardProductSkeleton notMarinLeft />
          </Container>
        )
      }else{
        return (
          <Container row>
            <CardProductSkeleton notMarinLeft />
          </Container>
        )
      }
    }
    return null
  }

  const loadMoreItem = async () => {
    if(!isLoading){
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      loadMoreProducts(existingProducts);
    }
  };

  const _onRefresh = () => {
    console.log('_onRefresh');
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
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMoreItem}
                    refreshing={refreshing}
                    onRefresh={() => _onRefresh()}
                    keyExtractor={(item) => item.productId + ""}
                    contentContainerStyle={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      paddingBottom: moderateScale(50)
                    }}
                    ListFooterComponent={_renderFooter}
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
