import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { TextContainer, Container } from 'components';
import theme from 'components/theme/theme';
import { RootState, useAppSelector } from 'rtk';
import { ICONN_PAYBACK_HELP } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {

}

const PaybackHelpScreen: React.FC<Props> = () => {
  const { detailSelected, cart } = useAppSelector((state: RootState) => state.cart);

  useEffect(() => {
  }, []);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }}>
      <Image source={ICONN_PAYBACK_HELP} style={{ width: '100%', height: moderateScale(200) }} />
      <Container center style={{ width: '90%', marginTop: 20, marginLeft:moderateScale(20) }}>
        <TextContainer
          marginTop={8}
          fontSize={14}
          text={
            'Compra en marcas y tiendas en línea participantes para acumular Puntos en tu Monedero, los cuales podrás usar después en tus próximas compras.'
          }
        />
      </Container>
      <Container style={{ width: '100%', height:4, backgroundColor: theme.brandColor.iconn_light_grey, marginTop:moderateScale(30) }}></Container>
      <Container style={{ width: '90%', marginTop: 25, marginLeft:moderateScale(20) }}>
       <TextContainer typography="h6" fontSize={14} fontBold text={`Cómo usar payback`} textColor={theme.fontColor.placeholder} />
        <TextContainer typography="h6" fontSize={14} fontBold text={`1. Acumula puntos`} marginTop={24} />
        <TextContainer typography="h6" fontSize={14} text={`Muestra tu código PAYBACK al pagar en marcas participantes y gana puntos en cada compra.`} />

        <TextContainer typography="h6" fontSize={14} fontBold text={`2. Paga con puntos`} marginTop={24} />
        <TextContainer typography="h6" fontSize={14} text={`Úsalos para comprar en marcas participantes y ¡vuelve a comprar!`} />

        <TextContainer typography="h6" fontSize={14} fontBold text={`3. Multiplica tus puntos`} marginTop={24} />
        <TextContainer typography="h6" fontSize={14} text={`Checa tus cupones disponibles y actívalos ¡podrás multiplicar tus puntos!`} />

      </Container>
    </Container>

  );
};

export default PaybackHelpScreen;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(160),
    minHeight: moderateScale(254),
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: moderateScale(16),
    borderRadius: moderateScale(10),
    padding: moderateScale(8)
  },
  containerPorcentDiscount: {
    width: moderateScale(84),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain'
  }
});
