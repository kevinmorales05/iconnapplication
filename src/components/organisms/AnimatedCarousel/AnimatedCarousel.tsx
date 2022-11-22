import React, { useState, useRef } from 'react';
import { FlatList, Animated } from 'react-native';
import { Container } from '../../atoms';
import { CarouselItem, ProductInterface } from 'rtk';
import AnimatedItem from './AnimatedItem';
import { CounterType } from 'components/types/counter-type';
import Octicons from 'react-native-vector-icons/Octicons';

interface Props {
  items?: CarouselItem[];
  products?: ProductInterface[];
  onPressItem: (item: CarouselItem) => void;
  onPressProduct?: (type: CounterType, productId: string) => void;
  onPressOut: () => void;
  cards?: boolean;
}

const AnimatedCarousel: React.FC<Props> = ({ items, products, onPressItem, onPressProduct, onPressOut, cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <Container flex center crossCenter>
      {products && products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item, index }) => (
            <AnimatedItem product={item} position={index} onPressItem={onPressItem} onPressProduct={onPressProduct} onPressOut={onPressOut} />
          )}
          horizontal
          bounces={products?.length > 1 ? true : false}
          keyExtractor={item => item.productId}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          showsHorizontalScrollIndicator={false}
        />
      ) : items && items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item, index }) => <AnimatedItem data={item} position={index} onPressItem={onPressItem} onPressOut={onPressOut} />}
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
      ) : cards ? (
        <FlatList
          data={items}
          renderItem={({ item, index }) => <AnimatedItem data={item} position={index} onPressItem={() => {}} onPressOut={() => {}} />}
          horizontal
          bounces={items && items!.length > 1 ? true : false}
          keyExtractor={item => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          showsHorizontalScrollIndicator={false}
        />
      ) : null}
      {cards && items && items?.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ index }) => (
            <Container style={{ marginRight: 8, marginTop: 12 }}>
              {index === currentIndex ? <Octicons size={20} name="dot-fill" color={'#008060'} /> : <Octicons size={20} name="dot-fill" color={'#dadadb'} />}
            </Container>
          )}
          horizontal
        />
      ) : null}
    </Container>
  );
};

export default AnimatedCarousel;
