import React, { useState, useEffect, useCallback } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import PromotionsScreen from './PromotionsScreen';
import { vtexPromotionsServices } from 'services/vtexPromotions.services';
import { getProductDetailById, getSkuFilesById } from 'services/vtexProduct.services';
import PriceWithDiscount from '../../../components/molecules/PriceWithDiscount/PriceWithDiscount';
import { RootState, useAppSelector } from 'rtk';
import { useShoppingCart } from 'screens/home/hooks/useShoppingCart';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';
import { vtexProductsServices } from 'services';

const PromotionsController: React.FC = () => {
  const [productFromPromotion, setProductFromPromotion] = useState<Object>();
  const [productPromotions, setProductPromotions] = useState<Object>();
  const [promotionsCategory, setPromotionsCategory] = useState<Object>();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { promotions, productVsPromotion } = useAppSelector((state: RootState) => state.promotion);

  const [productsList, setProductsList] = useState([]);
  const { updateShoppingCartProduct } = useShoppingCart();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  

  /*
  const onPressBack = () => {
    navigate('SearchProducts');
  };*/

  const fetchData = useCallback(() => {
    console.log('fetchData...');
    //solo este tiene promociones con productos 34012fc8-f2d5-40ad-929e-b6c348b16791
    //let productVsPromotions = [Object];
    const { items } = cart;
    let itmMapFromCart = new Map();
    items.map((item) => {
      itmMapFromCart.set(item.productId, { id: item.productId, quantity: item.quantity, seller: item.seller });
    });

    let productVsPromotions = new Map();
    let productList = [];
    vtexPromotionsServices.getAllPromotions().then(promotionsResponse => {// todas las promociones
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
                    console.log('(' + indx + ') item.idCalculatorConfiguration: ' + item.idCalculatorConfiguration + ' gifts tam: ' + gifts.length);
                    console.log(item.idCalculatorConfiguration + ' longitud:   ' + gifts.length);
                    if (gifts) {
                      if (gifts.length > 0) {
                        console.log('****************************************');
                        gifts.map((gift, index) => {
                          console.log('indexxxxx:' + index);
                          productVsPromotions.set(gift.id, { productId: gift.id, name: gift.name, quantity: gift.quantity, promotionType: promotionResponse.type, promotionName: promotionResponse.name, percentualDiscountValue: promotionResponse.percentualDiscountValue });
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
                              console.log('productDetailEndpoint:::',gift.id);
                              console.log(JSON.stringify(responseProductDetail));
                              console.log('productDetailEndpoint:::');
                              if (responseProductDetail) {
                                vtexProductsServices
                                  .getProductPriceByProductId(gift.id)
                                  .then(async responsePrice => {
                                    console.log('priceEndpoint:::',gift.id);
                                    console.log(JSON.stringify(responsePrice, null, 4));
                                    console.log('priceEndpoint:::',gift.id);
                                    if (responsePrice) {
                                      vtexProductsServices
                                      .getProductRatingByProductId(gift.id)
                                      .then(async responseRating => {
                                        if(responseRating){
                                          console.log('rating...');
                                          console.log(JSON.stringify(responseRating,null, 4));
                                          console.log('rating...');
                                          productList.push({
                                            rating: responseRating.average, price: responsePrice.basePrice, PriceWithDiscount: 1,
                                            name: responseProductDetail.Name, url: 'productImg',
                                            quantity: ( itmMapFromCart.has(gift.id) ? itmMapFromCart.get(gift.id).quantity:0 ), productId: responseProductDetail.Id, oldPrice: '10'
                                          });
                                        }
                                      })
                                      .catch(error => console.log(error));
                                    }else{
                                      productList.push({
                                        rating: 0, price: 1000, PriceWithDiscount: 1,
                                        name: responseProductDetail.Name, url: 'productImg',
                                        quantity: ( itmMapFromCart.has(gift.id) ? itmMapFromCart.get(gift.id).quantity:0 ), productId: responseProductDetail.Id, oldPrice: '10'
                                      });
                                    }
                                  })
                                  .catch(error => console.log(error));
                              }
                            })
                            .catch(error => console.log(error));
                        });
                        console.log('****************************************');

                      }
                    }
                  }
                }
                console.log(productVsPromotions);
              }).catch(error => console.log(error));
            }
          });
        }
      }

      console.log('kkk');
      console.log(JSON.stringify(items, null, 4));
      console.log('kkk');
    }).catch(error => console.log(error));

    setProductsList(productList);
    console.log('sssss');
    console.log(JSON.stringify(productList, null, 4));
    console.log('sssss');
    //setProductFromPromotion(productList);
    setProductPromotions(productVsPromotions);
    let categories = [];
    categories.push({ id: "0", name: 'Todo' });
    categories.push({ id: "1", name: 'Botanas' });
    categories.push({ id: "2", name: 'Dulces' });
    categories.push({ id: "3", name: 'Bebidas' });
    categories.push({ id: "4", name: 'Cervezas' });
    setPromotionsCategory(categories);
  }, []);

  useEffect(() => {
    console.log('-------------------------init');
    console.log(promotions);
    console.log(JSON.stringify(productVsPromotion,null, 4));
    console.log((productVsPromotion));
    console.log('-------------------------finit');
    fetchData();
  }, []);



  const onPressOut = () => {

  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PromotionsScreen onPressClose={onPressOut}
        productsList={productsList} promotionsCategory={promotionsCategory} productPromotions={productPromotions}
      />
    </SafeArea>
  );
};

export default PromotionsController;
