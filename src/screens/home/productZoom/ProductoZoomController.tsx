import { SafeArea } from 'components';
import React from 'react';
import theme from 'components/theme/theme';
import ProductZoomScreen from './ProductZoomScreen';

const ProductoZoomController: React.FC = () => {
  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <ProductZoomScreen />
    </SafeArea>
  );
};

export default ProductoZoomController;
