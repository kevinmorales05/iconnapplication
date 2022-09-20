import React, { useState, useRef } from 'react';
import { FlatList, Animated } from 'react-native';
import { Container } from '../../atoms';
import { CarouselItem } from 'rtk';
import AnimatedItem from './AnimatedItem';

interface Props {
  items: CarouselItem[];
  onPressItem: (item: CarouselItem) => void;
}

const AnimatedCarousel: React.FC<Props> = ({ items, onPressItem }) => {
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
      <FlatList
        data={items}
        renderItem={({ item, index }) => <AnimatedItem data={item} position={index} onPressItem={onPressItem} />}
        horizontal
        bounces={items?.length > 1 ? true : false}
        keyExtractor={item => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
    </Container>
  );
};

export default AnimatedCarousel;
