import React, { useState, useRef } from 'react';
import { FlatList, Animated } from 'react-native';
import { Container } from '../../atoms';
import { CarouselItem, ProductInterface, RootState, useAppSelector } from 'rtk';
import AnimatedItem from './AnimatedItem';
import { CounterType } from 'components/types/counter-type';
import Octicons from 'react-native-vector-icons/Octicons';
import { logEvent } from 'utils/analytics';
import { CouponInterface } from 'rtk/types/coupons.types';

interface Props {
  items?: CarouselItem[];
  products?: ProductInterface[];
  onPressItem: (item: CarouselItem) => void;
  onPressProduct?: (type: CounterType, productId: string) => void;
  onPressOut: () => void;
  cards?: boolean;
  pointsCardDisabled?: boolean;
  banner?: boolean;
  coupons?: CouponInterface[];
  onPressCoupon?: (coupon: CouponInterface) => void;
}

const AnimatedCarousel: React.FC<Props> = ({
  items,
  products,
  onPressItem,
  onPressProduct,
  onPressOut,
  cards,
  banner,
  pointsCardDisabled,
  coupons,
  onPressCoupon
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
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
          renderItem={({ item, index }) => (
            <AnimatedItem
              data={item}
              pointsCardDisabled={pointsCardDisabled}
              position={index}
              onPressItem={
                banner
                  ? () => {
                      logEvent('hmPrincipalBanner', {
                        id: user.id,
                        description: 'Seleccionar un banner',
                        bannerId: item.id
                      });
                      onPressItem(item);
                    }
                  : onPressItem
              }
              onPressOut={onPressOut}
            />
          )}
          horizontal
          bounces={items.length > 1 ? true : false}
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
      {coupons && coupons.length > 0 ? (
        <FlatList
          data={coupons}
          renderItem={({ item, index }) => (
            <AnimatedItem coupon={item} position={index} onPressItem={() => {}} onPressOut={() => {}} onPressCoupon={onPressCoupon} />
          )}
          horizontal
          bounces={coupons?.length > 1 ? true : false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          showsHorizontalScrollIndicator={false}
        />
      ) : null}
    </Container>
  );
};

export default AnimatedCarousel;
