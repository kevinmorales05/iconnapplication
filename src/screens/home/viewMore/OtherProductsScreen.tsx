import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { vtexProductsServices } from 'services';
import { AccordionFilter, Button, CardProduct, Container, CustomText, SafeArea, SearchBar, TabAnimatable } from 'components';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import theme from 'components/theme/theme';
import { Dimensions, StyleSheet, FlatList, View } from 'react-native';
import { moderateScale } from 'utils/scaleMetrics';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { ExistingProductInCartInterface, ProductInterface, ProductResponseInterface, RootState, useAppSelector } from 'rtk';
import Config from 'react-native-config';
import { useLoading } from 'context';

function OtherProductsScreen() {
  const [productsList, setProductsList] = useState<ProductInterface[]>();
  const [size, setSize] = useState();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const loader = useLoading();


  const onPressSearch = () => {
    navigate('SearchProducts');
  };

  //render item function
  const _renderItem = ({ item }) => {
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
  const { OTHER_PRODUCTS } = Config;
    let dataList: ProductResponseInterface[] = [];
    const response = await vtexProductsServices
      .getProductsByCollectionId(OTHER_PRODUCTS!)
      .then(res => {
        console.log('Viene de pagina de recomendaciones', res);
        const { Data, Page, Size } = res;
        console.log('data', Data);
        console.log('page', Page);
        console.log('size', Size);
        dataList = Data;
        //setProductsList(Data);
        setSize(Size);
        console.log('this is the product list from endpoint ', dataList);
      })
      return dataList;
  };

const getInfoProducts = async (existingProductsInCart: ExistingProductInCartInterface[]) =>{
  loader.show();
  const copyArray = await getCollection();
  const completeArray: ProductInterface[] = [];
  for (const item of copyArray) {
    const price = await vtexProductsServices.getProductPriceByProductId(item.ProductId);
    const raiting = await vtexProductsServices.getProductRatingByProductId(item.ProductId);
    if (price && raiting) {
      const newProduct: ProductInterface = {
        productId: item.ProductId,
        name: item.ProductName,
        image: item.SkuImageUrl,
        price: price.basePrice,
        oldPrice: price.basePrice,
        porcentDiscount: 0,
        quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === item.ProductId.toString())?.quantity : 0,
        ratingValue: raiting.average
      };
      completeArray.push(newProduct);
    }
  }
  console.log('this is the product list ', completeArray);

  setProductsList(completeArray);
  loader.hide();
  //return completeArray;
  
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
      const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
      getInfoProducts(existingProducts);
  }, [cart]);

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
                <CustomText text={`${productsList?.length} producto${productsList?.length > 1 ? 's' : ''} encontrado${productsList?.length > 1 ? 's' : ''}`} textColor={theme.fontColor.placeholder} fontSize={theme.fontSize.h6} />
              </Container>
              <Container height={Dimensions.get('window').height * 0.75} width={'100%'}>
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
}

export default OtherProductsScreen;

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
