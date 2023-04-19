import { Button, Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LitresPromoInterface } from 'rtk/types/accumulate.types';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  promo: LitresPromoInterface;
}

const PromoDetailScreen: React.FC<Props> = ({ promo }) => {
  const insets = useSafeAreaInsets();
  const availableLitres = 10;
  const leftLitres = availableLitres - promo.costLitres;

  return (
    <ScrollView
      style={{ backgroundColor: theme.brandColor.iconn_white }}
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Image source={promo.picture} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width }} />
      <Container flex space="between">
        <Container>
          <TextContainer
            text={`Cambia tus litros acumulados por un cupón que podrás canjear en tiendas 7-Eleven por ${promo.name}`}
            fontSize={14}
            marginHorizontal={16}
            marginTop={24}
          />
          <TextContainer text="Muestra el cupón a la hora de tu compra." marginTop={24} marginHorizontal={16} fontSize={14} />
        </Container>
        <TextContainer
          text={`Cupón no reutilizable. Válido hasta el ${promo.expiry}. Sujeto a disponibilidad o hasta agotar existencias.`}
          fontSize={12}
          marginHorizontal={16}
          marginTop={24}
        />
        <Container>
          <Container backgroundColor={theme.brandColor.iconn_grey_background} width={Dimensions.get('window').width} height={2} />
          <Container row space="between" style={{ marginHorizontal: 16, marginBottom: 8, marginTop: 16 }}>
            <TextContainer text="Canjear por:" fontBold fontWeight="800" fontSize={14} />
            <TextContainer text={`${promo.costLitres} litros`} fontBold fontWeight="800" fontSize={14} marginLeft={16} />
          </Container>
          <Container row space="between" style={{ marginHorizontal: 16 }}>
            <Container center row>
              <AntDesign
                name={leftLitres >= 0 ? 'checkcircle' : 'closecircle'}
                color={leftLitres >= 0 ? theme.brandColor.iconn_green_original : theme.brandColor.iconn_red_original}
                size={15}
              />
              <TextContainer text="Litros disponibles:" fontSize={12} marginLeft={4} />
            </Container>
            <TextContainer
              text={`${availableLitres} litros`}
              fontSize={12}
              textColor={leftLitres >= 0 ? theme.fontColor.paragraph : theme.brandColor.iconn_red_original}
            />
          </Container>
          <Button round onPress={() => {}} style={{ marginHorizontal: 16, marginTop: 20, marginBottom: 20 }}>
            Canjear y activar cupón
          </Button>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default PromoDetailScreen;
