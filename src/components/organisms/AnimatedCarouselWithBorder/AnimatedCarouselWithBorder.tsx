import React, { useState, useRef } from 'react';
import { FlatList, Animated } from 'react-native';
import { Container } from '../../atoms';
import { CarouselItem, ProductInterface } from 'rtk';
import AnimatedItem from './AnimatedItemWithBorder';
import { CounterType } from 'components/types/counter-type';
import AnimatedItemWithBorder from './AnimatedItemWithBorder';

interface Props {
  items?: any;
}

const AnimatedCarouselWithBorder: React.FC<Props> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log('visible item: ', viewableItems);
    // setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 20 }).current;

  return (
    <Container flex center crossCenter>
        <FlatList
          data={items}
          renderItem={({ item, index }) => <AnimatedItemWithBorder icon={item.icon} serviceName={item.serviceName} onPressItem={item.onPressItem} />}
          horizontal
          bounces={items!.length > 1 ? true : false}
          keyExtractor={item => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          showsHorizontalScrollIndicator={false}
        />
    </Container>
  );
};

export default AnimatedCarouselWithBorder;
