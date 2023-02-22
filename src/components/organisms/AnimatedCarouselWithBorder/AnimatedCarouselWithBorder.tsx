import React, { useRef } from 'react';
import { FlatList, Animated, ViewStyle, ImageStyle } from 'react-native';
import { ServiceType } from 'rtk';
import { Container } from '../../atoms';
import AnimatedItemWithBorder from './AnimatedItemWithBorder';

interface Props {
  items?: ServiceType[];
  style?: ViewStyle;
  slug?: boolean;
  imgStyle?: ImageStyle;
}

const AnimatedCarouselWithBorder: React.FC<Props> = ({ items, style, slug = true, imgStyle }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 20 }).current;

  return (
    <Container flex center crossCenter>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <AnimatedItemWithBorder
            style={style}
            icon={item.icon}
            disabled={item.disabled}
            serviceName={item.serviceName}
            onPressItem={item.onPressItem}
            slug={slug}
            imgStyle={imgStyle}
          />
        )}
        horizontal
        bounces={items!.length > 1 ? true : false}
        keyExtractor={(_item, index) => index.toString()}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default AnimatedCarouselWithBorder;
