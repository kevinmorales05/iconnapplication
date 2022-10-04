import { AddressModalScreen, Container, CustomModal, SafeArea, TextContainer, AddressModalSelection } from 'components';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'components/theme/theme';
import {
  RootState,
  useAppSelector,
  useAppDispatch,
  setAppInitialState,
  setAuthInitialState,
  setGuestInitialState,
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
import { useNavigation } from '@react-navigation/native';
import { getInvoicingProfileListThunk } from 'rtk/thunks/invoicing.thunks';
import { setInvoicingInitialState } from 'rtk/slices/invoicingSlice';
import { getUserAddressesThunk } from 'rtk/thunks/vtex-addresses.thunks';
import { useLoading } from 'context';
import { useAddresses } from './myAccount/hooks/useAddresses';
import { HOME_OPTIONS } from 'assets/files';
import { useProducts } from './hooks/useProducts';
import { useShoppingCart } from './hooks/useShoppingCart';
import { getShoppingCart, getCurrentShoppingCartOrCreateNewOne } from 'services/vtexShoppingCar.services';
import { updateShoppingCartItems, setOrderFormId } from 'rtk/slices/cartSlice';

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

const HomeController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { user: userLogged, loading: authLoading } = useAppSelector((state: RootState) => state.auth);
  const { loading: invoicingLoading, invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const { guest: guestLogged } = useAppSelector((state: RootState) => state.guest);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const { isGuest } = guestLogged;
  const { isLogged } = userLogged;
  const modVis = isLogged && !userLogged.seenCarousel ? true : false;
  const [modVisibility, setModVisibility] = useState(modVis);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();
  const [addressModalSelectionVisible, setAddressModalSelectionVisible] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [showShippingDropDown, setShowShippingDropDown] = useState(false);

  useEffect(() => {
    if (invoicingLoading === false) loader.hide();
  }, [invoicingLoading]);

  useEffect(() => {
    if (authLoading === false) loader.hide();
  }, [authLoading]);

  const logOutApp = async () => {
    dispatch(setAppInitialState());
    dispatch(setAuthInitialState());
    dispatch(setGuestInitialState());
    dispatch(setInvoicingInitialState());
  };

  const goToInvoice = () => {
    isGuest ? navigate('InviteSignUp') : navigate('Invoice');
  };

  const goToShopCart = () => {
    navigate('ShopCart');
  };

  const onPressSearch = () => {
    navigate("SearchProducts")
  }


  /**
   * Load User Addresses List and store it in the redux store
   */
  const fetchAddresses = useCallback(async () => {
    loader.show();
    await dispatch(getUserAddressesThunk(user.user_id!));
  }, []);

  /**
   * We get the user addresses just if there isn`t any address.
   * TODO: if you need reload addresses on each load of the home screen, please remove the "if" sentence.
   */
  useEffect(() => {
    if (user.addresses?.length === 0) fetchAddresses();
  }, [fetchAddresses]);

  const goToOrders = () => {
    isGuest ? navigate('InviteSignUp') : navigate('MyOrders');
  };

  /**
   * Load Invocing Profile List and store it in the redux store.
   */
  const fetchInvoicingProfileList = useCallback(async () => {
    loader.show();
    await dispatch(getInvoicingProfileListThunk(user.user_id!));
  }, []);

  /**
   * We get the invoicing profile list just if there isn`t any profile.
   */
  useEffect(() => {
    if (user.user_id && invoicingProfileList.length === 0) fetchInvoicingProfileList();
  }, [fetchInvoicingProfileList]);

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
    if(CarouselItem.navigateTo){
      navigate(CarouselItem.navigateTo);
    }
    console.log('El item seleccionado en carousel es ===> ', CarouselItem);
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
  const { updateShoppingCartProduct } = useShoppingCart();

  const fetchData = useCallback(async () => {
    const { user_id, name } = user;

    if (user_id == cart.userProfileId) {
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
        console.log('orderFormId ::: ', newCart.orderFormId);
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

  const getPriceByProductId = async (productId: string) => {
    return await dispatch(getProductPriceByProductIdThunk(productId)).unwrap();
  };

  const getRatingByProductId = async (productId: string) => {
    return await dispatch(getProductRatingByProductIdThunk(productId)).unwrap();
  };

  async function getPrices(collectionId: string) {
    const arr: ProductResponseInterface[] | null | undefined = collectionId === '137' ? products : otherProducts;
    const withPrice = await Promise.all(arr!.map(product => getPriceByProductId(product.ProductId)));
    return withPrice;
  }

  async function getRatings(collectionId: string) {
    const arr: ProductResponseInterface[] | null | undefined = collectionId === '137' ? products : otherProducts;
    const withRating = await Promise.all(arr!.map(product => getRatingByProductId(product.ProductId)));
    return withRating;
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

  const refillProductsWithPrice = (
    prices: ProductPriceResponseInterface[],
    ratings: ProductRaitingResponseInterface[],
    existingProductsInCart: ExistingProductInCartInterface[],
    collectionId: string
  ) => {
    const arr: ProductResponseInterface[] | null | undefined = collectionId === '137' ? products : otherProducts;
    const homeProductsArr: ProductInterface[] | undefined = arr?.map((p, idx) => {
      const newProduct: ProductInterface = {
        productId: p.ProductId,
        name: p.ProductName,
        image: { uri: p.SkuImageUrl },
        price: prices.find(price => price.itemId === p.ProductId.toString())?.basePrice,
        oldPrice: prices.find(price => price.itemId === p.ProductId.toString())?.basePrice,
        porcentDiscount: 0,
        quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.ProductId.toString())?.quantity : 0,
        ratingValue: ratings[idx].average
      };
      return newProduct;
    });
    if (collectionId === '137') setHomeProducts(homeProductsArr);
    if (collectionId === '138') setHomeOtherProducts(homeProductsArr);
  };

  useEffect(() => {
    if (products?.length! > 0) {
      getPrices('137').then(prices => {
        getRatings('137').then(ratings => {
          const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
          refillProductsWithPrice(prices, ratings, existingProducts, '137');
        });
      });
    }
  }, [products]);

  useEffect(() => {
    if (otherProducts?.length! > 0) {
      getPrices('138').then(prices => {
        getRatings('138').then(ratings => {
          const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
          refillProductsWithPrice(prices, ratings, existingProducts, '138');
        });
      });
    }
  }, [otherProducts]);

  /**
   * Load home products when shopping cart is modified. For example if there is a substract, remove, add, in the cart.
   */
  useEffect(() => {
    fetchProducts('137');
    fetchProducts('138');
  }, [cart, defaultSeller]);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <HomeScreen
        name={user.name}
        onPressInvoice={goToInvoice}
        onPressAddNewAddress={onPressAddNewAddress}
        onPressShowAddressesModal={() => setAddressModalSelectionVisible(true)}
        onPressShopCart={goToShopCart}
        onPressSearch={onPressSearch}
        defaultAddress={defaultAddress!}
        onPressProducts={goToOrders}
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
      />
      {/*       <CustomModal visible={modVisibility}>
        <Container center style={styles.modalBackground}>
          <Pressable style={{ alignSelf: 'flex-end' }} onPress={markAsSeenCarousel}>
            <Container circle style={styles.iconContainer}>
              <Icon name="window-close" size={20} />
            </Container>
          </Pressable>
          <Container row>
            <TextContainer text={user.name ? `¡Hola ${user.name}!` : '¡Hola!'} typography="h3" fontBold={true} textAlign="center" marginTop={4} />
          </Container>
          <Container center middle flex={1}>
            <CustomCarousel />
          </Container>

          <Container
            style={{
              backgroundColor: theme.brandColor.iconn_warm_grey,
              alignSelf: 'stretch',
              borderRadius: 16
            }}
          >
            <Pressable onPress={markAsSeenCarousel}>
              <TextContainer
                text="Omitir"
                typography="link"
                fontBold={true}
                textAlign="center"
                textColor={theme.fontColor.link}
                underline={true}
                marginTop={27}
                marginBottom={30}
              />
            </Pressable>
          </Container>
        </Container>
      </CustomModal> */}

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
        onSubmit={onSubmit}
        onPressClose={onPressCloseModalScreen}
        postalCodeError={postalCodeError}
        setPostalCodeError={setPostalCodeError}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
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
