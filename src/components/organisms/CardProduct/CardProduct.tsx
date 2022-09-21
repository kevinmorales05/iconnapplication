import React from 'react';
import { StyleSheet, ImageBackground, Dimensions, Image, ImageSourcePropType } from 'react-native';
import theme from 'components/theme/theme';
import { Button } from 'components/molecules';
import { ICONN_REVERSE_BASKET } from 'assets/images';
import { Rating } from 'components/molecules/Rating';
import { PriceWithDiscount } from 'components/molecules/PriceWithDiscount';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import { Container, CustomText } from 'components/atoms';

interface CardProductProps {
  price: number;
  name: string;
  image: ImageSourcePropType;
  quantity: number;
  productId: string;
  onPressAddCart: () => void;
  onPressDeleteCart: () => void;
  onPressAddQuantity: () => void;
  oldPrice?: number;
  ratingValue?: number;
  porcentDiscount?: number;
}

const { width } = Dimensions.get('window');
const dw = 350;
const scale = (size: number) => (width / dw) * size;
const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

const CardProduct: React.FC<CardProductProps> = ({
  ratingValue,
  price,
  oldPrice,
  porcentDiscount,
  name,
  image,
  quantity,
  productId,
  onPressAddCart,
  onPressDeleteCart,
  onPressAddQuantity
}: CardProductProps) => {
  return (
    <Container style={styles.container}>
      <Container style={styles.subContainer}>
        <ImageBackground style={styles.containerImage} resizeMode={'contain'} source={image}>
          {porcentDiscount && (
            <Container style={styles.containerPorcentDiscount}>
              <CustomText fontSize={theme.fontSize.h6} textColor={theme.brandColor.iconn_green_original} fontWeight={'bold'} text={`-${porcentDiscount}%`} />
            </Container>
          )}
        </ImageBackground>
        <Container style={styles.containerTitle}>
          <CustomText fontSize={theme.fontSize.h5} text={`${name}`} numberOfLines={3} />
        </Container>
        <Rating ratingValue={ratingValue} />
        <PriceWithDiscount price={price} oldPrice={oldPrice} />
      </Container>
      <Container style={styles.containerButton}>
        {quantity ? (
          <QuantityProduct quantity={quantity} onPressAddQuantity={onPressAddQuantity} onPressDeleteCart={onPressDeleteCart} />
        ) : (
          <Button
            color="iconn_green_original"
            round
            size={'xxxsmall'}
            onPress={onPressAddCart}
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
    width: moderateScale(156),
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
