import { AddressModalScreen, Container, CustomModal, SafeArea, TextContainer, AddressModalSelection } from 'components';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, ImageSourcePropType, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'components/theme/theme';
import {
  RootState,
  useAppSelector,
  useAppDispatch,
  Address,
  setAddressDefault,
  setSeenCarousel,
  CarouselItem,
  ProductPriceResponseInterface,
  getHomeItemsThunk,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  ProductRaitingResponseInterface,
  ProductInterface,
  ProductResponseInterface,
  ExistingProductInCartInterface
} from 'rtk';
import HomeScreen from './HomeScreen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ICONN_COFFEE } from 'assets/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getUserAddressesThunk } from 'rtk/thunks/vtex-addresses.thunks';
import { useEnterModal, useInConstruction, useLoading, useToast } from 'context';
import { useAddresses } from './myAccount/hooks/useAddresses';
import { HOME_OPTIONS } from 'assets/files';
import { useProducts } from './hooks/useProducts';
import { useShoppingCart } from './hooks/useShoppingCart';
import { getShoppingCart, getCurrentShoppingCartOrCreateNewOne } from 'services/vtexShoppingCar.services';
import { updateShoppingCartItems, setOrderFormId } from 'rtk/slices/cartSlice';
import { vtexProductsServices } from 'services';
import { useFavorites } from 'screens/auth/hooks/useFavorites';
import { vtexPromotionsServices } from 'services/vtexPromotions.services';

const CONTAINER_HEIGHT = Dimensions.get('window').height / 6 - 20;
const CONTAINER_HEIGHTMOD = Dimensions.get('window').height / 5 + 10;

interface Props {
  carouselItems?: ItemProps;
}
interface ItemProps {
  image: ImageSourcePropType;
  text: string;
}
interface State {
  activeIndex: number;
  carouselItems: ItemProps[];
}

interface PropsController {
  paySuccess: boolean;
}

class CustomCarousel extends Component<Props, State> {
  ref = React.createRef<Props>();
  state = {
    activeIndex: 0,
    carouselItems: [
      {
        image: ICONN_COFFEE,
        text: 'Activa cupones y redimelos en la tienda'
      },
      {
        image: ICONN_COFFEE,
        text: 'Activa cupones y redimelos en la tienda'
      },
      {
        image: ICONN_COFFEE,
        text: 'Activa cupones y redimelos en la tienda'
      }
    ]
  };

  renderItem = ({ item, index }: { item: ItemProps; index: number }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          height: 150
        }}
      >
        <Image source={item.image} style={{ width: 300, height: CONTAINER_HEIGHTMOD }} resizeMode="stretch" />
        <TextContainer text={item.text} typography="h5" marginTop={30} textAlign="center" />
      </View>
    );
  };

  get pagination() {
    const { carouselItems, activeIndex } = this.state;
    return (
      <Container
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          flex: 1,
          height: 10,
          marginBottom: 10
        }}
      >
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{
            backgroundColor: 'transparent',
            marginTop: 10,
            flex: 1
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: theme.brandColor.iconn_accent_secondary
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: theme.brandColor.iconn_light_grey
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </Container>
    );
  }

  render() {
    return (
      <Container
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 24
        }}
      >
        <Carousel
          layout={'default'}
          data={this.state.carouselItems}
          sliderWidth={280}
          itemWidth={280}
          renderItem={this.renderItem}
          onSnapToItem={(index: number) => this.setState({ activeIndex: index })}
        />
        {this.pagination}
      </Container>
    );
  }
}

