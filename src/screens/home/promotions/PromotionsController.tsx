import React, { useState, useEffect, useCallback } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import PromotionsScreen from './PromotionsScreen';
import { vtexPromotionsServices } from 'services/vtexPromotions.services';

const PromotionsController: React.FC = () => {
  const [helpVisible, setHelpVisible] = useState<boolean>(false);


  const fetchData = useCallback(async () => {
    console.log('fetchData...');
    await vtexPromotionsServices.getAllPromotions().then(promotionsResponse => {

      }).catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onPressOut = () => {
    setHelpVisible(true);
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PromotionsScreen onPressClose={onPressOut}
        visible={helpVisible} />
    </SafeArea>
  );
};

export default PromotionsController;
