import React, { useEffect } from 'react';
import PreferenteScreen from './PreferenteScreen';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';

interface Props {
  productIdentifier?: string;
  productPromotions: Map<string, Object>;
}

const PreferenteController: React.FC<Props> = () => {

  useEffect(() => { }, []);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PreferenteScreen
        itemId={''} />
    </SafeArea>
  );
};

export default PreferenteController;
