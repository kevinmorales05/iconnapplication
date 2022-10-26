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
  const [productFromPromotion, setProductFromPromotion] = useState([]);
  const [productPromotions, setProductPromotions] = useState<Object>();
  const [promotionsCategory, setPromotionsCategory] = useState<Object>();
  const [cartItems, setCartItems] = useState<Map<string,Object>>();
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
    const { items } = cart;
    let itmMapFromCart = new Map();
    if (items != undefined) {
      console.log('tam items...',items.length);
      items.map((item) => {
        itmMapFromCart.set(item.productId, { id: item.productId, quantity: item.quantity, seller: item.seller });
      });


      let prodList = promotions;
      let prodListWithQuantities = [];
      prodList.map((prod) => {
        const prodObj = {
          priceWithDiscount: prod.priceWithDiscount, name: prod.name, oldPrice: prod.oldPrice, price: prod.price,
          productId: prod.productId, quantity: (itmMapFromCart.has(prod.productId)?itmMapFromCart.get(prod.productId).quantity:0),
          rating: prod.rating, image: prod.image
        }
        prodListWithQuantities.push(prodObj);
      });

      setProductFromPromotion(prodListWithQuantities);
      setCartItems(itmMapFromCart);
    }

    let categories = [];
    categories.push({ id: "0", name: 'Todo' });
    categories.push({ id: "1", name: 'Botanas' });
    categories.push({ id: "2", name: 'Dulces' });
    categories.push({ id: "3", name: 'Bebidas' });
    categories.push({ id: "4", name: 'Cervezas' });
    setPromotionsCategory(categories);
  }, []);

  useEffect(() => {
    console.log(promotions);
    console.log((productVsPromotion));
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
        productsList={productFromPromotion} promotionsCategory={promotionsCategory} productPromotions={productVsPromotion}
        cartItems={cartItems}
      />
    </SafeArea>
  );
};

export default PromotionsController;
