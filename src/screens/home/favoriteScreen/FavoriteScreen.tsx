import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, FlatList, View } from 'react-native';
import {
  ExistingProductInCartInterface,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  getProductsByCategoryAndFiltersItemsThunk,
  ProductInterface,
  ProductPriceResponseInterface,
  ProductRaitingResponseInterface,
  RootState,
  TabItem,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { AccordionFilter, Button, CardProduct, Container, CustomText, SafeArea, SearchBar, TabAnimatable } from 'components';
import { DrawerLayout } from 'react-native-gesture-handler';
import theme from 'components/theme/theme';
import { ProductsByCategoryFilter } from 'rtk/types/category.types';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { moderateScale } from 'utils/scaleMetrics';

const productsRender: ProductInterface[] = [
  {
    ratingValue: 0,
    price: 10,
    name: 'Test',
    image: { uri: '' },
    quantity: 0,
    productId: '1',
    porcentDiscount: 20,
    isFavorite: false
  }
];

const FavoriteScreen: React.FC = () => {
  const { setOptions, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'CategoryProducts'>>();

  const dispatch = useAppDispatch();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const _renderItem = ({ item }) => {
    return (
      <CardProduct
        key={item.productId}
        ratingValue={item.ratingValue}
        price={item.price}
        porcentDiscount={item.porcentDiscount}
        name={item.name}
        image={item.image}
        quantity={item.quantity}
        productId={item.productId}
        oldPrice={item.oldPrice}
        isFavorite={item.isFavorite}
        onPressAddCart={() => {
          updateShoppingCartProduct!('create', item.productId);
        }}
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
      />
    );
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap' }}>
        <Container style={styles.containerHeader}>
          <SearchBar isButton onPressSearch={() => {}} onChangeTextSearch={() => {}} />
        </Container>
        <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15) }}>
          {productsRender.length ? (
            <Container width={'100%'}>
              <Container style={{ marginTop: moderateScale(15) }}>
                <CustomText
                  text={`${productsRender.length} producto${productsRender.length > 1 ? 's' : ''} encontrado`}
                  textColor={theme.fontColor.placeholder}
                  fontSize={theme.fontSize.h6}
                />
              </Container>
              <Container height={Dimensions.get('window').height * 0.75} width={'100%'}>
                <FlatList
                  data={productsRender}
                  renderItem={_renderItem}
                  onEndReachedThreshold={0.2}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingBottom: moderateScale(50)
                  }}
                />
              </Container>
            </Container>
          ) : (
            <Container width={'100%'} height={'100%'} center>
              <Container width={'80%'} height={'40%'} center style={{ justifyContent: 'flex-end' }}>
                <SearchLoupeDeleteSvg size={moderateScale(50)} />
                <Container style={{ marginTop: moderateScale(13) }}>
                  <CustomText text="No hay coincidencias" fontWeight="900" fontSize={theme.fontSize.h4} />
                </Container>
                <Container style={{ marginTop: moderateScale(13) }}>
                  <CustomText
                    text="No se encontraron productos que coincidan con los filtros seleccionados."
                    fontSize={theme.fontSize.h6}
                    fontWeight={'500'}
                    textAlign={'center'}
                  />
                </Container>
              </Container>
              <Container style={{ marginTop: moderateScale(200) }}>
                <Button
                  style={{ width: moderateScale(328) }}
                  size="small"
                  borderColor="iconn_green_original"
                  fontSize="h3"
                  fontBold
                  color="iconn_green_original"
                  round
                  onPress={() => {}}
                  length="short"
                >
                  {'Limpiar'}
                </Button>
              </Container>
            </Container>
          )}
        </Container>
      </Container>
    </SafeArea>
  );
};

export default FavoriteScreen;

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
