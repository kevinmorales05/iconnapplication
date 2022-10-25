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
import { getProductDetailById, getSkuFilesById } from 'services/vtexProduct.services';
import { setProductVsPromotions, setPromotions } from 'rtk/slices/promotionsSlice';

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
  const [productsList, setProductsList] = useState([]);
  const [productPromotion, setProductPromotion] = useState<Object>();
  const [promotionsCategory, setPromotionsCategory] = useState<Object>();

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
    console.log('fetchPromotions...');
    //solo este tiene promociones con productos 34012fc8-f2d5-40ad-929e-b6c348b16791
    //let productVsPromotions = [Object];
    const { items } = cart;
    let itmMapFromCart = new Map();
    if (items != undefined) {
      items.map((item) => {
        itmMapFromCart.set(item.productId, { id: item.productId, quantity: item.quantity, seller: item.seller });
      });
    }

    let productVsPromotions = new Map();
    vtexPromotionsServices.getAllPromotions().then(promotionsResponse => {// todas las promociones
      //IB AQUI
      let productList = [];
      console.log('lllllll');
      console.log(promotionsResponse);
      console.log('lllllll');
      if (promotionsResponse) {
        const { items } = promotionsResponse;
        console.log('tams items: ' + items.length);
        if (items.length > 0) {
          items.map((item, indx) => {
            console.log('Activoooo:: ', item.isActive);
            if (item.isActive == true) {
              console.log('::::>', item.idCalculatorConfiguration);
              vtexPromotionsServices.getPromotionById(item.idCalculatorConfiguration).then(promotionResponse => {// promociones por id de categoria de promocion
                if (promotionResponse) {
                  const imgRoot = "https://oneiconn.vtexassets.com/arquivos/ids/";
                  let productImg = '';
                  if (promotionResponse.skusGift) {
                    const { gifts } = promotionResponse.skusGift;
                    console.log('(' + indx + ') item.idCalculatorConfiguration222: ' + item.idCalculatorConfiguration + ' gifts tam: ' + gifts.length);
                    console.log(item.idCalculatorConfiguration + ' longitud:   ' + gifts.length);
                    if (gifts) {let prodsPromotions = new Map();
                      if (gifts.length > 0) {
                        let products = [];
                        console.log('****************************************222');
                        gifts.map((gift, index) => {
                          console.log('indexxxxx:' + index);
                          
                          prodsPromotions.set(gift.id, { productId: gift.id, name: gift.name, quantity: gift.quantity, promotionType: promotionResponse.type, promotionName: promotionResponse.name, percentualDiscountValue: promotionResponse.percentualDiscountValue });
                          //console.log('indeyyyyy:' + index);
                          console.log('indeyyyyy:' + index);
/*
                          console.log('..........');
                          console.log({ productId: gift.id, name: gift.name, quantity: gift.quantity, promotionType: promotionResponse.type, promotionName: promotionResponse.name, percentualDiscountValue: promotionResponse.percentualDiscountValue });
                          console.log('..........');

                            productList.push({
                              rating: 10, price: 10, PriceWithDiscount: 1,
                              name: 'xxx', url: 'productImg',
                              quantity: 10, productId: '10', oldPrice: '10'
                            });*/
                          console.log('gift.id: ',gift.id);
                          getProductDetailById(gift.id)
                            .then(responseProductDetail => {
                              console.log('productDetailEndpoint222:::',gift.id);
                              console.log(JSON.stringify(responseProductDetail));
                              console.log('productDetailEndpoint222:::');
                              if (responseProductDetail) {
                                vtexProductsServices
                                  .getProductPriceByProductId(gift.id)
                                  .then(async responsePrice => {
                                    console.log('priceEndpoint222:::',gift.id);
                                    console.log(JSON.stringify(responsePrice, null, 4));
                                    console.log('priceEndpoint222:::',gift.id);
                                    if (responsePrice) {
                                      vtexProductsServices
                                      .getProductRatingByProductId(gift.id)
                                      .then(async responseRating => {
                                        if(responseRating){
                                          console.log('rating222...');
                                          console.log(JSON.stringify(responseRating,null, 4));
                                          console.log('rating222...');
                                          products.push({
                                            rating: responseRating.average, price: responsePrice.basePrice, PriceWithDiscount: 1,
                                            name: responseProductDetail.Name, url: 'productImg',
                                            quantity: ( itmMapFromCart.has(gift.id) ? itmMapFromCart.get(gift.id).quantity:0 ), productId: responseProductDetail.Id, oldPrice: '10'
                                          });
                                          console.log('despues1');
                                        }
                                      })
                                      .catch(error => console.log(error));
                                    }else{
                                      console.log('sin precios ini');
                                      products.push({
                                        rating: 0, price: 1000, PriceWithDiscount: 1,
                                        name: 'prueba', url: 'productImg',
                                        quantity: 9, productId: '9', oldPrice: '10'
                                      });
                                      console.log('sin precios fin');
                                    }
                                  })
                                  .catch(error => console.log(error));
                              }
                            })
                            .catch(error => console.log(error));
                            //productVsPromotions = prodsPromotions;
                        });
                        productList.concat(products);
                        console.log('hhhhh0001');
                        console.log(productList);
                        dispatch(setProductVsPromotions(prodsPromotions));
                        dispatch(setPromotions(productList))
                        console.log('hhhhh111');
                        console.log(prodsPromotions);
                        console.log('hhhhh22');
                        console.log(productList);
                        console.log('hhhhh33');
                        console.log('****************************************2222');

                      }
                    }
                  }
                }
                console.log('pomossss');
                console.log(productVsPromotions);
                console.log('pomossss');
              }).catch(error => console.log(error));
            }
          });
        }
      }

      console.log('kkk');
      console.log(JSON.stringify(items, null, 4));
      console.log('kkk');
    }).catch(error => console.log(error));

console.log('pomitos');
console.log(productVsPromotions);
console.log('pomitos');
    
    let categories = [];
    categories.push({ id: "0", name: 'Todo' });
    categories.push({ id: "1", name: 'Botanas' });
    categories.push({ id: "2", name: 'Dulces' });
    categories.push({ id: "3", name: 'Bebidas' });
    categories.push({ id: "4", name: 'Cervezas' });
    setPromotionsCategory(categories);
  
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
