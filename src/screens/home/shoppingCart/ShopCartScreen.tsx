import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Touchable, TextContainer } from 'components';
import { ICONN_SHOPPING_CART_BASKET, ICONN_DELETE_SHOPPING_CART_ITEM, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { Image } from 'react-native';
import { getShoppingCart, emptyShoppingCar, updateShoppingCart, clearShoppingCartMessages } from 'services/vtexShoppingCar.services';
import IconO from 'react-native-vector-icons/FontAwesome5';
import { ConnectionItem } from 'components/organisms/ConnectionItem';
import { useAlert, useLoading, useToast } from 'context';
import { updateShoppingCartItems, setDetailSelected, updateItemsLoading } from 'rtk/slices/cartSlice';

interface Props {
  routes: any;
  onPressSeeMore: () => void;
  onPressCheckout: () => void;
  messageType: messageType | undefined;
  countProducts: number;
  cartItems: number;
}

import {
  RootState,
  useAppSelector,
  useAppDispatch,
  messageType,
  getProductsListItemsThunk,
  ProductListCacheRequestInterface,
  ProductResponseInterface,
  ProductInterface
} from 'rtk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParams } from '../../../navigation/types';
import { moderateScale } from 'utils/scaleMetrics';
import { logEvent } from 'utils/analytics';
import FastImage from 'react-native-fast-image';
import { ProductAddLoading } from 'components/molecules/ProductAddLoading';

const ShopCartScreen: React.FC<Props> = ({ onPressSeeMore, onPressCheckout, routes, messageType, countProducts, cartItems }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { internetReachability } = useAppSelector((state: RootState) => state.app);
  const { loadingItems } = useAppSelector((state: RootState) => state.cart);
  const toast = useToast();
  const alert = useAlert();
  const [inter, setInter] = useState(true);

  const [productList, setProductList] = useState<any[] | undefined>([]);
  const [orderFormId, setOrderFormId] = useState('');
  const [messages, setMessages] = useState(null);
  const [withoutStockMap, setWithoutStockMap] = useState(undefined);
  const [requestList, setRequestList] = useState([]);
  const [subTotalCalculated, setSubTotalCalculated] = useState(0);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);

  const fetchData = useCallback(async () => {
    loader.show();
    await getShoppingCart(cart.orderFormId)
      .then(response => {
        const { items, messages } = response;
        let orderItems = [];
        items.map((item, index) => {
          orderItems.push({ id: item.productId, quantity: item.quantity, seller: item.seller, index: index });
        });
        setRequestList(orderItems);
        setMessages(messages);
        setOrderFormId(cart.orderFormId);
        let withoutStockM = new Map();
        if (messages.length > 0) {
          messages.map(value => {
            // TODO: relocate message type to .ENV
            if (value.code === 'withoutStock' || value.code === 'cannotBeDelivered' || value.code === 'withoutPriceFulfillment') {
              withoutStockM.set(parseInt(value.fields.itemIndex), value.text);
            }
          });
          setWithoutStockMap(withoutStockM);
        }

        let calculated = 0;
        if (items.length > 0) {
          items.map((value, index) => {
            if (withoutStockM.get(index)) {
              value.hasErrorMessage = true;
              value.errorMessage = withoutStockM.get(index);
            } else {
              let priceDefinition = value.priceDefinition !== undefined && value.priceDefinition.total !== undefined ? value.priceDefinition.total : 0;
              calculated = calculated + priceDefinition / 100;
              value.hasErrorMessage = false;
              value.errorMessage = '';
            }
          });
          setSubTotalCalculated(calculated);
        }
        if (items.length) {
          getProductsInfo(items);
        } else {
          loader.hide();
        }
        dispatch(updateShoppingCartItems(response));
      })
      .catch(() => {
        // console.log(error
        loader.hide();
      });
  }, []);

  useEffect(() => {
    if (routes.length) {
      if (routes[routes.length - 1].name === 'ShopCart') {
        fetchData();
      }
    }
  }, [routes]);

  useEffect(() => {
    if (messageType) {
      if (messages) {
        if (messages.some(mess => mess.status === 'error')) {
          if (cart.items.length === cartItems + countProducts) {
            switch (messageType) {
              case 'add':
                toast.show({
                  message: 'Se actualizó el artículo en la canasta.',
                  type: 'success'
                });
                break;
              case 'create':
                toast.show({
                  message: 'Se añadieron los productos al carrito.',
                  type: 'success'
                });
                break;
            }
          } else {
            if (cart.items.length === cartItems) {
              toast.show({
                message: 'No está disponible ningún artículo de tu pedido anterior.',
                type: 'error'
              });
            } else {
              toast.show({
                message: 'Algunos artículos no estaban disponibles en esta tienda',
                type: 'limited'
              });
            }
          }
        }
      } else {
        switch (messageType) {
          case 'add':
            toast.show({
              message: 'Se actualizó el artículo en la canasta.',
              type: 'success'
            });
            break;
          case 'create':
            toast.show({
              message: 'Se añadieron los productos al carrito.',
              type: 'success'
            });
            break;
        }
      }
    }
  }, [messageType, messages]);

  const getProducts = async (products: any[]) => {
    if (products) {
      const data: ProductListCacheRequestInterface = {
        storeId: defaultSeller?.Campo ? Number.parseInt(defaultSeller.seller.split('oneiconntienda')[1], 10) : 0,
        products: products.map(item => item.id + '')
      };
      return await dispatch(getProductsListItemsThunk(data)).unwrap();
    }
  };

  async function getProductsInfo(products: any[]) {
    const response = await getProducts(products);
    if (response.responseCode === 603 && response.data) {
      const productsArr: ProductInterface[] = response.data.map((product: ProductResponseInterface) => ({
        productId: product.ProductId,
        name: product.ProductName,
        image: product.SkuImageUrl,
        price: Number.parseFloat(product.sellingPrice),
        oldPrice: Number.parseFloat(product.sellingPrice),
        porcentDiscount: 0,
        ratingValue: product.qualificationAverage,
        promotionType: product.promotion && product.promotion.type,
        promotionName: product.promotion && product.promotion.name,
        percentualDiscountValue: product.promotion && product.promotion.percentual_discount_value,
        maximumUnitPriceDiscount: product.promotion && product.promotion.maximum_unit_price_discount,
        costDiscountPrice: product.costDiscountPrice
      }));
      const productTem: any[] = [];
      for (let product of products) {
        const item: ProductInterface | undefined = productsArr.find(item => item.productId === product.id);
        if (item) {
          productTem.push({
            ...product,
            productInfo: item
          });
        }
      }
      setProductList(productTem);
    }
    loader.hide();
  }

  const updateShoppingCartQuantityServiceCall = useCallback(async (orderFormId, request, operation, msgOperation, updatedIndex, productId) => {
    try {
      let oldQuantity = request.orderItems[updatedIndex].quantity;
      await clearShoppingCartMessages(orderFormId, request);
      await updateShoppingCart(orderFormId, request)
        .then(response => {
          const { items, messages } = response;
          setMessages(messages);

          let orderItems = [];
          items.map((item, index) => {
            orderItems.push({ id: item.productId, quantity: item.quantity, seller: item.seller, index: index });
          });
          setRequestList(orderItems);

          let withoutStockM = new Map();
          let hasAvailableMessage = false;
          if (messages) {
            const tam = messages.length;
            if (tam > 0) {
              messages.map(value => {
                // TODO: relocate message type to .ENV
                if (value.code === 'withoutStock' || value.code === 'cannotBeDelivered' || value.code === 'withoutPriceFulfillment') {
                  withoutStockM.set(parseInt(value.fields.itemIndex), value.text);
                }
                // TODO: relocate message type to .ENV
                if (value.code === 'itemQuantityNotAvailable') {
                  hasAvailableMessage = true;
                }
              });

              setWithoutStockMap(withoutStockM);
            }
          }

          if (items.length > 0) {
            let calculated = 0;
            items.map((value, index) => {
              if (withoutStockM.get(index)) {
                value.hasErrorMessage = true;
                value.errorMessage = withoutStockM.get(index);
              } else {
                let priceDefinition = value.priceDefinition !== undefined && value.priceDefinition.total !== undefined ? value.priceDefinition.total : 0;
                calculated = calculated + priceDefinition / 100;
                value.hasErrorMessage = false;
                value.errorMessage = '';
              }
            });
            setSubTotalCalculated(calculated);
            setProductList(items);
          } else {
            setProductList(undefined);
          }
          dispatch(updateShoppingCartItems(response));
          if (productId) {
            let loadingItemsTem = loadingItems ? loadingItems.concat([]) : [];
            loadingItemsTem = loadingItemsTem.filter(id => productId != id);
            setTimeout(() => dispatch(updateItemsLoading(loadingItemsTem)), 350);
          }
          if (operation === 'increase') {
            toastFunction(
              hasAvailableMessage ? 'addingProductError' : operation,
              hasAvailableMessage ? 'La compra esta limitada a ' + (oldQuantity - 1) + ' unidades de este artículo.' : msgOperation
            );
          } else {
            toastFunction(operation, msgOperation);
          }
        })
        .catch(() => {
          // console.log(error)
        });
    } catch (error) {
      // console.log(error);
    }
  }, []);

  const emptyShoppingCartItemsServiceCall = useCallback(async (orderFormId, request) => {
    await clearShoppingCartMessages(orderFormId, request);
    await emptyShoppingCar(orderFormId, request)
      .then(response => {
        const { items, messages } = response;
        setProductList(items);
        dispatch(updateShoppingCartItems(response));
        setMessages(messages);
        setRequestList(null);
        setWithoutStockMap(null);
      })
      .catch(() => {
        // console.log(error);
      });
  }, []);

  const showAlert = () => {
    alert.show(
      {
        title: 'Eliminar artículos no disponibles',
        message: 'Los artículos ya no aparecerán en tu canasta y podrás continuar con tu compra.',
        acceptTitle: 'Eliminar',
        cancelTitle: 'Cancelar',
        cancelOutline: 'iconn_light_grey',
        cancelTextColor: 'iconn_dark_grey',
        onAccept() {
          logEvent('cartEmpty', { id: user.id, description: 'Remover todos los productos de la canasta' });
          deleteUnavailableItems();
          alert.hide();
        },
        onCancel() {
          alert.hide();
        }
      },
      'deleteCart',
      false,
      true
    );
  };

  const deleteUnavailableItems = () => {
    let orderItems = [];
    withoutStockMap.forEach((value, key, map) => {
      orderItems.push({
        id: productList[key] !== undefined && productList[key].productId !== undefined ? productList[key].productId : 0,
        quantity: 0,
        seller: 1,
        index: key
      });
    });
    // una opcion podria se mandar withoutStockMap a vacio para que no tenga que eliminar
    let request = { orderItems };
    let itOld = [];
    productList.forEach(value => {
      if (!value.hasErrorMessage) {
        itOld.push(value);
      }
    });
    setProductList(itOld);
    setWithoutStockMap(undefined);
    updateShoppingCartQuantityServiceCall(orderFormId, request, 'deleteUnavailable', 'Se eliminaron los artículos no disponibles de la canasta.', 0);
  };

  useEffect(() => {
    if (internetReachability !== 0) {
      if (internetReachability === 1) setInter(true);
      if (internetReachability === 2) setInter(false);
    }
  }, [internetReachability]);

  function toastFunction(tag, msg) {
    if (tag === 'decrease' || tag === 'increase') {
      toast.show({
        message: msg,
        type: 'success'
      });
    } else if (tag === 'addingProductError') {
      toast.show({
        message: msg,
        type: 'limited'
      });
    } else if (tag === 'delete') {
      toast.show({
        message: msg,
        type: 'success'
      });
    } else if (tag === 'deleteUnavailable') {
      toast.show({
        message: msg,
        type: 'success'
      });
    } else if (tag === 'empty') {
      toast.show({
        message: msg,
        type: 'success'
      });
    }
  }

  const Counter: React.FC = ({ orderFormId, item, itemIndex }) => {
    const isLoadProduct = !!loadingItems.filter(id => id === item.productId).length;

    const addLoader = () => {
      const loadingItemsTem = loadingItems.concat([]);
      loadingItemsTem.push(item.productId);
      dispatch(updateItemsLoading(loadingItemsTem));
    };
    const decreaseItem = () => {
      try {
        let itemQuantityReceived = parseInt(item.quantity);
        itemQuantityReceived--;
        let orderItems = requestList;
        orderItems[itemIndex].quantity = itemQuantityReceived;
        addLoader();
        //loader.show();
        updateShoppingCartQuantityServiceCall(orderFormId, { orderItems }, 'decrease', 'Se actualizó el artículo en la canasta.', itemIndex, item.productId);
      } catch (error) {
        // console.log(error);
      } finally {
        //loader.hide();
      }
    };

    const increaseItem = () => {
      try {
        let itemQuantityReceived = parseInt(item.quantity);
        itemQuantityReceived++;
        const orderItems = requestList;
        orderItems[itemIndex].quantity = itemQuantityReceived;
        addLoader();
        //loader.show();
        updateShoppingCartQuantityServiceCall(orderFormId, { orderItems }, 'increase', 'Se actualizó el artículo en la canasta.', itemIndex, item.productId);
      } catch (error) {
        // console.log(error);
      } finally {
        //loader.hide();
      }
    };
    return (
      <Container
        space="between"
        crossCenter
        center
        row
        circle
        style={{
          marginRight: 14,
          borderStartWidth: 1,
          borderLeftColor: theme.brandColor.iconn_grey,
          borderEndWidth: 1,
          borderRightColor: theme.brandColor.iconn_grey,
          borderTopWidth: 1,
          borderTopColor: theme.brandColor.iconn_grey,
          borderBottomWidth: 1,
          borderBottomColor: theme.brandColor.iconn_grey,
          width: '44%',
          height: 31
        }}
      >
        {isLoadProduct ? (
          <ProductAddLoading isWhite={!!item.quantity} />
        ) : (
          <>
            <Container style={{ marginLeft: 13 }}>
              <Touchable
                onPress={() => {
                  logEvent('cartMinusProduct', { id: user.id, description: 'Quitar un producto de la canasta', productId: item.id });
                  decreaseItem();
                }}
              >
                <IconO name="minus" size={14} color={theme.brandColor.iconn_green_original} />
              </Touchable>
            </Container>
            <Container>
              <Container>
                <CustomText text="" fontSize={7} />
              </Container>
              <Container>
                <TextContainer text={item.quantity} textAlign="auto" fontSize={14} />
              </Container>
              <Container>
                <CustomText text="" fontSize={7} />
              </Container>
            </Container>
            <Container style={{ marginRight: 13 }}>
              <Touchable
                onPress={() => {
                  logEvent('cartPlusProduct', { id: user.id, description: 'Añadir productos de la canasta', productId: item.id });
                  increaseItem();
                }}
              >
                <IconO name="plus" size={14} color={theme.brandColor.iconn_green_original} />
              </Touchable>
            </Container>
          </>
        )}
      </Container>
    );
  };

  const ItemsList: React.FC<[]> = (itemss: []) => {
    const itemsReceived = Object.values(itemss);
    const itemLst = itemsReceived[0];
    let toShow = null;
    let itemsLenght;
    if (itemLst) {
      itemsLenght = itemLst.length;
      if (itemsLenght > 0) {
        toShow = itemLst;
      }
    }

    const emptyShoppingCart = () => {
      try {
        //loader.show();
        emptyShoppingCartItemsServiceCall(orderFormId, {});
        toastFunction('empty', 'Se eliminaron los artículos de la canasta.');
      } catch (error) {
        // console.log(error);
      } finally {
        //loader.hide();
      }
    };

    return (
      <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }}>
        {itemsLenght > 0 ? (
          toShow.map((value, index) => {
            return <Item key={index + value} value={value} arrayIndex={index} orderForm={orderFormId} />;
          })
        ) : (
          <></>
        )}
        <Container center style={{ marginTop: 16, backgroundColor: theme.brandColor.iconn_background, paddingHorizontal: 16 }}>
          <Container
            style={{
              width: moderateScale(340),
              justifyContent: 'center',
              paddingHorizontal: '0.5%'
            }}
          >
            <Button
              fontSize="h4"
              fontBold
              outline
              round
              color="black"
              length="long"
              style={{ borderColor: `${theme.brandColor.iconn_med_grey}`, justifyContent: 'center', paddingVertical: 1, borderRadius: 12, width: '100%' }}
              leftIcon={<Image source={ICONN_EMPTY_SHOPPING_CART} style={{ tintColor: 'red', height: 20, width: 20 }} />}
              onPress={() => {
                logEvent('cartEmpty', { id: user.id, description: 'Remover todos los productos de la canasta' });
                emptyShoppingCart();
              }}
            >
              Vaciar canasta
            </Button>
          </Container>
          <TextContainer
            textColor={theme.fontColor.placeholder}
            text="Artículos sujetos a disponibilidad en tienda. Los precios publicados pueden ser distintos a los señalizados en las tiendas. El precio de envío será calculado antes de finalizar tu compra."
            fontSize={12}
            marginTop={24}
            textAlign="justify"
            marginBottom={8}
          />
          <CustomText text="" />
        </Container>
      </Container>
    );
  };

  const Item: React.FC = ({ value, arrayIndex, orderForm }) => {
    const deleteShoppingCartItem = () => {
      const orderItems = requestList;
      orderItems[arrayIndex].quantity = 0;
      try {
        //loader.show();
        if (value.hasErrorMessage && withoutStockMap.size === 1) {
          setWithoutStockMap(undefined);
        }
        updateShoppingCartQuantityServiceCall(orderForm, { orderItems }, 'delete', 'Se eliminó el artículo de la canasta.', arrayIndex, value.id);
      } catch (error) {
        //console.log(error);
      } finally {
        //loader.hide();
      }
    };

    const imageUrl: string = value.imageUrl.replace('-55-55', '-1000-1000');
    return (
      <Container
        row
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 9,
          marginBottom: 0,
          height: 120,
          backgroundColor: theme.brandColor.iconn_white,
          borderRadius: 8,
          paddingBottom: 10
        }}
      >
        <Container style={{ paddingHorizontal: 10 }}>
          <Touchable
            onPress={() => {
              logEvent('cartOpenProduct', { id: user.id, description: 'Abrir detalle de producto', productId: value.id });
              dispatch(setDetailSelected(value.id));
              navigate('ProductDetail', { productIdentifier: value.id });
            }}
          >
            <FastImage source={{ uri: imageUrl }} style={{ marginTop: 10, width: 80, height: 88 }} />
          </Touchable>
        </Container>
        <Container space="between" style={{ marginTop: 10, width: '100%', height: 58 }}>
          <Container row space="between" style={{ marginTop: 3, paddingRight: 100 }}>
            <Container style={{ width: '70%' }}>
              <Touchable
                onPress={() => {
                  logEvent('cartOpenProduct', { id: user.id, description: 'Abrir detalle de producto', productId: value.id });
                  dispatch(setDetailSelected(value.id));
                  navigate('ProductDetail', { productIdentifier: value.id });
                }}
              >
                <Text numberOfLines={2} style={{ color: 'black' }}>
                  {value.name}
                </Text>
              </Touchable>
            </Container>
            <Container style={{ width: '38%' }}>
              {value.hasErrorMessage ? (
                <></>
              ) : (
                <TextContainer
                  text={
                    '$' +
                    ((value.priceDefinition !== undefined && value.priceDefinition.total !== undefined ? value.priceDefinition.total : 0) / 100)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }
                  fontBold
                  marginLeft={10}
                />
              )}
            </Container>
          </Container>
          <Container row style={{ marginTop: 2 }}>
            <Container>
              <Text
                style={{
                  textDecorationLine:
                    value.productInfo && value.productInfo.promotionType
                      ? value.productInfo.promotionType === 'campaign' || value.productInfo.promotionType === 'regular'
                        ? 'line-through'
                        : 'none'
                      : 'none',
                  color: theme.brandColor.iconn_grey,
                  fontSize: theme.fontSize.h6,
                  marginTop: 3
                }}
              >
                {'$' +
                  (value.price / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
                  (value.productInfo && value.productInfo.promotionType
                    ? value.productInfo.promotionType === 'campaign' || value.productInfo.promotionType === 'regular'
                      ? ''
                      : ' c/u'
                    : ' c/u')}
              </Text>
            </Container>
            {value.productInfo && value.productInfo.promotionType ? (
              value.productInfo.promotionType === 'campaign' || value.productInfo.promotionType === 'regular' ? (
                <Container style={{ marginLeft: 10 }}>
                  <TextContainer
                    numberOfLines={1}
                    text={
                      '$' +
                      Number.parseFloat(value.productInfo.costDiscountPrice)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,') +
                      ' c/u'
                    }
                    textColor="grey"
                    fontSize={12}
                    marginTop={4}
                  />
                </Container>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </Container>
          <Container row crossCenter space="between" style={{ width: '73%', marginTop: 4 }}>
            <Button
              fontSize="h6"
              color="iconn_red_original"
              size="xxsmall"
              marginRight={30}
              onPress={() => {
                logEvent('cartRemoveProduct', { id: user.id, description: 'Quitar producto de la canasta', productId: value.id });
                deleteShoppingCartItem();
              }}
              transparent
              leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} />}
            >
              Eliminar
            </Button>
            {value.hasErrorMessage ? (
              <Container
                space="around"
                alignment="start"
                style={{
                  backgroundColor: theme.brandColor.iconn_light_grey,
                  borderRadius: 15,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginRight: 18
                }}
                backgroundColor={theme.brandColor.iconn_med_grey}
              >
                <TextContainer text="No disponible" fontSize={12} textColor={theme.fontColor.paragraph} fontBold />
              </Container>
            ) : (
              <Counter orderFormId={orderFormId} item={value} itemIndex={arrayIndex} />
            )}
          </Container>
        </Container>
      </Container>
    );
  };

  const fullCart = (
    <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background }}>
      <ScrollView
        bounces={false}
        style={{ flex: 1, marginTop: 0, width: '100%' }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 1,
          backgroundColor: theme.brandColor.iconn_background
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {withoutStockMap && withoutStockMap.size && withoutStockMap.size > 0 ? (
          <Container
            space="around"
            style={{
              borderLeftColor: theme.brandColor.iconn_red_original,
              borderRightColor: theme.brandColor.iconn_red_original,
              borderBottomColor: theme.brandColor.iconn_red_original,
              borderTopColor: theme.brandColor.iconn_red_original,
              borderWidth: 1,
              marginLeft: 16,
              marginRight: 16,
              marginTop: 9,
              marginBottom: 0,
              height: 137,
              backgroundColor: theme.brandColor.iconn_white,
              borderRadius: 8,
              paddingVertical: 15
            }}
          >
            <Container
              style={{
                borderLeftColor: theme.brandColor.iconn_white,
                borderRightColor: theme.brandColor.iconn_white,
                borderBottomColor: theme.brandColor.iconn_white,
                borderTopColor: theme.brandColor.iconn_white,
                borderWidth: 1,
                alignItems: 'center'
              }}
            >
              <Container style={{ marginLeft: moderateScale(7), marginRight: moderateScale(6) }}>
                <TextContainer
                  numberOfLines={2}
                  text={'No se puede continuar con tu compra por alguno de estos motivos:'}
                  fontSize={theme.fontSize.h6}
                  marginTop={1}
                />
                <TextContainer
                  numberOfLines={2}
                  text={'● Entrega a domicilio no disponible para la dirección seleccionada.'}
                  fontSize={theme.fontSize.h6}
                  marginTop={6}
                />
                <TextContainer numberOfLines={2} text={'● Algunos artículos ya no están disponibles en la tienda.'} fontSize={theme.fontSize.h6} />
              </Container>
            </Container>
            <Container style={{ marginLeft: moderateScale(17), marginTop: moderateScale(10) }}>
              <Button
                fontSize="h6"
                color="iconn_red_original"
                size="xxsmall"
                marginRight={30}
                transparent
                onPress={showAlert}
                leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} />}
                style={{ paddingTop: 8, marginLeft: moderateScale(17) }}
              >
                Eliminar artículos no disponibles
              </Button>
            </Container>
          </Container>
        ) : (
          <></>
        )}
        <ItemsList itemss={productList} />
      </ScrollView>
    </Container>
  );

  const emptyCart = (
    <Container flex>
      <Container flex crossCenter>
        <Image source={ICONN_SHOPPING_CART_BASKET} style={{ width: 40, height: 40, alignSelf: 'center' }} />
        <CustomText text="Tu canasta está vacía" textAlign="center" fontBold />
        <Container center style={{ marginTop: 5 }}>
          <Text numberOfLines={2} style={{ color: 'black', width: 260, textAlign: 'center' }}>
            ¡Encuentra y selecciona los artículos de tu preferencia!
          </Text>
        </Container>
      </Container>
    </Container>
  );

  const emptyCartFooter = (
    <Container center style={{ paddingLeft: 0, width: '100%', height: '20%', paddingTop: 50 }}>
      <Button
        length="long"
        fontSize="h5"
        round
        fontBold
        onPress={onPressSeeMore}
        style={{ marginBottom: 5, width: 320, backgroundColor: theme.brandColor.iconn_green_original, height: 50, borderRadius: 10 }}
      >
        Ver artículos
      </Button>
    </Container>
  );

  const fullCartFooter = (
    <Container space="evenly" style={{ width: '100%', height: '25%', backgroundColor: theme.fontColor.white }}>
      <Container center style={{ paddingHorizontal: 0 }}>
        <Container row space="between" style={{ width: '90%' }}>
          <TextContainer text="Subtotal:" fontSize={14} textColor={theme.fontColor.paragraph} />
          <CustomText text={'$' + subTotalCalculated.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' MXN'} fontSize={18} fontBold />
        </Container>
        <Container row space="between" style={{ marginTop: 10, width: '90%' }}>
          <TextContainer text="Gastos de envío:" fontSize={14} textColor={theme.fontColor.paragraph} />
          <TextContainer marginBottom={10} text="Por calcular" fontSize={14} textColor={theme.fontColor.paragraph} />
        </Container>
      </Container>
      <Container center style={{ paddingHorizontal: 15 }}>
        <Button
          length="long"
          fontSize="h5"
          round
          fontBold
          disabled={!subTotalCalculated}
          onPress={() => {
            //logEvent('cartContinueToCheckout', { id: user.id, description: 'Continuar al checkout' });
            onPressCheckout();
          }}
          borderColor={subTotalCalculated ? 'iconn_green_original' : 'iconn_green_original_med'}
          style={{
            marginBottom: 8,
            width: '100%',
            backgroundColor: subTotalCalculated ? theme.brandColor.iconn_green_original : theme.brandColor.iconn_green_original_med,
            height: 50,
            borderRadius: 12
          }}
        >
          Continuar
        </Button>
      </Container>
    </Container>
  );

  const cartFooter = productList !== undefined && productList.length > 0 ? fullCartFooter : emptyCartFooter;
  const cartBody = productList !== undefined && productList.length > 0 ? fullCart : emptyCart;

  return (
    <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', padding: 0 }}>
      {inter ? (
        <>{cartBody}</>
      ) : (
        <>
          <Container flex backgroundColor={theme.brandColor.iconn_background} style={{ width: '100%' }}>
            <ConnectionItem />
          </Container>
        </>
      )}
      {cartFooter}
    </Container>
  );
};

export default ShopCartScreen;
