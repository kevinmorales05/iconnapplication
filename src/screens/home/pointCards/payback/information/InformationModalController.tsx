import React, { useState } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import InformationModalScreen from './InformationModalScreen';

interface PointCardsModalInterface {
  visible: boolean,
  onPressClose: () => void;
}
const InformationModalController: React.FC<PointCardsModalInterface> = ({ visible, onPressClose }: PointCardsModalInterface) => {

  return (
    <SafeArea
    childrenContainerStyle={{ paddingHorizontal: 0 }}
    topSafeArea={false}
    bottomSafeArea={false}
    backgroundColor={theme.brandColor.iconn_background}
    barStyle="dark"
    >
      <InformationModalScreen onPressClose={onPressClose}
        visible={visible} />
    </SafeArea>
  );
};

export default InformationModalController;
