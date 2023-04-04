import { ICONN_ACCUMULATE_COFFEE, ICONN_ACCUMULATE_COFFEE_FILL, ICONN_ACCUMULATE_COFFEE_TRANSPARENT } from 'assets/images';
import { Container, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MoreDetailModal from './moreDetail/MoreDetailModal';

interface Props {
  userId: string;
  coffees: number;
  onPressQR: () => void;
  onPressOpen: () => void;
  onPressClose: () => void;
  modalVisible: boolean;
}

const AccumulateCoffeeScreen: React.FC<Props> = ({ userId, coffees, onPressQR, onPressClose, onPressOpen, modalVisible }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: theme.brandColor.iconn_white }}
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Container row backgroundColor={theme.brandColor.iconn_background}>
          <Image source={ICONN_ACCUMULATE_COFFEE} style={{ height: 93, width: 105, marginLeft: -15, marginTop: 16, marginBottom: 16 }} resizeMode="contain" />
          <Container style={{ marginTop: 26, marginLeft: 16 }}>
            <TextContainer text="Por cada 6 cafés que acumules" fontSize={14} />
            <TextContainer text="¡el séptimo es gratis!" fontSize={14} fontBold marginTop={6} />
            <Touchable onPress={onPressOpen}>
              <TextContainer text="Más detalles" fontSize={14} fontBold marginTop={16} underline textColor={theme.brandColor.iconn_green_original} />
            </Touchable>
          </Container>
        </Container>
        {coffees === 6 ? (
          <>
            <Container>
              <TextContainer text="¡Desbloqueaste tu café gratis!" fontBold fontSize={18} textAlign={'center'} />
              <TextContainer
                text="Escanea este código en tienda para obtener tu café de cualquier tamaño y variedad."
                fontSize={14}
                textAlign={'center'}
                marginTop={4}
                marginHorizontal={32}
              />
              <Container center style={{ marginTop: 16 }}>
                <QRCode value={userId} size={192} />
              </Container>
            </Container>
            <Container>
              <TextContainer text="7° café gratis" fontBold fontSize={18} marginTop={16} textAlign="center" />
            </Container>
            <Container>
              <TextContainer
                text="Al canjear tu café gratis, se reiniciará el contador para que puedas volver a acumular cafés."
                fontSize={12}
                textAlign={'center'}
                marginTop={4}
                marginHorizontal={32}
                marginBottom={60}
              />
            </Container>
          </>
        ) : (
          <>
            <Container>
              <TextContainer text="Escanea este código en tienda" fontBold fontSize={18} textAlign={'center'} />
              <TextContainer text="cada vez que compres un café" fontSize={14} textAlign={'center'} marginTop={4} />
              <Touchable onPress={onPressQR}>
                <Container center style={{ marginTop: 16 }}>
                  <QRCode value={userId} size={192} />
                </Container>
              </Touchable>
            </Container>
            <Container>
              <TextContainer text="Cafés acumulados:" fontSize={14} marginTop={16} textAlign="center" />
              <TextContainer text={`${coffees} de 6`} fontBold fontSize={18} marginTop={16} textAlign="center" />
            </Container>
            <Container center style={{ marginTop: 16, marginBottom: 50, marginLeft: 8 }}>
              {coffees === 0 ? (
                <Container row center>
                  {Array(6).fill(<Image source={ICONN_ACCUMULATE_COFFEE_TRANSPARENT} style={{ height: 70, width: 44, marginRight: 8 }} />)}
                </Container>
              ) : (
                <Container row>
                  {Array(coffees).fill(<Image source={ICONN_ACCUMULATE_COFFEE_FILL} style={{ height: 70, width: 44, marginRight: 8 }} />)}
                  {Array(6 - coffees).fill(<Image source={ICONN_ACCUMULATE_COFFEE_TRANSPARENT} style={{ height: 70, width: 44, marginRight: 8 }} />)}
                </Container>
              )}
            </Container>
          </>
        )}
      </Container>
      <MoreDetailModal visible={modalVisible} onPressClose={onPressClose} />
    </ScrollView>
  );
};

export default AccumulateCoffeeScreen;
