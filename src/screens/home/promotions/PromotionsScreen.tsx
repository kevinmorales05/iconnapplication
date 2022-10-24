import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Linking, Dimensions, FlatList } from 'react-native';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, TextContainer, SearchBar, TabAnimatable, CardProduct } from 'components';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { vtexPromotionsServices } from 'services/vtexPromotions.services';
import { moderateScale } from 'utils/scaleMetrics';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';
import { SearchLoupeDeleteSvg } from 'components/svgComponents';
import { RootState, TabItem, useAppSelector } from 'rtk';
import { getProductDetailById,getSkuFilesById } from 'services/vtexProduct.services';

interface Props {
  onPressClose: () => void;
  productsList: [];
  promotionsCategory: [];
  productPromotions: [];
}

const PromotionsScreen: React.FC<Props> = ({ onPressClose, productsList, promotionsCategory, productPromotions }) => {

  const { updateShoppingCartProduct } = useShoppingCart();
  const [itemList, setItemList] = useState([]);

  const onPressBack = () => {
   // navigate('SearchProducts');
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
//    console.log('_onRefresh');
//    setRefreshing(true);
//    productsEffect();
  };

  useEffect(() => {
    setItemList(productsList);
  }, []);

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
        productPromotions={productPromotions}
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
      { itemList!=undefined && itemList.length>0 ?
      (
      <Container height={Dimensions.get('window').height * 0.75} width={'100%'}>
                  <FlatList
                    data={itemList}
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
                </Container>):
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