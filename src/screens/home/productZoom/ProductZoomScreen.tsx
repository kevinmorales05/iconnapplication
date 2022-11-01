import React from 'react';
import theme from 'components/theme/theme';
import { Container } from 'components';
import { ImageZoom } from 'components/molecules/ImageZoom';

const ProductZoomScreen: React.FC<any> = () => {
  return (
    <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', padding: 0 }}>
      <ImageZoom />
    </Container>
  );
};

export default ProductZoomScreen;
