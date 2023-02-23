import React, { useRef } from 'react';
import { FlatList, Animated } from 'react-native';
import { Container } from '../../atoms';
import { TabItem } from 'rtk';
import TabAnimated from './TabAnimatedItem';

interface Props {
  items: TabItem[];
  idSelected: string;
  onPressItem: (item: TabItem) => void;
}

const TabAnimatable: React.FC<Props> = ({ items, idSelected, onPressItem }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <Container width={'100%'}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => <TabAnimated isSelected={idSelected === item.id} data={item} position={index} onPressItem={onPressItem} />}
        horizontal
        bounces={items?.length > 1 ? true : false}
        keyExtractor={item => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
    </Container>
  );
};

export default TabAnimatable;
