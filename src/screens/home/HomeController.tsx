import { AddressModalScreen, SafeArea, AddressModalSelection } from 'components';
import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import theme from 'components/theme/theme';
import {
  RootState,
  useAppSelector,
  useAppDispatch,
  Address,
  setAddressDefault,
  CarouselItem,
  getHomeItemsThunk,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  ProductInterface,
  ProductResponseInterface,
  ExistingProductInCartInterface,
  ShippingDataAddress,
  ShippingDataInfo,
  ShippingData
} from 'rtk';
import HomeScreen from './HomeScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { getUserAddressesThunk } from 'rtk/thunks/vtex-addresses.thunks';
import { useEnterModal, useInConstruction, useLoading, useToast } from 'context';
import { useAddresses } from './myAccount/hooks/useAddresses';
import { HOME_OPTIONS } from 'assets/files';
import { useProducts } from './hooks/useProducts';
import { useShoppingCart } from './hooks/useShoppingCart';
import { getShoppingCart, getCurrentShoppingCartOrCreateNewOne, saveShippingData } from 'services/vtexShoppingCar.services';
import { updateShoppingCartItems } from 'rtk/slices/cartSlice';
import { vtexProductsServices } from 'services';
import { useFavorites } from 'screens/auth/hooks/useFavorites';
import { vtexPromotionsServices } from 'services/vtexPromotions.services';
import { getProductDetailById, getSkuFilesById } from 'services/vtexProduct.services';
import { setProductVsPromotions, setPromotions } from 'rtk/slices/promotionsSlice';
import Config from 'react-native-config';
interface PropsController {
  paySuccess: boolean;
}

