import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList } from 'react-native';
import theme from 'components/theme/theme';
import { CustomText, Container, SearchBar, CardProduct } from 'components';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { RootState, useAppSelector, ExistingProductInCartInterface } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { useLoading } from 'context';
import { logEvent } from 'utils/analytics';

const PromotionsScreen: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [productFromPromotion, setProductFromPromotion] = useState([]);
  const { promotions, productVsPromotion } = useAppSelector((state: RootState) => state.promotion);
  const [visible, setVisible] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>();
  const loader = useLoading();

  const hideModalForAdult = () => {
    setVisible(false);
  };

  const showModalForAdult = () => {
    setVisible(true);
  };

  const userUpdated = (productId: string) => {
    updateShoppingCartProduct!('create', productId);
    logEvent('promoAddProduct', { id: user.id, description: 'Añadir producto a la canasta', productId: productId.toString() });
    hideModalForAdult();
  };

  const validateCategoryForAddItem = (isAdult: boolean, productId: string) => {
    if (isAdult) {
      logEvent('promoAddProduct', { id: user.id, description: 'Añadir producto a la canasta', productId: productId.toString() });
      updateShoppingCartProduct!('create', productId);
    } else {
      setProductId(productId);
      showModalForAdult();
    }
  };

  const onPressBack = () => {
    navigate('SearchProducts');
  };

  const fetchData = (existingProductsInCart: ExistingProductInCartInterface[]) => {
    if (!!productVsPromotion && Object.keys(productVsPromotion).length) {
      if (productVsPromotion.has('')) {
        loader.show();
      } else {
        loader.hide();
      }
    } else {
      loader.show();
    }
    let prodList = promotions;
    let prodListWithQuantities = [];
    if (prodList.length > 0) {
      prodList.map(prod => {
        const prodObj = {
          priceWithDiscount: prod.priceWithDiscount,
          name: prod.name,
          oldPrice: prod.oldPrice,
          price: prod.price,
          productId: prod.productId,
          quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === prod.productId.toString())?.quantity : 0,
          rating: prod.rating,
          image: prod.image
        };
        prodListWithQuantities.push(prodObj);
      });

      setProductFromPromotion(prodListWithQuantities);
    }
  };

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
    const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
    fetchData(existingProducts);
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
          logEvent('promoAddProduct', { id: user.id, description: 'Sumar un producto a la canasta', productId: item.productId.toString() });
        }}
        onPressDeleteCart={() => {
          updateShoppingCartProduct!('remove', item.productId);
          logEvent('promoDeleteProduct', { id: user.id, description: 'Eliminar un producto de la canasta', productId: item.productId.toString() });
        }}
        onPressDecreaseQuantity={() => {
          updateShoppingCartProduct!('substract', item.productId);
          logEvent('promoMinusProduct', { id: user.id, description: 'Restar un producto de la canasta', productId: item.productId.toString() });
        }}
        notNeedMarginLeft
        productPromotions={new Map<string, Object>()}
        onPressAnalytics={() => logEvent('promoOpenProduct', { id: user.id, description: 'Abrir producto', productId: item.productId.toString() })}
      />
    );
  };

  return (
    <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap', backgroundColor: theme.brandColor.iconn_background }}>
      <Container style={styles.containerHeader}>
        <SearchBar isButton onPressSearch={onPressBack} onChangeTextSearch={() => {}} />
        <Container style={{ marginTop: moderateScale(10) }}></Container>
      </Container>
      <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15) }}>
        {productFromPromotion != undefined && productFromPromotion.length > 0 ? (
          <Container height={verticalScale(540)} width={'100%'}>
            <FlatList
              data={productFromPromotion}
              renderItem={_renderItem}
              refreshing={false}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingBottom: moderateScale(50)
              }}
            />
          </Container>
        ) : (
          <Container width={'100%'} height={'100%'} center>
            <Container width={'80%'} height={'40%'} center style={{ justifyContent: 'flex-end' }}>
              <SearchLoupeDeleteSvg size={moderateScale(50)} />
              <Container style={{ marginTop: moderateScale(13) }}>
                <CustomText text="Sin productos" fontWeight="900" fontSize={theme.fontSize.h4} />
              </Container>
              <Container style={{ marginTop: moderateScale(13) }}>
                <CustomText text="Por el momento no hay ningún producto en promoción" fontSize={theme.fontSize.h6} fontWeight={'500'} textAlign={'center'} />
              </Container>
            </Container>
          </Container>
        )}
      </Container>
      <AdultAgeVerificationScreen onPressClose={hideModalForAdult} visible={visible} productId={productId!} userUpdated={userUpdated} />
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
