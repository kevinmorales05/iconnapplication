import React, { useState } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import PointCardsModalScreen from './PointCardsModalScreen';

interface PointCardsModalInterface {
  visible: boolean,
  onPressClose: () => void;
}
const PointCardsModalController: React.FC<PointCardsModalInterface> = ({ visible, onPressClose }: PointCardsModalInterface) => {

  return (
    <SafeArea
    childrenContainerStyle={{ paddingHorizontal: 0 }}
    topSafeArea={false}
    bottomSafeArea={false}
    backgroundColor={theme.brandColor.iconn_background}
    barStyle="dark"
    >
      <PointCardsModalScreen onPressClose={onPressClose}
        visible={visible} />
    </SafeArea>
  );
};

export default PointCardsModalController;