const HomeController: React.FC<PropsController> = ({ paySuccess }) => {
  const { user, isGuest } = useAppSelector((state: RootState) => state.auth);
  const { loading: authLoading } = useAppSelector((state: RootState) => state.auth);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();
  const [addressModalSelectionVisible, setAddressModalSelectionVisible] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [showShippingDropDown, setShowShippingDropDown] = useState(false);
  const toast = useToast();
  const enter = useEnterModal();
  const inConstruction = useInConstruction();
  const { getFavorites } = useFavorites();
  const { email } = user;
  const { RECOMMENDED_PRODUCTS, OTHER_PRODUCTS, DEFAULT_IMAGE_URL, PRODUCT_DETAIL_ASSETS } = Config;

  useEffect(() => {
    if (authLoading === false) loader.hide();
  }, [authLoading]);

  useEffect(() => {
    getFavorites(email as string);
  }, []);

  useEffect(() => {
    if (!!cart.items && cart.items.length) {
      // console.log({defaultAddress})
      addDirection();
    }
  }, [defaultAddress, cart]);

  const addDirection = async () => {
    const selectedAddresses: ShippingDataAddress = {
      addressType: defaultAddress?.addressType ? defaultAddress?.addressType : '',
      receiverName: defaultAddress?.receiverName ? defaultAddress?.receiverName : '',
      postalCode: defaultAddress?.postalCode ? defaultAddress?.postalCode : '',
      city: defaultAddress?.city ? defaultAddress?.city : '',
      state: defaultAddress?.state ? defaultAddress?.state : '',
      country: 'MEX',
      street: defaultAddress?.street ? defaultAddress?.street : '',
      number: defaultAddress?.number ? defaultAddress?.number : '',
      neighborhood: defaultAddress?.neighborhood ? defaultAddress?.neighborhood : '',
      complement: defaultAddress?.complement ? defaultAddress?.complement : '',
      reference: defaultAddress?.reference ? defaultAddress?.reference : '',
      geoCoordinates: defaultAddress?.geoCoordinate ? defaultAddress?.geoCoordinate : []
    };
    const logisticsInfo: ShippingDataInfo = {
      itemIndex: 0,
      selectedDeliveryChannel: 'delivery', // pick-up-point
      selectedSla: 'Mensajeros Urbanos'
    };
    const shippingAttachment: ShippingData = {
      selectedAddresses: [selectedAddresses],
      logisticsInfo: [logisticsInfo]
    };
    await saveShippingData(cart.orderFormId, shippingAttachment);
  };

  const onPressSearch = () => {
    navigate('SearchProducts');
  };

  const viewRecomendedProducts = () => {
    navigate('RecomendedForYou');
  };
  const viewOtherProducts = () => {
    navigate('OtherProducts');
  };

  /**
   * Load User Addresses List and store it in the redux store
   */
  const fetchAddresses = useCallback(async () => {
    loader.show();
    if (user.id) {
      await dispatch(getUserAddressesThunk(user.id!));
    }
  }, []);

  /**
   * Get the user addresses.
   */
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  /**
   * This hook manages every business logic for addresses feature.
   */
  const {
    editAddress,
    removeAddress,
    onPressAddNewAddress,
    addressModalScreenVisible,
    postalCodeInfo,
    address,
    mode,
    modalScreenTitle,
    fetchAddressByPostalCode,
    onSubmit,
    onPressCloseModalScreen,
    postalCodeError,
    setPostalCodeError
  } = useAddresses();

  const onPressCloseAddressModalSelection = () => {
    setAddressModalSelectionVisible(false);
  };

  const onPressAddNewAddressFromHome = () => {
    setAddressModalSelectionVisible(false);
    onPressAddNewAddress();
  };

  /**
   * Function to set a default address locally (just in redux store)
   * @param address
   * @param position
   */
  const onPressSetDefault = (address: Address, position: number) => {
    dispatch(setAddressDefault(position));
  };

  useEffect(() => {
    setDefaultAddress(
      user.addresses!.find(item => {
        return item.isDefault === true;
      }) ?? null
    );
  }, [user.addresses]);

  const onPressCarouselItem = (CarouselItem: CarouselItem) => {
    // If is not a guest and press "Petro" or "Acumula" or "Wallet".
    if (!isGuest && (CarouselItem.id === '1' || CarouselItem.id === '3' || CarouselItem.id === '4')) {
      inConstruction.show();
      return;
    }

    // If is a guest and press any option diferent to "Categories".
    if (isGuest && CarouselItem.id !== '0') {
      enter.show();
      return;
    }

    if (CarouselItem.navigateTo) {
      navigate(CarouselItem.navigateTo);
      return;
    }

    // If press "Categories"
    if (CarouselItem.id === '0') {
      navigate('CategoriesScreen');
      return;
    }
  };

  const [homeItems, setHomeItems] = useState<CarouselItem[] | null>(null);
  const [principal, setPrincipal] = useState<CarouselItem[] | null>(null);
  const [homeOptions, setHomeOptions] = useState<CarouselItem[] | null>(null);
  const [second, setSecond] = useState<CarouselItem[] | null>(null);
  const [day_promotion, setDay_promotion] = useState<CarouselItem[] | null>(null);
  const [all_promotions, setAll_promotions] = useState<CarouselItem[] | null>(null);

  /**
   * Load home items list (banners, promotions, options menu).
   */
  const fetchHomeItems = useCallback(async () => {
    loader.show();
    const homeItems = await dispatch(getHomeItemsThunk()).unwrap();
    setHomeItems(homeItems);
  }, []);

  /**
   * We get the full home items.
   */
  useEffect(() => {
    fetchPromotionData();
    fetchHomeItems();
  }, [fetchHomeItems]);

  useEffect(() => {
    if (homeItems) {
      setHomeOptions(HOME_OPTIONS);
      setPrincipal(homeItems!.filter(item => item.promotion_type === 'principal'));
      setSecond(homeItems!.filter(item => item.promotion_type === 'second'));
      setDay_promotion(homeItems!.filter(item => item.promotion_type === 'day_promotion'));
      setAll_promotions(homeItems!.filter(item => item.promotion_type === 'all_promotions'));
    }
  }, [homeItems]);

  const { fetchProducts, products, otherProducts } = useProducts();
  const [homeProducts, setHomeProducts] = useState<ProductInterface[] | null>();
  const [homeOtherProducts, setHomeOtherProducts] = useState<ProductInterface[] | null>();
  const { updateShoppingCartProduct, migrateCartToAnotherBranch } = useShoppingCart();

  /**
   * Get the current shoppingCart for the logged user, if it doesn't exist, create one.
   */
  const fetchData = useCallback(async () => {
    const { userId } = user;
    if (userId === cart.userProfileId) {
      getShoppingCart(cart.orderFormId).then(response => {
        dispatch(updateShoppingCartItems(response));
      });
    } else {
      getCurrentShoppingCartOrCreateNewOne().then(newCart => {
        getShoppingCart(newCart.orderFormId).then(response => {
          dispatch(updateShoppingCartItems(response));
        });
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (paySuccess && !isGuest) {
      toast.show({
        message: (
          <Text>
            {'Más detalles del pedido en: Cuenta -> '}
            <Text
              style={{ fontWeight: 'bold' }}
              onPress={() => {
                navigate('MyOrders');
              }}
            >
              Pedidos
            </Text>{' '}
          </Text>
        ),
        type: 'limited'
      });
    } else if (paySuccess && isGuest) {
      toast.show({
        message: 'Más detalles sobre el pedido en tu correo electrónico',
        type: 'limited'
      });
    }
  }, [paySuccess]);

  const getPriceByProductId = async (productId: string) => {
    return await dispatch(getProductPriceByProductIdThunk(productId)).unwrap();
  };

  const getRatingByProductId = async (productId: string) => {
    return await dispatch(getProductRatingByProductIdThunk(productId)).unwrap();
  };

  const getAllPromotions = async () => {
    let allPromotions = [];
    await vtexPromotionsServices.getAllPromotions().then(async promotionsResponse => {
      if (promotionsResponse) {
        const { items } = promotionsResponse;
        items.map(it => {
          if (it.isActive == true) {
            allPromotions.push(it);
          }
        });
      }
    });
    return allPromotions;
  };

  const giftsPromotionsByCalculatorId = async (idCalculatorConfiguration: string) => {
    let giftsList = [];
    try {
      await vtexPromotionsServices.getPromotionById(idCalculatorConfiguration).then(async promotionResponse => {
        if (promotionResponse) {
          if (promotionResponse.isActive) {
            if (promotionResponse.type == 'regular' || promotionResponse.type == 'campaign') {
              const { skus } = promotionResponse;
              if (skus.length > 0) {
                skus.map(skus => {
                  giftsList.push({
                    gift: skus.id,
                    name: promotionResponse.name,
                    type: promotionResponse.type,
                    percentualDiscountValue: promotionResponse.percentualDiscountValue,
                    maximumUnitPriceDiscount: promotionResponse.maximumUnitPriceDiscount
                  });
                });
              }
            } else if (promotionResponse.type == 'buyAndWin' || promotionResponse.type == 'forThePriceOf') {
              if (promotionResponse.listSku1BuyTogether) {
                const { listSku1BuyTogether } = promotionResponse;
                if (listSku1BuyTogether.length > 0) {
                  listSku1BuyTogether.map(listSku => {
                    giftsList.push({
                      gift: listSku.id,
                      name: promotionResponse.name,
                      type: promotionResponse.type,
                      percentualDiscountValue: promotionResponse.percentualDiscountValue,
                      maximumUnitPriceDiscount: promotionResponse.maximumUnitPriceDiscount
                    });
                  });
                }
              }
            }
          }
        }
      });
    } catch (error) {
      // console.log('FOUR', error);
    }
    return giftsList;
  };

  /**
   * Returns the product price.
   * @param productId
   * @returns i.e: 1300
   */
  const getProductPriceById = async (productId: string) => {
    let price = 0;
    try {
      await vtexProductsServices.getProductPriceByProductId(productId).then(async responsePrice => {
        if (responsePrice) {
          price = responsePrice.sellingPrice;
        }
      });
    } catch (error) {
      // console.log('SIX', error);
    }
    return price;
  };

  /**
   * Return the product raiting.
   * @param productId
   * @returns ie: 3
   */
  const getProductRatingById = async (productId: string) => {
    let rating = 0;
    try {
      await vtexProductsServices.getProductRatingByProductId(productId).then(async responseRating => {
        if (responseRating) {
          rating = responseRating.average;
        }
      });
    } catch (error) {
      // console.log('EIGHT', error);
    }
    return rating;
  };

  const getPictureByProductId = async (productId: string) => {
    const imgRoot = PRODUCT_DETAIL_ASSETS;
    let pics = DEFAULT_IMAGE_URL;
    try {
      await getSkuFilesById(productId).then(async responseSku => {
        if (responseSku) {
          if (responseSku.length > 0) {
            pics = imgRoot + responseSku[0].ArchiveId + '-' + responseSku[0].Id + '-' + '300';
          }
        }
      });
    } catch (error) {
      // console.warn(`ERROR in getPictureByProductId for productId: ${productId}`, error);
    }
    return pics;
  };

  const fetchPromotionData = useCallback(async () => {
    let allPromotions = await getAllPromotions();
    let productsBuilded = [];
    let productPromosMap = new Map();
    let testP = [];
    try {
      for (let i = 0; i < allPromotions.length; i++) {
        testP[i] = await giftsPromotionsByCalculatorId(allPromotions[i].idCalculatorConfiguration);
        if (testP[i].length > 0) {
          for (let j = 0; j < testP[i].length; j++) {
            let price = await getProductPriceById(testP[i][j].gift);
            let rating = await getProductRatingById(testP[i][j].gift);
            let image = await getPictureByProductId(testP[i][j].gift);
            if (price && image) {
              await getProductDetailById(testP[i][j].gift).then(responseProductDetail => {
                if (responseProductDetail) {
                  productPromosMap.set(testP[i][j].gift, {
                    name: responseProductDetail.Name,
                    percentualDiscountValue: testP[i][j].percentualDiscountValue,
                    maximumUnitPriceDiscount: testP[i][j].maximumUnitPriceDiscount,
                    productId: testP[i][j].gift,
                    promotionName: testP[i][j].name,
                    promotionType: testP[i][j].type,
                    quantity: 1
                  });
                  productsBuilded.push({
                    priceWithDiscount: 1,
                    name: responseProductDetail.Name,
                    price: price,
                    productId: testP[i][j].gift,
                    quantity: 0,
                    rating: rating,
                    image: image
                  });
                }
              });
            }
          }
        }
      }
    } catch (error) {
      // console.log('ELEVEN', error);
    }

    dispatch(setProductVsPromotions(productPromosMap));
    dispatch(setPromotions(productsBuilded));
  }, []);

  async function getProductsInfo(existingProductsInCart: ExistingProductInCartInterface[], collectionId: string) {
    const arr: ProductResponseInterface[] | null | undefined = collectionId === RECOMMENDED_PRODUCTS ? products : otherProducts;
    const homeProductsArr: ProductInterface[] | undefined = [];
    for (const product of arr) {
      const price = await getPriceByProductId(product.ProductId);
      const raiting = await getRatingByProductId(product.ProductId);
      if (price && raiting) {
        const newProduct: ProductInterface = {
          productId: product.ProductId,
          name: product.ProductName,
          image: { uri: product.SkuImageUrl },
          price: price.sellingPrice,
          oldPrice: price.sellingPrice,
          porcentDiscount: 0,
          quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.ProductId.toString())?.quantity : 0,
          ratingValue: raiting.average
        };
        homeProductsArr.push(newProduct);
      }
    }
    if (collectionId === RECOMMENDED_PRODUCTS) setHomeProducts(homeProductsArr);
    if (collectionId === OTHER_PRODUCTS) setHomeOtherProducts(homeProductsArr);
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
    if (products?.length! > 0) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      getProductsInfo(existingProducts, RECOMMENDED_PRODUCTS!);
    }
  }, [products]);

  useEffect(() => {
    if (otherProducts?.length! > 0) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      getProductsInfo(existingProducts, OTHER_PRODUCTS!);
    }
  }, [otherProducts]);

  /**
   * Load home products when shopping cart is modified. For example if there is a substract, remove, add, in the cart.
   * Also load home products again if user changes the default seller.
   */
  useEffect(() => {
    fetchProducts(RECOMMENDED_PRODUCTS!);
    fetchProducts(OTHER_PRODUCTS!);
  }, [cart, defaultSeller]);

  useEffect(() => {
    const { items } = cart;
    if (items && items.length > 0) {
      migrateCartToAnotherBranch(defaultSeller?.seller!);
    }
  }, [defaultSeller]);

  const onSubmitAddress = (address: Address) => {
    setShowShippingDropDown(false);
    onSubmit(address);
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <HomeScreen
        onPressAddNewAddress={onPressAddNewAddress}
        onPressShowAddressesModal={() => setAddressModalSelectionVisible(true)}
        onPressSearch={onPressSearch}
        defaultAddress={defaultAddress!}
        showShippingDropDown={showShippingDropDown}
        principalItems={principal!}
        homeOptions={homeOptions!}
        secondItems={second!}
        dayPromotionItems={day_promotion!}
        allPromotionsItems={all_promotions!}
        onPressCarouselItem={onPressCarouselItem}
        homeProducts={homeProducts!}
        homeOtherProducts={homeOtherProducts!}
        updateShoppingCartProduct={updateShoppingCartProduct}
        viewRecomendedProducts={viewRecomendedProducts}
        viewOtherProducts={viewOtherProducts}
        isAddressModalSelectionVisible={addressModalSelectionVisible}
      />
      <AddressModalSelection
        visible={addressModalSelectionVisible}
        addresses={user.addresses!}
        onPressEdit={editAddress}
        onPressDelete={removeAddress}
        onPressAddNewAddress={onPressAddNewAddressFromHome}
        onPressClose={onPressCloseAddressModalSelection}
        onPressSetDefault={onPressSetDefault}
      />
      <AddressModalScreen
        visible={addressModalScreenVisible}
        postalCodeInfo={postalCodeInfo!}
        address={address!}
        mode={mode!}
        title={modalScreenTitle}
        onPressFindPostalCodeInfo={fetchAddressByPostalCode}
        onSubmit={onSubmitAddress}
        onPressClose={onPressCloseModalScreen}
        postalCodeError={postalCodeError}
        setPostalCodeError={setPostalCodeError}
      />
    </SafeArea>
  );
};

export default HomeController;
