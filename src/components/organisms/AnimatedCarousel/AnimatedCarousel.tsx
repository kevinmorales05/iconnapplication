import React, { useState, useRef } from 'react';
import { FlatList, Animated } from 'react-native';
import { Container } from '../../atoms';
import { CarouselItem, ProductInterface } from 'rtk';
import AnimatedItem from './AnimatedItem';

interface Props {
  items?: CarouselItem[];
  products?: ProductInterface[];
  onPressItem: (item: CarouselItem) => void;
}

const AnimatedCarousel: React.FC<Props> = ({ items, products, onPressItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log('visible item: ', viewableItems);
    // setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <Container flex center crossCenter>
      {products && products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item, index }) => <AnimatedItem product={item} position={index} onPressItem={onPressItem} />}
          horizontal
          bounces={products?.length > 1 ? true : false}
          keyExtractor={item => item.productId}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      ) : items && items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item, index }) => <AnimatedItem data={item} position={index} onPressItem={onPressItem} />}
          horizontal
          bounces={items!.length > 1 ? true : false}
          keyExtractor={item => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      ) : null}
    </Container>
  );
};

export default AnimatedCarousel;
