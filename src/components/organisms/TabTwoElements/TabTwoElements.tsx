import React, { useState, useRef } from 'react';
import { FlatList, Animated, Dimensions } from 'react-native';
import { Container } from '../../atoms';
import { TabItem } from 'rtk';
import TabTwoElementsItem from './TabTwoElementsItem';
import theme from 'components/theme/theme';

interface Props {
  items: TabItem[];
  idSelected: string;
  onPressItem: (item: TabItem) => void;
}

const TabTwoElements: React.FC<Props> = ({ items, idSelected, onPressItem }) => {

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 100 }).current;

  return (
    <Container center width={'100%'} style={{borderBottomColor: theme.brandColor.iconn_med_grey, borderBottomWidth: 1}} >
      <FlatList
        data={items}
        renderItem={({ item, index }) => <TabTwoElementsItem isSelected={idSelected === item.id} data={item} onPressItem={onPressItem} />}
        horizontal
        keyExtractor={item => item.id}
        viewabilityConfig={viewConfig}
        contentContainerStyle={{ justifyContent: 'space-evenly' }}
        scrollEnabled={false}
      />
    </Container>
  );
};

export default TabTwoElements;
