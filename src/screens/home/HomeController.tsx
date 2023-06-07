import { AddressModalScreen, SafeArea, AddressModalSelection } from 'components';
import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import theme from 'components/theme/theme';
import {
  RootState,
  useAppSelector,
  useAppDispatch,
  Address,
  setAddressDefault,
  CarouselItem,
  ProductInterface,
  ExistingProductInCartInterface,
  ShippingDataAddress,
  ShippingDataInfo,
  ShippingData,
  setDateSync,
  ProductsByCollectionInterface,
  ModuleInterface,
  setAppModules,
  store
} from 'rtk';
import HomeScreen from './HomeScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getUserAddressesThunk } from 'rtk/thunks/vtex-addresses.thunks';
import { useEnterModal, useInConstruction, useLoading, useToast, useWelcomeModal } from 'context';
import { useAddresses } from './myAccount/hooks/useAddresses';
import { HOME_OPTIONS } from 'assets/files';
import { useProducts } from './hooks/useProducts';
import { useShoppingCart } from './hooks/useShoppingCart';
import { getShoppingCart, getCurrentShoppingCartOrCreateNewOne, saveShippingData, forceToCreateNewShoppingCart } from 'services/vtexShoppingCar.services';
import { setDetailSelected, setShoppingCartInitialState, updateShoppingCartItems } from 'rtk/slices/cartSlice';
import { useFavorites } from 'screens/auth/hooks/useFavorites';
import Config from 'react-native-config';
import { getBanksWalletThunk, getWalletPrefixesThunk } from 'rtk/thunks/wallet.thunks';
import moment from 'moment';
import remoteConfig from '@react-native-firebase/remote-config';
import { envariomentState } from '../../common/modulesRemoteConfig';
import { logEvent } from 'utils/analytics';
import { homeServices } from 'services';
import { citiCouponsServices } from 'services/coupons.services';
import { CouponInterface, UserCouponInterface, UserCouponWithStateInterface } from 'rtk/types/coupons.types';
import { useLocation } from 'hooks/useLocation';
import { useOrders } from 'screens/home/hooks/useOrders';
import { useOrdersMonitor } from 'context/ordersMonitor.context';
import ActivatedCoupon from './myAccount/coupons/ActivatedCoupon';
interface PropsController {
  paySuccess: boolean;
}

