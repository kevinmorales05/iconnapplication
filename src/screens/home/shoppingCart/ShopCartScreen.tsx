import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Section, SafeArea, Touchable, TextContainer } from 'components';
import {
  ICONN_SHOPPING_CART_BASKET,
  ICONN_DELETE_SHOPPING_CART_ITEM,
  ICONN_EMPTY_SHOPPING_CART
} from 'assets/images';
import { Image, StyleProp, ViewStyle } from 'react-native';
import { object, text } from '@storybook/addon-knobs';
import { getShoppingCart, emptyShoppingCar, updateShoppingCart, clearShoppingCartMessages } from 'services/vtexShoppingCar.services';
import items from 'assets/files/sellers.json';
import Icon from 'react-native-vector-icons/AntDesign';
import IconO from 'react-native-vector-icons/FontAwesome5'
import { ConnectionItem } from 'components/organisms/ConnectionItem';
import { useAlert, useLoading, useToast } from 'context';


interface Props {
  onPressInvoice: () => void;
  onPressMyAccount: () => void;
  onPressLogOut: () => void;
  orderFormIdReceived: () => string;
}


import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, InvoicingProfileInterface } from 'rtk';
import { registerWithFirebaseThunk } from '../../../rtk/thunks/auth.thunks';
import { WidthType } from '../../../components/types/width-type';

