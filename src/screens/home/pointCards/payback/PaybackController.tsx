import React, { useEffect } from 'react';
import PaybackScreen from './PaybackScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';

interface Props {
  productIdentifier?: string;
  productPromotions: Map<string, Object>;
}

const PaybackController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'Payback'>>();


  useEffect(() => { }, []);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PaybackScreen
        itemId={''} />
    </SafeArea>
  );
};

export default PaybackController;
