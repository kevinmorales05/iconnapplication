import {
  ICONN_ACCOUNT_COUPON,
  ICONN_HOME_OPTION_HEART,
  ICONN_HOME_OPTION_ORDERS,
  ICONN_HOME_OPTION_PETRO,
  ICONN_HOME_OPTION_SEVEN,
  ICONN_HOME_OPTION_WALLET
} from 'assets/images';
import { CardProduct, Container, CustomText, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import { CounterType } from 'components/types/counter-type';
import { useNotEnabledModal } from 'context/notEnabled.context';
import React from 'react';
import { Image, ImageStyle, StyleProp, useWindowDimensions, ViewStyle, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import { CarouselItem, ProductInterface } from 'rtk';
import { navigate } from '../../../navigation/RootNavigation';
import { UserCouponInterface } from 'rtk/types/coupons.types';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

interface Props {
  data?: CarouselItem;
  product?: ProductInterface;
  position: number;
  onPressItem: (item: CarouselItem) => void;
  onPressProduct?: (type: CounterType, productId: string) => void;
  onPressOut: () => void;
  pointsCardDisabled?: boolean;
  coupon?: UserCouponInterface;
  onPressCoupon?: (coupon: UserCouponInterface) => void;
  userCoupons?: UserCouponInterface[];
}

const AnimatedItem: React.FC<Props> = ({
  data,
  product,
  position,
  onPressItem,
  onPressProduct,
  onPressOut,
  pointsCardDisabled = false,
  coupon,
  onPressCoupon,
  userCoupons
}) => {
  const { width } = useWindowDimensions();
  const rightCardSpace = width * 0.08 * 2;
  position = position === 0 ? 16 : 8;
  const modalNotEnabled = useNotEnabledModal();
  const containerStyle: StyleProp<ViewStyle> = {
    width: width - rightCardSpace,
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    marginBottom: 16,
    elevation: 5
  };

  const image: StyleProp<ImageStyle> = {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: '100%',
    resizeMode: 'stretch'
  };

  const imageContainer: StyleProp<ViewStyle> = {
    height: 114
  };

  const footerContainer: StyleProp<ViewStyle> = {
    height: 40,
    margin: 8
  };

  const containerSecond: StyleProp<ViewStyle> = {
    width: width - 32,
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    margin: 8,
    elevation: 3
  };
  const containerCard: StyleProp<ViewStyle> = {
    marginHorizontal: 16,
    marginTop: 16
  };

  const secondImageStyle: StyleProp<ImageStyle> = {
    borderRadius: 8,
    height: 154,
    resizeMode: 'stretch'
  };
  const cardImageStyle: StyleProp<ImageStyle> = {
    borderRadius: 8,
    height: 164,
    width: 261,
    resizeMode: 'stretch'
  };

  const dayPromotionFooterContainer: StyleProp<ViewStyle> = {
    height: 50,
    margin: 8
  };

  const allPromotionsContainer: StyleProp<ViewStyle> = {
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    marginVertical: 8,
    elevation: 3
  };

  const dayPromotionContainer: StyleProp<ViewStyle> = {
    width: width - 32,
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    margin: 8,
    elevation: 3
  };

  const dayPromotionImageStyle: StyleProp<ImageStyle> = {
    borderRadius: 8,
    height: 172,
    resizeMode: 'stretch'
  };

  const allPromotionsImage: StyleProp<ImageStyle> = {
    borderRadius: 8,
    height: 160,
    width: 160,
    resizeMode: 'stretch'
  };

  function verifyIfActivated(item: UserCouponInterface) {
    return coupon?.value.promotionid === item.value.promotionid;
  }
  const activatedPromotion = userCoupons?.find(verifyIfActivated);

  return product ? (
    <Container>
      <CardProduct
        image={product.image!}
        name={product.name!}
        price={product.price!}
        productId={product.productId}
        quantity={product.quantity!}
        ratingValue={product.ratingValue}
        promotionType={product.promotionType}
        percentualDiscountValue={product.percentualDiscountValue}
        promotionName={product.promotionName}
        costDiscountPrice={product.costDiscountPrice}
        onPressAddCart={() => {
          onPressProduct!('create', product.productId);
        }}
        onPressAddQuantity={() => {
          onPressProduct!('add', product.productId);
        }}
        onPressDeleteCart={() => {
          onPressProduct!('remove', product.productId);
        }}
        onPressDecreaseQuantity={() => {
          onPressProduct!('substract', product.productId);
        }}
        onPressOut={onPressOut}
      />
    </Container>
  ) : data !== undefined && data.promotion_type === 'principal' ? (
    <Touchable
      onPress={() => {
        onPressItem(data);
      }}
      marginLeft={position}
    >
      <Container style={containerStyle}>
        <Container style={imageContainer}>
          <FastImage source={{ uri: data.image }} style={image} />
        </Container>
        <Container flex space="evenly" style={footerContainer}>
          <CustomText text={data.promotion_name} fontBold />
          <TextContainer text={data.description} />
        </Container>
      </Container>
    </Touchable>
  ) : data !== undefined && data.promotion_type === 'principal' ? (
    <Touchable
      onPress={() => {
        onPressItem(data);
      }}
      marginLeft={position}
    >
      <Container style={containerStyle}>
        <Container style={imageContainer}>
          <FastImage source={{ uri: data.image }} style={image} />
        </Container>
        <Container flex space="evenly" style={footerContainer}>
          <CustomText text={data.promotion_name} fontBold />
          <TextContainer text={data.description} />
        </Container>
      </Container>
    </Touchable>
  ) : data !== undefined && data.promotion_type === 'homeOptions' ? (
    <Touchable
      onPress={() => {
        onPressItem(data);
      }}
      marginLeft={position}
    >
      <Container width={72} center>
        <Image
          source={
            data.id === '0'
              ? ICONN_HOME_OPTION_SEVEN
              : data.id === '1'
              ? ICONN_HOME_OPTION_PETRO
              : data.id === '2'
              ? ICONN_HOME_OPTION_HEART
              : data.id === '3'
              ? ICONN_ACCOUNT_COUPON
              : data.id === '4'
              ? ICONN_HOME_OPTION_WALLET
              : data.id === '5'
              ? ICONN_HOME_OPTION_ORDERS
              : null
          }
          style={{ width: 35, height: 35, resizeMode: 'contain' }}
        />
        <TextContainer text={data.description} marginTop={6} typography="h5" />
      </Container>
    </Touchable>
  ) : data !== undefined && data.promotion_type === 'second' ? (
    <Touchable
      onPress={() => {
        onPressItem(data);
      }}
    >
      <Container style={containerSecond}>
        <FastImage source={{ uri: data.image }} style={secondImageStyle} />
      </Container>
    </Touchable>
  ) : data !== undefined && data.promotion_type === 'cards' ? (
    <Touchable
      onPress={() => {
        if (data.navigateTo?.length > 0) {
          if (!pointsCardDisabled) {
            navigate(data.navigateTo, { addOrShow: 1, cardId: data.id, cardNumber: data.cardNumber });
          } else {
            modalNotEnabled.show();
          }
        }
      }}
    >
      <Container center style={containerCard}>
        {pointsCardDisabled ? (
          <Grayscale>
            <FastImage source={data.image} style={cardImageStyle} />
          </Grayscale>
        ) : (
          <FastImage source={data.image} style={cardImageStyle} />
        )}
        {pointsCardDisabled && <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(52, 52, 52, 0.4)' }} />}
      </Container>
    </Touchable>
  ) : data !== undefined && data.promotion_type === 'all_promotions' ? (
    <Touchable
      onPress={() => {
        onPressItem(data);
      }}
      marginLeft={position}
    >
      <Container style={allPromotionsContainer}>
        <FastImage source={{ uri: data.image }} style={allPromotionsImage} />
      </Container>
    </Touchable>
  ) : coupon && onPressCoupon ? (
    activatedPromotion?.value.coupons_status_id === 2 ? (
      <></>
    ) : (
      <Container
        backgroundColor={'grey'}
        style={{ borderRadius: 8, marginHorizontal: moderateScale(7) }}
        height={verticalScale(134)}
        width={moderateScale(156)}
      >
        <Touchable onPress={() => onPressCoupon(coupon.value)}>
          <Image
            source={{ uri: coupon.value.listviewimage }}
            style={{ height: verticalScale(134), width: moderateScale(156), borderRadius: 8 }}
            resizeMode={'contain'}
          />
        </Touchable>
      </Container>
    )
  ) : data !== undefined && data.promotion_type === 'day_promotion' ? (
    <Touchable
      onPress={() => {
        onPressItem(data);
      }}
    >
      <Container style={dayPromotionContainer}>
        <Container style={dayPromotionImageStyle}>
          <FastImage source={{ uri: data.image }} style={image} />
        </Container>
        <Container flex space="evenly" style={dayPromotionFooterContainer}>
          <CustomText text={data.promotion_name} fontBold />
          <TextContainer text={data.description} />
        </Container>
      </Container>
    </Touchable>
  ) : null;
};

export default AnimatedItem;