const ShopCartScreen: React.FC<Props> = ({ onPressMyAccount, onPressInvoice, onPressLogOut, orderFormIdReceived }) => {
  const insets = useSafeAreaInsets();
  const loader = useLoading();
  const { loading } = useAppSelector((state: RootState) => state.invoicing);
  const { cart: dataFromCart } = useAppSelector((state: RootState) => state.cart);
  const { internetReachability } = useAppSelector((state: RootState) => state.app);
  const toast = useToast();
  const alert = useAlert();
  const [inter, setInter] = useState(true);

  const [productList, setProductList] = useState([]);
  const [orderFormId, setOrderFormId] = useState('');
  const [totalizers, setTotalizers] = useState(undefined);
  const [messages, setMessages] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [withoutStockMap, setWithoutStockMap] = useState(undefined);
  const [requestList, setRequestList] = useState([]);

  const fetchData = useCallback(async () => {
    console.log('fetchData...');
    const data = await getShoppingCart('655c3cc734e34ac3a14749e39a82e8b9');
    const { items, messages, totalizers } = data;
    let orderItems = [];
    items.map((item, index) => {
      orderItems.push({ id: item.productId, quantity: item.quantity, seller: item.seller, index: index });
    })
    setRequestList(orderItems);
    setMessages(messages);
    setTotalizers(totalizers[0]);
    setOrderFormId(orderFormIdReceived);
    let withoutStockM = new Map();
    if (messages.length > 0) {
      messages.map((value) => {
        if (value.code=='withoutStock' || value.code=='cannotBeDelivered') {
          withoutStockM.set(parseInt(value.fields.itemIndex), value.text);
        }
      })
      setWithoutStockMap(withoutStockM);
    }

    if (items.length > 0) {
      items.map((value,index) => {
        if(withoutStockM.get(index)){
          value.hasErrorMessage = true;
          value.errorMessage = withoutStockM.get(index);
        }else {
          value.hasErrorMessage = false;
          value.errorMessage = '';
        }
      })
      setProductList(items);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const updateShoppingCartQuantityServiceCall = useCallback(async (orderFormId, request, operation ,msgOperation, updatedIndex) => {
    console.log(orderFormId + ' -request ' + request.orderItems);
    let data = undefined;
    try {
      let oldQuantity = request.orderItems[updatedIndex].quantity;
      await clearShoppingCartMessages(orderFormId, request);
      data = await updateShoppingCart(orderFormId, request);    
    const { items, messages, totalizers } = data;

    setMessages(messages);
    setTotalizers(totalizers[0]);

    let orderItems = [];
    items.map((item, index) => {
      orderItems.push({ id: item.productId, quantity: item.quantity, seller: item.seller, index: index });
    })
    setRequestList(orderItems);

    let withoutStockM = new Map();
    let hasAvailableMessage = false;
    if (messages) {
      const tam = messages.length;
      console.log('tamaño mensajes: ', tam);
      if (tam > 0) {
          messages.map((value) => {
            if (value.code=='withoutStock' || value.code=='cannotBeDelivered') {
              withoutStockM.set(parseInt(value.fields.itemIndex), value.text);
            }
            if(value.code=='itemQuantityNotAvailable'){
              hasAvailableMessage = true;
            }
          })
          setWithoutStockMap(withoutStockM);
      }
    }

    let isError = false;
    if (items.length > 0) {
      items.map((value,index) => {
        if(withoutStockM.get(index)){
          value.hasErrorMessage = true;
          value.errorMessage = withoutStockM.get(index);
        }else {
          value.hasErrorMessage = false;
          value.errorMessage = '';
        }
      })

      if(items[updatedIndex]){
        isError = true;
      }
      setProductList(items);
    }else {
      setProductList(undefined);
    }

    console.log('****************operation:'+operation);
    if(operation == "increase"){
      toastFunction(hasAvailableMessage ? "addingProductError" : operation, hasAvailableMessage ? 'La compra esta limitada a '+(oldQuantity-1)+' unidades de este artículo.' : msgOperation);
    } else {
      toastFunction(operation, msgOperation);
    }

  } catch (error) {
      console.log(error);
  }

  }, []);

  const emptyShoppingCartItemsServiceCall = useCallback(async (orderFormId, request) => {
    await clearShoppingCartMessages(orderFormId, request);
    const data = await emptyShoppingCar(orderFormId, request);
    const { items, messages, totalizers } = data;
    setProductList(items);
    setMessages(messages);
    setTotalizers(totalizers[0]);
    setRequestList(null);
    setWithoutStockMap(null);
  }, []);

  const showAlert = () => {
    alert.show(
      {
        title: 'Eliminar articulos no disponibles',
        message: 'Los articulos ya no apareceran en tu canasta y podras continuar con tu compra',
        acceptTitle: 'Eliminar',
        acceptOutline: 'iconn_error',
        cancelTitle: 'Cancelar',
        cancelOutline: 'iconn_light_grey',
        cancelTextColor: 'iconn_dark_grey',
        onAccept() {
          deleteUnavailableItems();
          alert.hide();
        },
        onCancel() {
          alert.hide('cancelar');
        }
      },
      'error'
    )
  }

  const deleteUnavailableItems = () => {
    let orderItems = [];
    withoutStockMap.forEach((value, key, map) => {
      orderItems.push({ id: (productList[key]!=undefined && productList[key].productId!=undefined?productList[key].productId:0), quantity: 0, seller: 1, index: key });
    });
    // una opcion podria se mandar withoutStockMap a vacio para que no tenga que eliminar
    let request = { orderItems };
    let itOld = [];
    productList.map((value,index) => {
      if(!value.hasErrorMessage){
        itOld.push(value);
      }
    })
    setProductList(itOld);
    setWithoutStockMap(undefined);
    updateShoppingCartQuantityServiceCall(orderFormId, request,"deleteUnavailable",'Se eliminaron los articulos no disponibles de la canasta.',0);
  };

    useEffect(() => {
      if (internetReachability !== 0) {
        if (internetReachability === 1) setInter(true);
        if (internetReachability === 2) setInter(false);
      }
    }, [internetReachability]);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  function toastFunction(tag, msg) {
    if (tag === "decrease" || tag === "increase") {
      toast.show({
        message: msg,
        type: 'success'
      });
    } else if (tag === "addingProductError") {
      toast.show({
        message: msg,
        type: 'success'
      });
    } else if (tag === "delete") {
      toast.show({
        message: msg,
        type: 'success'
      });
    } else if (tag === "deleteUnavailable") {
      toast.show({
        message: msg,
        type: 'success'
      });
    } else if (tag == "empty") {
      toast.show({
        message: msg,
        type: 'success'
      });
    }
  }

  const Counter: React.RF = ({ orderFormId, item, itemIndex }) => {
    const decreaseItem = () => {
      console.log('***decrease item***');
      item.quantity--;
      const orderItems = requestList;
      orderItems[itemIndex].quantity = item.quantity;
      try {
        //loader.show();
        setLoadingStatus(true);
        updateShoppingCartQuantityServiceCall(orderFormId, { orderItems },"decrease",'Se actualizó el artículo en la canasta.',itemIndex);
        //setLoadingStatus(false);
      } catch (error) {
        console.log(error);
      } finally {
        //loader.hide();
      }
    };

    const increaseItem = () => {
      console.log('***increase item***');
      item.quantity++;

      const orderItems = requestList;
      orderItems[itemIndex].quantity = item.quantity;

      try {
        //loader.show();
        setLoadingStatus(true);
        updateShoppingCartQuantityServiceCall(orderFormId, {orderItems} ,"increase","Se actualizó el artículo en la canasta.",itemIndex);
        //setLoadingStatus(false);
      } catch (error) {
        console.log(error);
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
          borderStartWidth: 1,
          borderLeftColor: theme.brandColor.iconn_grey,
          borderEndWidth: 1,
          borderRightColor: theme.brandColor.iconn_grey,
          borderTopWidth: 1,
          borderTopColor: theme.brandColor.iconn_grey,
          borderBottomWidth: 1,
          borderBottomColor: theme.brandColor.iconn_grey,
          width: 130,
          height: 37
        }}
      >
        <Container style={{ marginLeft: 13 }}>
          <Touchable onPress={decreaseItem}>
            <IconO name="minus" size={14} color={theme.brandColor.iconn_green_original} />
          </Touchable>
        </Container>
        <Container>
          <Container>
            <CustomText text="" fontSize={7}></CustomText>
          </Container>
          <Container>
            <TextContainer text={item.quantity} textAlign='auto' fontSize={14}></TextContainer>
          </Container>
          <Container>
            <CustomText text="" fontSize={7}></CustomText>
          </Container>
        </Container>
        <Container style={{ marginRight: 13 }}>
          <Touchable onPress={increaseItem}>
            <IconO name="plus" size={14} color={theme.brandColor.iconn_green_original} />
          </Touchable>
        </Container>
      </Container>
    );
  };

  const ItemsList: React.FC<[]> = (itemss: []) => {
    console.log('items en itemslist:::',orderFormId);
    console.log(Object.values(itemss).length);
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
      console.log('***empty ShoppingCart***');
      try {
        //loader.show();
        setLoadingStatus(true);
        emptyShoppingCartItemsServiceCall(orderFormId, {});
        toastFunction("empty", "Se eliminaron los artículos de la canasta.");
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStatus(false);
        //loader.hide();
      }
    };

    return (
      <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }}>
        {
          itemsLenght > 0 ?
            toShow.map((value, index) => {
              return (
                <Item key={index + value} value={value} arrayIndex={index} orderForm={orderFormId} />
              )
            }
            ) : <></>
        }
        <Container center style={{ backgroundColor: theme.brandColor.iconn_background, paddingHorizontal: 16 }}>
          <TextContainer
            textColor={theme.brandColor.iconn_grey}
            text="Artículos sujetos a disponibilidad en tienda. Los precios publicados pueden ser distintos a los señalizados en las tiendas."
            fontSize={12}
            marginTop={24}
            textAlign="justify"
            marginBottom={8}
          ></TextContainer>
          <Container
            style={{
              borderStartWidth: 0,
              borderLeftColor: theme.brandColor.iconn_med_grey,
              borderEndWidth: 0,
              borderRightColor: theme.brandColor.iconn_med_grey,
              borderTopWidth: 1,
              borderTopColor: theme.brandColor.iconn_med_grey,
              borderBottomWidth: 1,
              borderBottomColor: theme.brandColor.iconn_med_grey,
              width: 350,
              height: 50
            }}
          >
            <Button
              transparent
              fontSize="h5"
              length="long"
              leftIcon={<Image source={ICONN_EMPTY_SHOPPING_CART} />}
              color="iconn_grey"
              onPress={emptyShoppingCart}
            >
              Vaciar canasta
            </Button>
          </Container>
          <CustomText text=""></CustomText>
        </Container>
      </Container>
    );
  };

  const Item: React.FC = ({ value, arrayIndex, orderForm }) => {
    const deleteShoppingCartItem = () => {
      console.log('***delete item: '+ value.id+' arrayIndex: '+arrayIndex);
      const orderItems = requestList;
      orderItems[arrayIndex].quantity = 0;
      try {
        //loader.show();
        setLoadingStatus(true);
        //setProductList(productList.splice(arrayIndex, 1));
        updateShoppingCartQuantityServiceCall(orderForm, {orderItems} ,"delete", "Se eliminó el artículo de la canasta.",arrayIndex);
        //setLoadingStatus(false);
      } catch (error) {
        console.log(error);
      } finally {
        //loader.hide(); 
      }
    };

    return (
      <Container
        row
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 9,
          marginBottom: 0,
          height: 110,
          backgroundColor: theme.brandColor.iconn_white,
          borderRadius: 8,
          paddingBottom: 10
        }}
      >
        <Container>
          <Image source={{ uri: value.imageUrl }} style={{ marginTop: 10, width: 90, height: 88 }} />
        </Container>
        <Container>
          <Container style={{ marginTop: 10, width: 90, height: 55 }}>
            <Container row crossCenter space="between">
              <Text numberOfLines={2} style={{ width: 175, color: 'black' }}>
                {value.name}
              </Text>
              <TextContainer text={'$' + (value.priceDefinition.total / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} fontBold marginLeft={10}></TextContainer>
            </Container>
            <Container>
              <TextContainer numberOfLines={1} text={'$' + (value.price / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' c/u'} textColor="grey" fontSize={12} marginTop={4}></TextContainer>
            </Container>
          </Container>
          <Container row space="around" style={{ marginTop: 4 }}>
            <Button
              fontSize="h6"
              color="iconn_red_original"
              size="xxsmall"
              marginRight={30}
              onPress={deleteShoppingCartItem}
              transparent
              leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} />}
            >
              Eliminar
            </Button>
            {
              value.hasErrorMessage ?
                <Container alignment='end'  style={{ marginLeft:45,
                  backgroundColor: theme.brandColor.iconn_light_grey,
                  borderRadius: 10,
                  paddingBottom: 10,
                  height:23,
                  width:78
                }} backgroundColor={theme.brandColor.iconn_med_grey}>
                  <TextContainer text="No disponible" fontSize={12} textColor={theme.fontColor.paragraph} fontBold ></TextContainer>
                </Container>
                :
                <Counter orderFormId={orderFormId} item={value} itemIndex={arrayIndex} />
            }
          </Container>
        </Container>
      </Container>
    );
  };

  const fullCart = (<Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background }}>
    <ScrollView bounces={false}
      style={{ flex: 1, marginTop: 0, width: '100%' }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 1,
        backgroundColor: theme.brandColor.iconn_background
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {
        withoutStockMap!=undefined && withoutStockMap.size>0?
          <Container space='between' 
          style={{
            borderLeftColor: theme.brandColor.iconn_red_original,
            borderRightColor: theme.brandColor.iconn_red_original,
            borderBottomColor: theme.brandColor.iconn_red_original,
            borderTopColor: theme.brandColor.iconn_red_original,
            borderWidth:1,
            marginLeft: 16,
            marginRight: 16,
            marginTop: 9,
            marginBottom: 0,
            height: 110,
            backgroundColor: theme.brandColor.iconn_white,
            borderRadius: 8,
            paddingBottom: 10
          }}>
            <CustomText fontSize={13} alignSelf='center' text="Algunos artículos ya no están disponibles en tienda y deben ser eliminados de tu canasta para poder continuar con tu compra." textAlign="justify"></CustomText>
            <Button
              fontSize="h6"
              color="iconn_red_original"
              size="xxsmall"
              marginRight={30}
              transparent
              onPress={showAlert}
              leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} />}
            >
              Eliminar artículos no disponibles
            </Button>
          </Container> :
          <></>
      }      
      <ItemsList itemss={productList} />
    </ScrollView>
  </Container>
  );

  const emptyCart = (
    <Container flex >
      <Container flex crossCenter>
        <Image source={ICONN_SHOPPING_CART_BASKET} style={{ width: 40, height: 40, alignSelf: 'center' }} />
        <CustomText text="Tu canasta está vacía" textAlign="center" fontBold></CustomText>
        <CustomText text="!Encuentra y selecciona los articulos de tu preferencia!" textAlign="center"></CustomText>
      </Container>
    </Container>
  );

  const emptyCartFooter = (
    <Container style={{ marginBottom: 24, width: '100%' }}>
      <Button length="long" round fontSize="h3" fontBold onPress={onPressMyAccount} style={{ backgroundColor: theme.brandColor.iconn_green_original }}>
        Ver artículos
      </Button>
    </Container>
  );

  const fullCartFooter = (
    <Container space='evenly' style={{ paddingLeft: 10, width: '100%', height: '20%', backgroundColor: theme.fontColor.white }}>
      <Container row space="between" style={{ marginTop: 8 }} >
        <TextContainer text="Subtotal:" fontSize={14} textColor={theme.fontColor.paragraph} ></TextContainer>
        <CustomText text={"$" + (totalizers != undefined ? (totalizers.value / 100) : 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' MXN'} fontSize={18} fontBold></CustomText>
      </Container>
      <Container>
        <Button length="long" fontSize="h5" round fontBold onPress={onPressMyAccount} style={{ marginTop: 5, marginBottom: 5, width: 320, backgroundColor: theme.brandColor.iconn_green_original, height: 50 }}>
          Continuar
        </Button>
      </Container>
    </Container>
  );

  const cartFooter = productList!=undefined && productList.length > 0 ? fullCartFooter : emptyCartFooter;
  const cart = productList!=undefined && productList.length > 0 ? fullCart : emptyCart;

  return (
    <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', padding: 0 }}>
      {inter ? (
        <>
          {cart}
        </>
      ) : (
        <>
          <Container flex backgroundColor={theme.brandColor.iconn_background} style={{ width: '100%' }}>
            <ConnectionItem></ConnectionItem>
          </Container>
        </>
      )}
      {cartFooter}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingLeft: 10, paddingRight: 10 },
  footer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center'
  }
});

export default ShopCartScreen;