const HomeController: React.FC<PropsController> = ({ paySuccess }) => {
  const { user, isGuest } = useAppSelector((state: RootState) => state.auth);
  const { loading: authLoading } = useAppSelector((state: RootState) => state.auth);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const { completeGeolocation, getCurrentLocation } = useLocation();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { navigate, reset } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();
  const [addressModalSelectionVisible, setAddressModalSelectionVisible] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [showShippingDropDown, setShowShippingDropDown] = useState(false);
  const toast = useToast();
  const enter = useEnterModal();
  const inConstruction = useInConstruction();
  const { getFavorites } = useFavorites();
  const { email } = user;
  const { RECOMMENDED_PRODUCTS, OTHER_PRODUCTS, ENV_STATE } = Config;
  const welcomeModal = useWelcomeModal();
  const [isChargin, setIsChargin] = useState(false);
  const { dateSync } = useAppSelector((state: RootState) => state.wallet);
  const [isLoadBanners, setIsLoadBanners] = useState<boolean>(true);
  const [coupons, setCoupons] = useState<CouponInterface[]>();
  const [userCoupons, setUserCoupons] = useState<UserCouponInterface[]>([]);
  const [userMunicipality, setUserMunicipality] = useState('none');
  const [userState, setUserState] = useState('none');
  const [couponsWithState, setCouponsWithState] = useState<UserCouponWithStateInterface[]>();
  const [cIDAndState, setCIdAndState] = useState<UserCouponWithStateInterface[]>();
  const [mixedCoupons, setMixedCoupons] = useState<UserCouponInterface[]>([]);

  console.log('ABRIL', mixedCoupons);

  const getStateMuni = async () => {
    if (!isGuest) {
      await getCurrentLocation();
      const googleLocation = completeGeolocation.plus_code.compound_code.split(',');
      const googleState = completeGeolocation.plus_code.compound_code.split(',')[1];
      const googleM = completeGeolocation.plus_code.compound_code.trim().split(' ')[1];
      const googleMunicipality = googleM.replace(',', '');
      setUserMunicipality(googleMunicipality);
      setUserState(googleState);
    }
  };

  useEffect(() => {
    getStateMuni();
  }, [getStateMuni]);

  const getCoupons = async (pageNumber: number) => {
    if (!isGuest) {
      if (userState !== 'none' && userMunicipality !== 'none') {
        const couponsHome = await citiCouponsServices.getPromotionsCoupons(userState, userMunicipality, pageNumber, 20);
        const { data } = couponsHome;
        setCoupons(data);
      } else if (userState === 'none' && userMunicipality === 'none') {
        const couponsHome = await citiCouponsServices.getPromotionsCoupons(userState, userMunicipality, pageNumber, 20);
        const { data } = couponsHome;
        setCoupons(data);
      } else if (userState === ' ' && userMunicipality !== ' ') {
        setCoupons([]);
      }
    } else {
      setCoupons([]);
    }
  };

  function compareFn(a: UserCouponInterface, b: UserCouponInterface) {
    if (a.coupons_status_id === 2 && b.coupons_status_id !== 2) {
      return 1;
    }
    if (a.coupons_status_id !== 2 && b.coupons_status_id === 2) {
      return -1;
    }
    return 0;
  }

  const getCouponsMixed = () => {
    if (coupons.length > 0 && userCoupons.length > 0) {
      const mixed: UserCouponInterface[] = [];
      coupons.forEach(coupon => {
        const couponfound = userCoupons.find(userCoupon => userCoupon.promotionid === coupon.promotionid);
        if (couponfound !== undefined) {
          mixed.push(couponfound);
        } else if (couponfound === undefined) {
          const searchList: UserCouponInterface = mixed.find(mix => mix.promotionid === coupon.promotionid) as UserCouponInterface;
          if (searchList === undefined) {
            const newCoup: UserCouponInterface = {
              activecouponimage: coupon.activecouponimage,
              code: '',
              coupons_status_id: 0,
              description: coupon.descriptionc,
              descriptionsubtitle: coupon.descriptionsubtitle,
              descriptiontitle: coupon.descriptiontitle,
              descriptiontyc: coupon.descriptiontyc,
              enddate: coupon.enddate,
              establishment: coupon.establishment,
              imageurl: coupon.imageurl,
              listviewimage: coupon.listviewimage,
              name: coupon.name,
              promotionid: coupon.promotionid,
              startdate: coupon.startdate,
              type: coupon.type,
              updatedat: null
            };
            mixed.push(newCoup);
          }
        }
      });
      mixed.sort(compareFn);
      setMixedCoupons(mixed);
    }
  };

  useEffect(() => {
    const getUserCoupons = async () => {
      if (!isGuest) {
        const userCoupons = await citiCouponsServices.getUserCoupons(user.userId as string, userState, userMunicipality);
        const { data } = userCoupons;
        setUserCoupons(data);
        return data;
      } else {
        setUserCoupons([]);
      }
    };
    getCoupons(0);
    getUserCoupons();
  }, [isFocused, userState, userMunicipality]);

  const getCouponStatus = async (couponId: string) => {
    const status = await citiCouponsServices.getCoupon(couponId);
    const { data } = status;
    return data.coupons_status_id as number;
  };
  const { registerEmptyOrder } = useOrders();
  const monitor = useOrdersMonitor();

  useEffect(() => {
    initRemoteConfig();
  }, []);

  useEffect(() => {
    if (authLoading === false) loader.hide();
  }, [authLoading]);

  useEffect(() => {
    getFavorites(email as string);
  }, []);

  useEffect(() => {
    if (dateSync) {
      const dateBefore = moment(dateSync);
      const dateNow = moment();
      const difDays = dateNow.diff(dateBefore, 'days');
      if (difDays >= 2) {
        dispatch(setDateSync(new Date()));
        dispatch(getWalletPrefixesThunk()).unwrap();
        dispatch(getBanksWalletThunk()).unwrap();
      }
    } else {
      dispatch(setDateSync(new Date()));
      dispatch(getWalletPrefixesThunk()).unwrap();
      dispatch(getBanksWalletThunk()).unwrap();
    }
  }, []);

  useEffect(() => {
    if (!!cart.items && cart.items.length && defaultAddress?.postalCode && isChargin) {
      setTimeout(() => {
        addDirection();
      }, 250);
    }
  }, [defaultAddress, cart]);

  useEffect(() => {
    if (!user.addresses?.length && isChargin) {
      setTimeout(() => {
        addDirectionDefault();
      }, 250);
    }
  }, [user, isChargin]);

  const initRemoteConfig = async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30000
    });
    await remoteConfig()
      .setDefaults({
        prod_modules_config: ''
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(() => {
        getRemoteConfig();
      });
  };

  const getRemoteConfig = async () => {
    //Code to get All parameters from Firebase Remote config
    const parameters = await remoteConfig().getAll();
    if (parameters) {
      const envConfig = envariomentState[ENV_STATE];
      if (parameters[envConfig]) {
        const parametersJSON: ModuleInterface[] = JSON.parse(parameters[envConfig]._value);
        if (parametersJSON) {
          dispatch(setAppModules({ appModules: parametersJSON }));
        }
      }
    }
    setTimeout(async () => {
      await initRemoteConfig();
    }, 300000);
  };

  const addDirectionDefault = async () => {
    const selectedAddresses: ShippingDataAddress = {
      addressType: 'residential',
      receiverName: '',
      postalCode: user.cp,
      city: '',
      state: '',
      country: 'MEX',
      street: '',
      number: '333',
      neighborhood: '',
      complement: '',
      reference: '',
      geoCoordinates: [],
      isDisposable: true
    };
    const shippingAttachment: ShippingData = {
      selectedAddresses: [selectedAddresses]
    };
    await saveShippingData(cart.orderFormId, shippingAttachment);
  };

  const addDirection = async () => {
    const selectedAddresses: ShippingDataAddress = {
      addressType: defaultAddress?.addressType ? defaultAddress?.addressType : 'residential',
      receiverName: defaultAddress?.receiverName ? defaultAddress?.receiverName : '',
      postalCode: defaultAddress?.postalCode ? defaultAddress?.postalCode : '',
      city: defaultAddress?.city ? defaultAddress?.city : '',
      state: defaultAddress?.state ? defaultAddress?.state : '',
      country: 'MEX',
      street: defaultAddress?.street ? defaultAddress?.street : '',
      number: defaultAddress?.number ? defaultAddress?.number : '333',
      neighborhood: defaultAddress?.neighborhood ? defaultAddress?.neighborhood : '',
      complement: defaultAddress?.complement ? defaultAddress?.complement : '',
      reference: defaultAddress?.reference ? defaultAddress?.reference : '',
      geoCoordinates: defaultAddress?.geoCoordinate ? defaultAddress?.geoCoordinate : [],
      addressId: defaultAddress?.id ? defaultAddress?.id : ''
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

  const onPressSearch = async () => {
    logEvent('SelectSearchBar', {
      id: user.id,
      description: 'Seleccionar barra de búsqueda'
    });
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
      await dispatch(getUserAddressesThunk(user.id));
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

  const onNavigateBanner = (carouselItem: CarouselItem) => {
    if (carouselItem.navigation_type === 'external') {
      Linking.openURL(carouselItem.link);
    } else if (carouselItem.navigation_type === 'internal') {
      if (carouselItem.products_id) {
        dispatch(setDetailSelected(carouselItem.products_id + ''));
        navigate('ProductDetail', { productIdentifier: carouselItem.products_id + '' });
      } else if (carouselItem.collections_id) {
        const titleView: string = carouselItem.promotion_title ? carouselItem.promotion_title : carouselItem.promotion_name ? carouselItem.promotion_name : '';
        navigate('CollectionsProducts', { collectionId: carouselItem.collections_id, title: titleView });
      }
    }
  };

  const onPressCarouselItem = (CarouselItem: CarouselItem) => {
    onNavigateBanner(CarouselItem);
    if (CarouselItem.promotion_type === 'second') {
      logEvent('hmPetro7Banner', {
        id: user.id,
        description: 'Abrir el link del banner de Petro-7',
        petroBannerID: CarouselItem.id
      });
    }
    if (CarouselItem.promotion_type === 'day_promotion') {
      logEvent('hmDayPromotionBanner', {
        id: user.id,
        description: 'Abrir el link de promoción del día'
      });
    }
    if (CarouselItem.promotion_type === 'all_promotions') {
      logEvent('hmAllPromotionsBanner', {
        id: user.id,
        description: 'Abrir el link de baner en la sección inferior de home en inicio',
        petroBannerID: CarouselItem.id
      });
    }
    // If is not a guest and press "Petro" or "Acumula".
    if (!isGuest && (CarouselItem.id === '1' || CarouselItem.id === '3')) {
      if (CarouselItem.id === '1') {
        logEvent('hmOpenPetro7', {
          id: user.id,
          description: 'Abrir categorias Petro-7 desde home'
        });
        inConstruction.show();
        return;
      }
      if (CarouselItem.id === '3') {
        logEvent('hmOpenAccumulate', {
          id: user.id,
          description: 'Abrir Acumuladesde el botón de home'
        });
        navigate('Coupons');
        return;
      }
      /* inConstruction.show();
      return; */
    }

    // If is a guest and press any option diferent to "Categories".
    // if (isGuest && CarouselItem.id !== '0') {
    //   enter.show();
    //   return;
    // }

    if (CarouselItem.navigateTo) {
      if (CarouselItem.id === '2') {
        logEvent('hmOpenFavorites', {
          id: user.id,
          description: 'Abrir favoritos desde home'
        });
        navigate(CarouselItem.navigateTo);
        return;
      }
      if (CarouselItem.id === '4') {
        logEvent('hmOpenWallet', {
          id: user.id,
          description: 'Abrir wallet desde home'
        });
        navigate(CarouselItem.navigateTo);
        return;
      }
      if (CarouselItem.id === '5') {
        logEvent('hmOpenOrders', {
          id: user.id,
          description: 'Abrir pedidos desde  home'
        });
        navigate(CarouselItem.navigateTo);
        return;
      }
      navigate(CarouselItem.navigateTo);
      return;
    }

    // If press "Categories"
    if (CarouselItem.id === '0') {
      logEvent('hmOpenCategories', {
        id: user.id,
        description: 'Abrir categorias Seven desde home'
      });
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
    // loader.show();
    const homeItems = await homeServices.getHomeItems();
    if (homeItems.responseCode === 603) {
      setHomeItems(homeItems.data);
    } else {
      setIsLoadBanners(false);
    }
  }, []);

  useEffect(() => {
    if (!user.seenCarousel) {
      welcomeModal.show();
    }
  }, [user]);

  /**
   * We get the full home items.
   */
  useEffect(() => {
    fetchHomeItems();
  }, []);

  useEffect(() => {
    if (homeItems) {
      setHomeOptions(HOME_OPTIONS);
      setPrincipal(homeItems.filter(item => item.promotion_type === 'principal'));
      setSecond(homeItems.filter(item => item.promotion_type === 'second'));
      setDay_promotion(homeItems.filter(item => item.promotion_type === 'day_promotion'));
      setAll_promotions(homeItems.filter(item => item.promotion_type === 'all_promotions'));
    }
  }, [homeItems]);

  useEffect(() => {
    setIsLoadBanners(false);
  }, [all_promotions]);

  const { fetchProducts, products, otherProducts } = useProducts();
  const [homeProducts, setHomeProducts] = useState<ProductInterface[] | null>();
  const [homeOtherProducts, setHomeOtherProducts] = useState<ProductInterface[] | null>();
  const { updateShoppingCartProduct, migrateCartToAnotherBranch } = useShoppingCart();

  /**
   * Get the current shoppingCart for the logged user, if it doesn't exist, create one.
   */
  const fetchData = async () => {
    if (paySuccess === true) {
      if (paySuccess === true && !isGuest) {
        toast.show({
          message: (
            <Text>
              {'¡Muchas gracias por tu compra! Para más detalles en: Cuenta -> '}
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
          type: 'limited',
          timeToShow: 10000
        });
      } else if (paySuccess && isGuest) {
        toast.show({
          message: 'Más detalles sobre el pedido en tu correo electrónico',
          type: 'limited',
          timeToShow: 10000
        });
      }

      reset({
        index: 0,
        routes: [{ name: 'Home', params: { paySuccess: false } }]
      });

      // Obtenemos el orderFormId que se acaba de pagar para enviarlo a la BD en tabla "order".
      const currentOrderFormId = store.getState().cart.cart.orderFormId;
      console.log('FINAL:', currentOrderFormId);
      const res = await registerEmptyOrder(currentOrderFormId);

      if (res) {
        console.log('RESPONSE DE REGISTER_EMPTY_ORDER EN HOME', res);
        setTimeout(() => {
          monitor.start();
        }, 5000);
      }

      // Limpiamos cart en redux despues de un checkout existoso.
      dispatch(setShoppingCartInitialState());

      // Forzamos a vtex a generarnos un nuevo orderFormId despues de haber concluido un checkout exitosamente.
      forceToCreateNewShoppingCart().then(newCart => {
        getShoppingCart(newCart.orderFormId).then(async response => {
          dispatch(updateShoppingCartItems(response));
          setIsChargin(true);
          console.log('ORDER_FORM_ID RECIEN CREADO FORZADO (2):', newCart.orderFormId);
        });
      });
    } else {
      getCurrentShoppingCartOrCreateNewOne().then(newCart => {
        console.log('ORDER_FORM_ID RECIEN CREADO EN CARGA SIMPLE DEL HOME (1):', newCart.orderFormId);
        getShoppingCart(newCart.orderFormId).then(response => {
          dispatch(updateShoppingCartItems(response));
          setIsChargin(true);
        });
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function getProductsInfo(existingProductsInCart: ExistingProductInCartInterface[], collectionId: string) {
    const arr: ProductInterface[] | null | undefined = collectionId === RECOMMENDED_PRODUCTS ? products : otherProducts;
    const homeProductsArr: ProductInterface[] | undefined = [];
    for (const product of arr) {
      const newProduct: ProductInterface = {
        ...product,
        quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.productId.toString())?.quantity : 0
      };
      homeProductsArr.push(newProduct);
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
    const productOther: ProductsByCollectionInterface = {
      collectionId: Number.parseInt(OTHER_PRODUCTS ? OTHER_PRODUCTS : '0'),
      pageSize: 7,
      pageNumber: 0,
      selectedStore: defaultSeller?.pickupPoint.address.addressId ? Number.parseInt(`500${defaultSeller?.pickupPoint.address.addressId}`) : 5005
    };
    const productRecomended: ProductsByCollectionInterface = {
      collectionId: Number.parseInt(RECOMMENDED_PRODUCTS ? RECOMMENDED_PRODUCTS : '0'),
      pageSize: 7,
      pageNumber: 0,
      selectedStore: defaultSeller?.pickupPoint.address.addressId ? Number.parseInt(`500${defaultSeller?.pickupPoint.address.addressId}`) : 5005
    };
    fetchProducts(productOther);
    fetchProducts(productRecomended);
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
    logEvent('sdSaveEditAddress', {
      id: user.id,
      description: 'Guardar una dirección de la lista de direcciones',
      addressId: address.id
    });
  };

  const onPressViewMoreCoupons = () => {
    navigate('Coupons');
  };

  const onPressCouponDetail = (item: UserCouponInterface) => {
    function verifyIfActivated(coupon: UserCouponInterface) {
      return coupon.value.promotionid === item.promotionid;
    }
    const activatedPromotion = userCoupons.find(verifyIfActivated);

    if (item.type === 'Accumulation') {
      inConstruction.show();
    } else if (activatedPromotion?.value.coupons_status_id === 1 && item.type !== 'Accumulation') {
      navigate('ActivatedCoupon', { couponInfo: item, couponActivatedData: activatedPromotion.value.code, origin: 'Home' });
    } else {
      navigate('CouponDetail', { couponInfo: item, origin: 'Home' });
    }
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
        onPressAddNewAddress={async () => {
          logEvent('hmSelectDeliveryMethodAddAddress', {
            id: user.id,
            description: 'Añadir una dirección en el método de entrega a domicilio'
          });
          onPressAddNewAddress();
        }}
        onPressShowAddressesModal={async () => {
          logEvent('hmSelectDeliveryMethodChooseAddress', {
            id: user.id,
            description: 'Seleccionar una dirección en el método de entrega a domicilio'
          });
          setAddressModalSelectionVisible(true);
        }}
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
        isLoadBanners={isLoadBanners}
        coupons={coupons}
        userCoupons={userCoupons}
        mixedCoupons={mixedCoupons}
        onPressViewMoreCoupons={onPressViewMoreCoupons}
        onPressCoupon={onPressCouponDetail}
        getCouponStat={getCouponStatus}
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
