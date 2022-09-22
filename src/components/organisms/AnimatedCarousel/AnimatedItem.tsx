import {
  ICONN_HOME_OPTION_ACUMMULATE,
  ICONN_HOME_OPTION_HEART,
  ICONN_HOME_OPTION_ORDERS,
  ICONN_HOME_OPTION_PETRO,
  ICONN_HOME_OPTION_SEVEN,
  ICONN_HOME_OPTION_WALLET
} from 'assets/images';
import { CardProduct, Container, CustomText, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, ImageStyle, StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import { CarouselItem, ProductInterface } from 'rtk';

interface Props {
  data: CarouselItem | ProductInterface;
  position: number;
  onPressItem: (item: CarouselItem) => void;
  products?: boolean;
}

const AnimatedItem: React.FC<Props> = ({ data, position, onPressItem, products }) => {
  const { width } = useWindowDimensions();
  const rightCardSpace = width * 0.08 * 2;
  position = position === 0 ? 16 : 8;

  const containerStyle: StyleProp<ViewStyle> = {
    width: width - rightCardSpace,
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    marginBottom: 16,
    elevation: 1
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
    elevation: 1
  };

  const secondImageStyle: StyleProp<ImageStyle> = {
    borderRadius: 8,
    height: 154,
    resizeMode: 'stretch'
  };

  const dayPromotionContainer: StyleProp<ViewStyle> = {
    width: width - 32,
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    margin: 8,
    elevation: 1
  };

  const dayPromotionImageStyle: StyleProp<ImageStyle> = {
    borderRadius: 8,
    height: 172,
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
    elevation: 1
  };

  const allPromotionsImage: StyleProp<ImageStyle> = {
    borderRadius: 8,
    height: 160,
    width: 160,
    resizeMode: 'stretch'
  };

  {
    return products === true ? (
      <CardProduct
        key={Math.random()}
        image={data.image}
        name={data.name}
        price={data.price}
        productId={data.productId}
        quantity={data.quantity}
        onPressAddCart={() => {}}
        onPressAddQuantity={() => {}}
        onPressDeleteCart={() => {}}
      />
    ) : data.promotion_type === 'principal' ? (
      <Touchable
        onPress={() => {
          onPressItem(data);
        }}
        marginLeft={position}
        key={Math.random()}
      >
        <Container style={containerStyle}>
          <Container style={imageContainer}>
            <Image source={{ uri: data.image }} style={image} />
          </Container>
          <Container flex space="evenly" style={footerContainer}>
            <CustomText text={data.promotion_name} fontBold />
            <TextContainer text={data.description} />
          </Container>
        </Container>
      </Touchable>
    ) : data.promotion_type === 'homeOptions' ? (
      <Touchable
        onPress={() => {
          onPressItem(data);
        }}
        marginLeft={position}
        key={Math.random()}
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
                ? ICONN_HOME_OPTION_ACUMMULATE
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
    ) : data.promotion_type === 'second' ? (
      <Touchable
        onPress={() => {
          onPressItem(data);
        }}
        key={Math.random()}
      >
        <Container style={containerSecond}>
          <Image source={{ uri: data.image }} style={secondImageStyle} />
        </Container>
      </Touchable>
    ) : data.promotion_type === 'day_promotion' ? (
      <Touchable
        onPress={() => {
          onPressItem(data);
        }}
        key={Math.random()}
      >
        <Container style={dayPromotionContainer}>
          <Container style={dayPromotionImageStyle}>
            <Image source={{ uri: data.image }} style={image} />
          </Container>
          <Container flex space="evenly" style={dayPromotionFooterContainer}>
            <CustomText text={data.promotion_name} fontBold />
            <TextContainer text={data.description} />
          </Container>
        </Container>
      </Touchable>
    ) : data.promotion_type === 'all_promotions' ? (
      <Touchable
        onPress={() => {
          onPressItem(data);
        }}
        marginLeft={position}
        key={Math.random()}
      >
        <Container style={allPromotionsContainer}>
          <Image source={{ uri: data.image }} style={allPromotionsImage} />
        </Container>
      </Touchable>
    ) : null;
  }
};

export default AnimatedItem;
