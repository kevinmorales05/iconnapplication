import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Image, ImageSourcePropType } from 'react-native';
import theme from 'components/theme/theme';
import { Button, FavoriteButton } from 'components/molecules';
import { ICONN_REVERSE_BASKET } from 'assets/images';
import { Rating } from 'components/molecules/Rating';
import { PriceWithDiscount } from 'components/molecules/PriceWithDiscount';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import { Container, CustomText } from 'components/atoms';
import { moderateScale } from 'utils/scaleMetrics';
import { Touchable } from 'components';
import { useNavigation } from '@react-navigation/native';
import { setDetailSelected } from 'rtk/slices/cartSlice';
import { useAppDispatch, useAppSelector, RootState } from 'rtk';
import { getProductDetailById } from 'services/vtexProduct.services';
import { vtexUserServices } from 'services';
interface CardProductProps {
  price: number;
  name: string;
  image: ImageSourcePropType;
  quantity: number;
  productId: string;
  onPressAddCart: () => void;
  onPressDeleteCart: () => void;
  onPressAddQuantity: () => void;
  onPressDecreaseQuantity: () => void;
  oldPrice?: number;
  ratingValue?: number;
  porcentDiscount?: number;
  notNeedMarginLeft?: boolean;
  isFavorite?: boolean;
  onPressOut: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({
  ratingValue,
  price,
  oldPrice,
  porcentDiscount,
  name,
  image,
  quantity,
  productId,
  isFavorite,
  onPressAddCart,
  onPressDeleteCart,
  onPressAddQuantity,
  onPressDecreaseQuantity,
  notNeedMarginLeft,
  onPressOut
}: CardProductProps) => {

  const [categoryId, setCategoryId] = useState(Object);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const validateCategoryForAddItem = () => {
    getProductDetailById(productId).then(productDetail => {
      if (productDetail.DepartmentId == 167) {
        if (user.email) {
          console.log('user.email: ',user.email);
          vtexUserServices.getUserByEmail(user.email).then( userResponse => {
            let isAdult = false;
            if (userResponse) {
              const { data } = userResponse;
              if (data) {
                if (data.length > 0) {
                  isAdult = data[0].isAdult;
                  if (isAdult) {
                    onPressAddCart();
                  } else {
                    onPressOut();
                  }
                }
              }
            }
          })
        }

      } else {
        onPressAddCart();
      }
    })
  };

  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();

  return (
    <Container style={[styles.container, { marginLeft: moderateScale(notNeedMarginLeft ? 0 : 8) }]}>
      <Container style={styles.subContainer}>
        <Touchable onPress={() => {
          dispatch(setDetailSelected(productId));
          navigate('ProductDetail', { productIdentifier: productId });
        }}>
          <ImageBackground style={styles.containerImage} resizeMode={'contain'} source={image}>
            <Container row width={'100%'} space="between">
              {porcentDiscount && (
                <Container flex width={"100%"}>
                  <Container style={styles.containerPorcentDiscount}>
                    <CustomText fontSize={theme.fontSize.h6} textColor={theme.brandColor.iconn_green_original} fontWeight={'bold'} text={`-${porcentDiscount}%`} />
                  </Container>
                </Container>
              )}
              <Container flex width={"100%"} style={{ justifyContent: "center", alignItems: "flex-end" }}>
                <FavoriteButton sizeIcon={moderateScale(24)} isFavorite={isFavorite ? isFavorite : false} onPressItem={() => { }} />
              </Container>
            </Container>
          </ImageBackground>
        </Touchable>
        <Container style={styles.containerTitle}>
          <CustomText fontSize={theme.fontSize.h5} text={`${name}`} numberOfLines={3} />
        </Container>
        <Rating ratingValue={ratingValue} />
        <PriceWithDiscount price={price.toFixed(2)} oldPrice={oldPrice} />
      </Container>
      <Container style={styles.containerButton}>
        {quantity ? (
          <QuantityProduct
            quantity={quantity}
            onPressAddQuantity={onPressAddQuantity}
            onPressDeleteCart={onPressDeleteCart}
            onPressDecreaseQuantity={onPressDecreaseQuantity}
          />
        ) : (
          <Button
            color="iconn_green_original"
            round
            size={'xxxsmall'}
            onPress={() => {validateCategoryForAddItem()}}
            fontSize="h4"
            fontBold
            style={styles.buttonAddProduct}
            icon={<Image style={styles.image} source={ICONN_REVERSE_BASKET} />}
          >
            Agregar
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(160),
    minHeight: moderateScale(254),
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: moderateScale(16),
    borderRadius: moderateScale(10),
    padding: moderateScale(8)
  },
  subContainer: {
    flex: 1,
    width: '100%'
  },
  containerImage: {
    width: '100%',
    height: moderateScale(90),
    alignItems: 'flex-end'
  },
  containerPorcentDiscount: {
    width: moderateScale(44),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerTitle: {
    width: '100%',
    minHeight: moderateScale(45),
    marginTop: moderateScale(10)
  },
  containerRating: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(9),
    alignItems: 'center'
  },
  containerPrice: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(15),
    alignItems: 'center'
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain'
  },
  containerButton: {
    flex: 0.25,
    width: '100%',
    justifyContent: 'flex-end'
  },
  buttonAddProduct: {
    borderRadius: moderateScale(10)
  }
});
