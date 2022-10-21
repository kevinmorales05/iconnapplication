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

function RecommededForYouScreen() {
  const [productsList, setProductsList] = useState();
  const [size, setSize] = useState();
  const { updateShoppingCartProduct } = useShoppingCart();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

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
    const response = await vtexProductsServices
      .getProductsByCollectionId('147')
      .then(res => {
        console.log('Viene de pagina de recomendaciones', res);
        const { Data, Page, Size } = res;
        console.log('data', Data);
        console.log('page', Page);
        console.log('size', Size);

        setProductsList(Data);
        setSize(Size);
        console.log('this is the product list ', productsList);
      })
      .catch(error => console.log(error));
  };

const getInfoProducts = async (productsRawList:any) =>{
  const completeArray = [];
  for (const item of productsRawList) {
    const price = await vtexProductsServices.getProductPriceByProductId(productsRawList.ProductId);
    const raiting = await vtexProductsServices.getProductRatingByProductId(productsRawList.ProductId);
    if (price && raiting) {
      const newProduct = {
        productId: item.ProductId,
        name: item.ProductName,
        image: { uri: item.SkuImageUrl },
        price: price.basePrice,
        oldPrice: price.basePrice,
        porcentDiscount: 0,
        //quantity: existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === product.ProductId.toString())?.quantity : 0,
        ratingValue: raiting.average
      };
      completeArray.push(newProduct);
    }
  }
  return completeArray;
  
}

  useEffect(() => {
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
          {productsList && size ? (
            <Container width={'100%'}>
              <Container style={{ marginTop: moderateScale(15) }}>
                <CustomText text={`${size} producto${size > 1 ? 's' : ''} encontrado`} textColor={theme.fontColor.placeholder} fontSize={theme.fontSize.h6} />
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

export default RecommededForYouScreen;

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
