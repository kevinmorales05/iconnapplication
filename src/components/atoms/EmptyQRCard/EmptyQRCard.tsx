import { ICONN_QR_CODE } from 'assets/images';
import { TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { Image } from 'react-native';
import { Container } from '../Container';

const EmptyQRCard: React.FC = () => {
  return (
    <Container center style={{ marginTop: 75, paddingHorizontal: 40 }}>
      <Image source={ICONN_QR_CODE} style={{ height: 40, width: 40 }} />
      <TextContainer
        text="Aquí verás tus códigos QR para pagar más rápido en tienda."
        textColor={theme.fontColor.placeholder}
        fontSize={14}
        textAlign="center"
        marginTop={12}
      />
    </Container>
  );
};

export default EmptyQRCard;
