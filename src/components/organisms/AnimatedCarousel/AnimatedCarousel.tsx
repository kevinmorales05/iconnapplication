import React, { useState, useRef } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, AddressCard, TouchableText } from '../../molecules';
import { CustomModal, Container, InfoCard, CustomText, ActionButton, Touchable } from '../../atoms';
import { CarouselItem, PromotionType } from 'rtk';
import NetInfo from '@react-native-community/netinfo';
import theme from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedItem from './AnimatedItem';

interface Props {
  type: PromotionType;
  visible: boolean;
  items: CarouselItem[];
  onPressItem: (item: CarouselItem) => void;
}

const AnimatedCarousel: React.FC<Props> = ({ visible, items, onPressItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    console.log('visible item: ', viewableItems);
    // setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <Container flex center crossCenter width={'100%'}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => <AnimatedItem data={item} position={index} onPressItem={onPressItem} />}
        horizontal
        showsHorizontalScrollIndicator
        bounces={true}
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
