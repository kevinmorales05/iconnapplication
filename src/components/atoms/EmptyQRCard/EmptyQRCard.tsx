import { ICONN_QR_CODE } from 'assets/images';
import { TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { Image } from 'react-native';
import { Container } from '../Container';

type Props = {
  height?: number
}

const EmptyQRCard: React.FC<Props> = ({height}) => {
  return (
    <Container center style={{ marginTop: 50, paddingHorizontal: 40, paddingBottom: 65, height: height ? height : 'auto' }}>
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
