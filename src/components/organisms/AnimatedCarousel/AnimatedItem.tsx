import { Container, CustomText, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, ImageStyle, StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import { CarouselItem } from 'rtk';

interface Props {
  data: CarouselItem;
  position: number;
  onPressItem: (item: CarouselItem) => void;
}

const AnimatedItem: React.FC<Props> = ({ data, position, onPressItem }) => {
  const { width } = useWindowDimensions();
  const rightCardSpace = width * 0.08 * 2;
  position = position === 0 ? 16 : 8;

  const containerStyle: StyleProp<ViewStyle> = {
    width: width - rightCardSpace,
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1
  };

  const imageStyle: StyleProp<ImageStyle> = {
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

  {
    return data.promotion_type === 'principal' ? (
      <Touchable
        onPress={() => {
          onPressItem(data);
        }}
        marginLeft={position}
      >
        <Container style={containerStyle}>
          <Container style={imageContainer}>
            <Image source={{ uri: data.image }} style={imageStyle} />
          </Container>
          <Container flex space="evenly" style={footerContainer}>
            <CustomText text={data.promotion_name} fontBold />
            <TextContainer text={data.description} />
          </Container>
        </Container>
      </Touchable>
    ) : data.promotion_type === 'second' ? (
      <TextContainer text="second" />
    ) : data.promotion_type === 'all_promotions' ? (
      <TextContainer text="all_promotions" />
    ) : data.promotion_type === 'day_promotion' ? (
      <TextContainer text="day_promotion" />
    ) : null;
  }
};

export default AnimatedItem;
