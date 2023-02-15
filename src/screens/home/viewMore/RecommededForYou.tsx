import React, { useEffect, useState } from 'react';
import { CardProduct, Container, CustomText, SafeArea, SearchBar } from 'components';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import theme from 'components/theme/theme';
import { StyleSheet, FlatList } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { ExistingProductInCartInterface, ProductInterface, ProductsByCollectionInterface, RootState, useAppSelector } from 'rtk';
import Config from 'react-native-config';
import { useLoading } from 'context';
import { useProducts } from '../hooks/useProducts';

function RecommededForYouScreen() {
  const [productsList, setProductsList] = useState<ProductInterface[]>();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const loader = useLoading();

  const { fetchProducts, products } = useProducts();

  const onPressSearch = () => {
    navigate('SearchProducts');
  };

  //render item function
  const _renderItem = ({ item }: { item: ProductInterface }) => {
    return (
      <CardProduct
        key={item.productId}
        ratingValue={item.ratingValue}
        price={item.price}
        porcentDiscount={item.porcentDiscount === 0 ? null : item.porcentDiscount}
        name={item.name}
        image={{ uri: item.image }}
        quantity={item.quantity}
        productId={item.productId}
        oldPrice={item.oldPrice}
        promotionType={item.promotionType}
        percentualDiscountValue={item.percentualDiscountValue}
        promotionName={item.promotionName}
        costDiscountPrice={item.costDiscountPrice}
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
        onPressOut={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  };

  //Function to get collection of products
  const getCollection = async () => {
    const { RECOMMENDED_PRODUCTS } = Config;
    const productOther: ProductsByCollectionInterface = {
      collectionId: Number.parseInt(RECOMMENDED_PRODUCTS ? RECOMMENDED_PRODUCTS : '0'),
      pageSize: 10,
      pageNumber: 0,
      selectedStore: defaultSeller?.Campo ? defaultSeller.seller.split('oneiconntienda')[1] : undefined
    };
    fetchProducts(productOther);
  };

  const getInfoProducts = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    loader.show();
    const completeArray: ProductInterface[] = [];
    if (products) {
      for (const item of products) {
        const newProduct: ProductInterface = {
          ...item,
          image: item.image.uri,
          quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === item.productId.toString())?.quantity : 0
        };
        completeArray.push(newProduct);
      }
    }
    setProductsList(completeArray);
    loader.hide();
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
    getInfoProducts(existingProducts);
  }, [cart, products]);

  useEffect(() => {
    loader.show();
    getCollection();
  }, []);

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
          <SearchBar isButton onPressSearch={onPressSearch} onChangeTextSearch={() => {}} />
        </Container>
        <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15) }}>
          {productsList?.length ? (
            <Container width={'100%'}>
              <Container style={{ marginTop: moderateScale(15) }}>
                <CustomText
                  text={`${productsList?.length} producto${productsList?.length > 1 ? 's' : ''} encontrado${productsList?.length > 1 ? 's' : ''}`}
                  textColor={theme.fontColor.placeholder}
                  fontSize={theme.fontSize.h6}
                />
              </Container>
              <Container height={verticalScale(540)} width={'100%'}>
                <FlatList
                  data={productsList}
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
              {/* <Container style={{ marginTop: moderateScale(200) }}>
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
              </Container> */}
            </Container>
          )}
        </Container>
      </Container>
    </SafeArea>
  );
}

export default RecommededForYouScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(7),
    backgroundColor: theme.brandColor.iconn_white
  }
});
