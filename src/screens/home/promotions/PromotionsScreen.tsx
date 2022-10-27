import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, FlatList } from 'react-native';
import theme from 'components/theme/theme';
import { CustomText, Container, SearchBar, TabAnimatable, CardProduct } from 'components';
import { moderateScale } from 'utils/scaleMetrics';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { RootState, TabItem, useAppSelector, useAppDispatch } from 'rtk';
import { setPromotions } from 'rtk/slices/promotionsSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';

interface Props {
  onPressClose: () => void;
}

const PromotionsScreen: React.FC<Props> = ({ onPressClose }) => {

  const { setOptions, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const [productFromPromotion, setProductFromPromotion] = useState([]);
  const { promotions } = useAppSelector((state: RootState) => state.promotion);
  const [promotionsCategory, setPromotionsCategory] = useState<Object>();
  const [itemsQuantities, setItemsQuantities] = useState(Object);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>();
  const dispatch = useAppDispatch();


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
  }

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

  const onPressBack = () => {
     navigate('SearchProducts');
  };

  const onPressTab = (cateogry: TabItem) => {
    /*    if (cateogry.id) {
          console.log('[onPressTab]', cateogry);
          setIdCategorySelected(cateogry.id);
        }*/
  };

  const loadMoreItem = async () => {
    //loadMoreProducts();
  };

  const _onRefresh = () => {
    console.log('_onRefresh');
    setRefreshing(true);
  };

  const updatePromotions = async (productId: string) => {
    let toUpdate = productFromPromotion;
    productFromPromotion.map((prod) => {
      if (prod.id == productId) {
        toUpdate.quantity = itemsQuantities.get(productId).quantity;
      }
    });
    dispatch(setPromotions(toUpdate));
  };

  const fetchData = useCallback(() => {
    const { items } = cart;
    let itmMapFromCart = new Map();
    if (items != undefined) {
      console.log('tam items...', items.length);
      items.map((item) => {
        itmMapFromCart.set(item.productId, { id: item.productId, quantity: item.quantity, seller: item.seller });
      });
    }
    setItemsQuantities(itmMapFromCart);

    

    console.log('promotionsssss...', promotions.length);
    let prodList = promotions;
    let prodListWithQuantities = [];
    if (prodList.length > 0) {
      prodList.map((prod) => {
        const prodObj = {
          priceWithDiscount: prod.priceWithDiscount, name: prod.name, oldPrice: prod.oldPrice, price: prod.price,
          productId: prod.productId, quantity: (itmMapFromCart.has(prod.productId) ? itmMapFromCart.get(prod.productId).quantity : 0),
          rating: prod.rating, image: prod.image
        }
        prodListWithQuantities.push(prodObj);
      });

      setProductFromPromotion(prodListWithQuantities);
    }

    let categories = [];
    categories.push({ id: "0", name: 'Todo' });
    categories.push({ id: "1", name: 'Botanas' });
    categories.push({ id: "2", name: 'Dulces' });
    categories.push({ id: "3", name: 'Bebidas' });
    categories.push({ id: "4", name: 'Cervezas' });
    setPromotionsCategory(categories);
  }, [productFromPromotion]);



  useEffect(() => {
    fetchData();
  }, [cart, promotions]);

  const _renderItem = ({ item }) => {
    return (
      <CardProduct
        key={item.productId}
        ratingValue={item.ratingValue}
        price={item.price}
        porcentDiscount={item.porcentDiscount}
        name={item.name}
        image={{ uri: item.image }}
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
        notNeedMarginLeft
        productPromotions={new Map<string,Object>}
      />
    );
  };

  return (
    <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap' }}>
      <Container style={styles.containerHeader}>
        <SearchBar isButton onPressSearch={onPressBack} onChangeTextSearch={() => { }} />
        <Container style={{ marginTop: moderateScale(10) }}>
          <TabAnimatable items={promotionsCategory} onPressItem={onPressTab} />
        </Container>
      </Container>
      <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15) }}>
        {productFromPromotion != undefined && productFromPromotion.length > 0 ?
          (
            <Container height={Dimensions.get('window').height * 0.75} width={'100%'}>
              <FlatList
                data={productFromPromotion}
                renderItem={_renderItem}
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreItem}
                refreshing={false}
                onRefresh={() => _onRefresh()}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  paddingBottom: moderateScale(50)
                }}
              />
            </Container>) :
          (
            <Container width={'100%'} height={'100%'} center>
              <Container width={'80%'} height={'40%'} center style={{ justifyContent: 'flex-end' }}>
                <SearchLoupeDeleteSvg size={moderateScale(50)} />
                <Container style={{ marginTop: moderateScale(13) }}>
                  <CustomText text="Sin productos" fontWeight="900" fontSize={theme.fontSize.h4} />
                </Container>
                <Container style={{ marginTop: moderateScale(13) }}>
                  <CustomText
                    text="Por el momento no hay ningún producto en promoción"
                    fontSize={theme.fontSize.h6}
                    fontWeight={'500'}
                    textAlign={'center'}
                  />
                </Container>
              </Container>
            </Container>
          )
        }
      </Container>
      <AdultAgeVerificationScreen onPressClose={hideModalForAdult} visible={visible} productId={productId!} userUpdated={userUpdated}/>
    </Container>

  );
};

export default PromotionsScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(7),
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