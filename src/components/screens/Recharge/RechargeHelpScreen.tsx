import { ICONN_HELP_RECHARGE } from 'assets/images';
import { Container } from 'components/atoms';
import { TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const RechargeHelpScreen: React.FC = () => {
  return (
    <ScrollView style={{ backgroundColor: theme.brandColor.iconn_white }}>
      <Image source={ICONN_HELP_RECHARGE} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width }} />
      <TextContainer text="Agiliza tu transacción al mostrar el código QR directo en caja." fontSize={14} marginHorizontal={16} marginVertical={24} />
      <Container backgroundColor={theme.brandColor.iconn_background} height={4} />
      <TextContainer text="Cómo funciona" fontBold fontSize={14} marginVertical={16} marginLeft={32} />
      <Container row style={{ marginBottom: 16 }}>
        <TextContainer text="1." fontBold fontSize={14} marginLeft={32} />
        <TextContainer text=" Selecciona el tipo de proveedor" fontSize={14} />
      </Container>
      <Container row style={{ marginBottom: 16 }}>
        <TextContainer text="2." fontBold fontSize={14} marginLeft={32} />
        <TextContainer text=" Selecciona el monto" fontSize={14} />
      </Container>
      <Container row style={{ marginBottom: 16 }}>
        <TextContainer text="3." fontBold fontSize={14} marginLeft={32} />
        <TextContainer text=" Muestra el código QR en caja." fontSize={14} />
      </Container>
      <TextContainer text="El QR se quedará guardado para futuras recargas del monto que desees." fontSize={14} marginHorizontal={16} marginVertical={24} />
    </ScrollView>
  );
};

export default RechargeHelpScreen;