const HomeController: React.FC<PropsController> = ({ paySuccess }) => {
  const { user, isGuest, favs } = useAppSelector((state: RootState) => state.auth);
  const { user: userLogged, loading: authLoading } = useAppSelector((state: RootState) => state.auth);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const { isLogged } = userLogged;
  const modVis = isLogged && !userLogged.seenCarousel ? true : false;
  const [modVisibility, setModVisibility] = useState(modVis);
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

  useEffect(() => {
    if (authLoading === false) loader.hide();
  }, [authLoading]);

  useEffect(() => {
    getFavorites(email as string);
  }, []);

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

  const markAsSeenCarousel = () => {
    setModVisibility(false);
    setShowShippingDropDown(true);
    dispatch(setSeenCarousel(true));
  };

  const onPressCarouselItem = (CarouselItem: CarouselItem) => {
    console.log('El item seleccionado en carousel es ===> ', CarouselItem);

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
  const [productPromotions, setProductPromotions] = useState<Object>();

  const fetchData = useCallback(async () => {
    const { userId, name } = user;

    if (userId === cart.userProfileId) {
      console.log('es igual al del usuario guardado');
      getShoppingCart(cart.orderFormId)
        .then(oldCart => {
          getShoppingCart(cart.orderFormId)
            .then(response => {
              dispatch(updateShoppingCartItems(response));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    } else {
      console.log('NO es igual');
      await getCurrentShoppingCartOrCreateNewOne().then(newCart => {
        dispatch(setOrderFormId(newCart));
        getShoppingCart(newCart.orderFormId)
          .then(response => {
            dispatch(updateShoppingCartItems(response));
          })
          .catch(error => console.log(error));
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
            {`Más detalles del pedido en: Cuenta -> `}
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

  const fetchPromotionData = useCallback(async () => {
    console.log('fetchPromotionData...');
    let productVsPromotions = new Map();
    await vtexPromotionsServices
      .getAllPromotions()
      .then(promotionsResponse => {
        if (promotionsResponse) {
          const { items } = promotionsResponse;
          console.log('tams items: ' + items.length);
          if (items.length > 0) {
            items.map(item => {
              if (item.isActive) {
                console.log('::::', item.idCalculatorConfiguration);
                vtexPromotionsServices
                  .getPromotionById(item.idCalculatorConfiguration)
                  .then(promotionResponse => {
                    /*
                if(promotionResponse){
                  if(promotionResponse.skusGift){
                    const { gifts } = promotionResponse.skusGift;
                    console.log(item.idCalculatorConfiguration+' longitud:   '+gifts.length);
                    if(gifts){
                      if(gifts.length>0){
                      gifts.map((gift) => {
                        productVsPromotions.set(gift.id,{productId: gift.id, name: gift.name, quantity: gift.quantity, promotionType: promotionResponse.type, promotionName: promotionResponse.name, percentualDiscountValue: promotionResponse.percentualDiscountValue});
                      });
                      }
                    }
                  }
                }*/
                    productVsPromotions.set('100004574', {
                      name: 'PEÑAFIEL TORONJADA LIGHT PET 600 ML',
                      percentualDiscountValue: 10,
                      productId: '100004574',
                      promotionName: '2 x 1 QA visible 1',
                      promotionType: 'regular',
                      quantity: 1
                    });
                    productVsPromotions.set('100004548', {
                      name: 'CHOCO KRISPIS BOLSA 90GR',
                      percentualDiscountValue: 20,
                      productId: '100004548',
                      promotionName: 'Más por menos',
                      promotionType: 'forThePriceOf',
                      quantity: 1
                    });
                    productVsPromotions.set('100004655', {
                      name: 'JAMAIC CON JUGO BONAFONT 1 LT)',
                      percentualDiscountValue: 3,
                      productId: '100004655',
                      promotionName: 'Recoger en tienda',
                      promotionType: 'regular',
                      quantity: 1
                    });
                    productVsPromotions.set('100005835', {
                      name: 'CANADA DRY GINGER ALE PET 1 LT',
                      percentualDiscountValue: 5,
                      productId: '100005835',
                      promotionName: 'Promo 1 QA.',
                      promotionType: 'campaign',
                      quantity: 1
                    });
                    setProductPromotions(productVsPromotions);
                  })
                  .catch(error => console.log(error));
              }
            });
          }
        }
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetchPromotionData();
  }, []);

  async function getProductsInfo(existingProductsInCart: ExistingProductInCartInterface[], collectionId: string) {
    const arr: ProductResponseInterface[] | null | undefined = collectionId === global.recommended_products ? products : otherProducts;
    const homeProductsArr: ProductInterface[] | undefined = [];
    for (const product of arr) {
      const price = await getPriceByProductId(product.ProductId);
      const raiting = await getRatingByProductId(product.ProductId);
      console.log({ priceGetProducts: price });
      if (price && raiting) {
        const newProduct: ProductInterface = {
          productId: product.ProductId,
          name: product.ProductName,
          image: { uri: product.SkuImageUrl },
          price: price.basePrice,
          oldPrice: price.basePrice,
          porcentDiscount: 0,
          quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.ProductId.toString())?.quantity : 0,
          ratingValue: raiting.average
        };
        homeProductsArr.push(newProduct);
      }
    }
    if (collectionId === global.recommended_products) setHomeProducts(homeProductsArr);
    if (collectionId === global.other_products) setHomeOtherProducts(homeProductsArr);
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
      getProductsInfo(existingProducts, global.recommended_products);
    }
  }, [products]);

  useEffect(() => {
    if (otherProducts?.length! > 0) {
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      getProductsInfo(existingProducts, global.recommended_products);
    }
  }, [otherProducts]);

  /**
   * Load home products when shopping cart is modified. For example if there is a substract, remove, add, in the cart.
   * Also load home products again if user changes the default seller.
   */
  useEffect(() => {
    fetchProducts(global.recommended_products);
    fetchProducts(global.other_products);
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
        productPromotions={productPromotions}
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

const styles = StyleSheet.create({
  modalBackground: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flex: 1,
    height: CONTAINER_HEIGHT,
    marginVertical: CONTAINER_HEIGHT,
    marginHorizontal: 40,
    borderRadius: 16,
    paddingTop: 10
  },
  iconContainer: {
    backgroundColor: theme.brandColor.iconn_warm_grey,
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 12,
    padding: 8
  }
});

export default HomeController;
