import React, { useState } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import InformationModalScreen from './InformationModalScreen';
import { CarouselItem } from 'rtk';
import { ICONN_PAYBACK_MODAL_INFO_ONE, ICONN_PAYBACK_MODAL_INFO_TWO } from 'assets/images';

interface PointCardsModalInterface {
  visible: boolean;
  onPressClose: () => void;
}
const InformationModalController: React.FC<PointCardsModalInterface> = ({ visible, onPressClose }: PointCardsModalInterface) => {
  const cardsCarousel: CarouselItem[] = [];
  const newCarouselItem1: CarouselItem = {
    id: '1',
    cardNumber: '',
    image: ICONN_PAYBACK_MODAL_INFO_ONE,
    description: 'firstImage',
    link: '',
    navigationType: '',
    promotion_name: 'second',
    promotion_type: 'cards',
    status: 'active'
  };
  const newCarouselItem2: CarouselItem = {
    id: '2',
    cardNumber: '',
    image: ICONN_PAYBACK_MODAL_INFO_TWO,
    description: 'secondImage',
    link: '',
    navigationType: '',
    promotion_name: 'second',
    promotion_type: 'cards',
    status: 'active'
  };

  cardsCarousel.push(newCarouselItem1);
  cardsCarousel.push(newCarouselItem2);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <InformationModalScreen onPressClose={onPressClose} visible={visible} cards={cardsCarousel} />
    </SafeArea>
  );
};

export default InformationModalController;
