import { ICONN_ESTAFETA_EXAMPLE, ICONN_ESTAFETA_HELP } from 'assets/images';
import { Container } from 'components/atoms';
import { TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PackageHelpScreen: React.FC = () => {
  return (
    <ScrollView style={{ backgroundColor: theme.brandColor.iconn_white }}>
      <Image source={ICONN_ESTAFETA_HELP} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width }} />
      <TextContainer text="Rastrea hasta 10 paquetes Estafeta al mismo tiempo." fontSize={14} marginHorizontal={25} marginTop={24} />
      <Container height={4} backgroundColor={theme.brandColor.iconn_warm_grey} style={{ marginTop: 24 }} />
      <TextContainer text="¿CÓMO FUNCIONA?" fontSize={12} textColor={theme.fontColor.placeholder} marginTop={16} marginLeft={25} />
      <Container row style={{ marginBottom: 16, marginTop: 16, marginRight: 80 }}>
        <TextContainer text="1." fontBold fontSize={14} marginLeft={25} />
        <TextContainer text="Ten a la mano tu código de rastreo de 10 dígitos o número de guía de 22." fontSize={14} marginLeft={4} />
      </Container>
      <Container row style={{ marginBottom: 16, marginRight: 80 }}>
        <TextContainer text="2." fontBold fontSize={14} marginLeft={25} />
        <TextContainer text="Ingresa tu código de rastreo o número de guía y seleccioa RASTREAR." fontSize={14} marginLeft={4} />
      </Container>
      <Container row style={{ marginBottom: 16, marginRight: 80 }}>
        <TextContainer text="3." fontBold fontSize={14} marginLeft={25} />
        <TextContainer text="Verifica el Estatus de tu envío: “Entregado” o “En tránsito”." fontSize={14} marginLeft={4} />
      </Container>
      <Container row style={{ marginBottom: 16, marginRight: 80 }}>
        <TextContainer text="4." fontBold fontSize={14} marginLeft={25} />
        <TextContainer
          text="Si se encuentra “En tránsito”, selecciónalo  para conocer la ubicación y último movimiento de tu envío."
          fontSize={14}
          marginLeft={4}
        />
      </Container>
      <Container height={4} backgroundColor={theme.brandColor.iconn_warm_grey} style={{ marginTop: 24 }} />
      <TextContainer text="¿DÓNDE ESTÁ EL NÚMERO DE GUÍA?" fontSize={12} textColor={theme.fontColor.placeholder} marginTop={16} marginLeft={25} />
      <TextContainer
        text="Escribe o escanea el código de rastreo o número de guía. Aparecen marcados en rojo en la imagen de referencia:"
        fontSize={14}
        marginLeft={25}
        marginRight={35}
        marginTop={24}
      />
      <Image source={ICONN_ESTAFETA_EXAMPLE} style={{ height: 326, width: 240, marginHorizontal: 60, marginTop: 8, marginBottom: 10 }} />
    </ScrollView>
  );
};
export default PackageHelpScreen;
