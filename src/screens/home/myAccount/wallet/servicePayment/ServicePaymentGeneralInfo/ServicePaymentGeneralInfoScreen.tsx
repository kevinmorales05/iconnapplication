import React from 'react';
import { ICONN_SERVICE_PAYMENT_GENERAL_INFO } from 'assets/images';
import { Image } from 'react-native';
import { moderateScale } from 'utils/scaleMetrics';
import { TextContainer, Container, Touchable, SafeArea } from 'components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';

interface Props {
  goBack: () => void;
}

const ServicePaymentGeneralInfoScreen: React.FC<Props> = ({ goBack }) => {
  const insets = useSafeAreaInsets();

  const onClose = () => {
    goBack();
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={true} barStyle="dark" childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <Container style={{ marginTop: insets.top + 16 }} crossCenter>
        <Container>
          <TextContainer text="Servicios" fontSize={22} fontBold textAlign="center" />
        </Container>
        <Container style={{ position: 'absolute', right: 0 }}>
          <Touchable onPress={onClose} rounded marginHorizontal={16}>
            <AntDesign name="close" size={28} color="black" />
          </Touchable>
        </Container>
      </Container>
      <Container>
        <Image
          source={ICONN_SERVICE_PAYMENT_GENERAL_INFO}
          resizeMethod="resize"
          resizeMode="cover"
          style={{ height: moderateScale(200), width: moderateScale(380), marginTop: 16 }}
        />
      </Container>
      <Container style={{ marginHorizontal: 16, marginTop: 24 }}>
        <TextContainer
          typography="paragraph"
          text={'Agrega tus servicios una sola vez para agilizar\ntus pagos al escanear el código QR en la tienda.'}
          numberOfLines={2}
        />
      </Container>
      <Container style={{ width: '100%', height: 4, marginTop: 24 }} backgroundColor={theme.brandColor.iconn_warm_grey} />
      <Container style={{ marginHorizontal: 16, marginTop: 16 }}>
        <TextContainer text="Beneficios" typography="h5" fontBold />
        <TextContainer text="1. ¿Perdiste tu recibo? ¡No importa!" typography="h5" fontBold marginTop={16} />
        <TextContainer text="Ya no tienes que llevar recibos impresos." marginTop={4} />
        <TextContainer text="2. Ahorra tiempo" typography="h5" fontBold marginTop={16} />
        <TextContainer text={'Agiliza tus pagos al escanear el código QR en\ncaja y listo.'} marginTop={4} numberOfLines={2} />
        <TextContainer text="3. Paga a tiempo" typography="h5" fontBold marginTop={16} />
        <TextContainer text="Recibe recordatorios de pago por siempre." marginTop={4} />
      </Container>
    </SafeArea>
  );
};

export default ServicePaymentGeneralInfoScreen;
