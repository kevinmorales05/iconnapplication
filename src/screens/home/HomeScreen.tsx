import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Touchable, ShippingDropdown, AnimatedCarousel, TextContainer, TouchableText } from 'components';
import Icon from 'react-native-vector-icons/AntDesign';
import { Address, CarouselItem, RootState, useAppSelector } from 'rtk';
import { ICONN_STO, ICONN_SCOOT } from 'assets/images';

import { ShippingMode } from 'components/organisms/ShippingDropdown/ShippingDropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onPressShopCart: () => void;
  onPressInvoice: () => void;
  onPressShowAddressesModal: () => void;
  onPressAddNewAddress: () => void;
  onPressProducts: () => void;
  name?: string;
  defaultAddress: Address;
  showShippingDropDown?: boolean;
  principalItems: CarouselItem[];
  homeOptions: CarouselItem[];
  secondItems: CarouselItem[];
  dayPromotionItems: CarouselItem[];
  allPromotionsItems: CarouselItem[];
  onPressCarouselItem: (CarouselItem: CarouselItem) => void;
}

const HomeScreen: React.FC<Props> = ({
  onPressShopCart,
  onPressInvoice,
  onPressShowAddressesModal,
  onPressAddNewAddress,
  name,
  defaultAddress,
  onPressProducts,
  showShippingDropDown,
  principalItems,
  homeOptions,
  secondItems,
  dayPromotionItems,
  allPromotionsItems,
  onPressCarouselItem
}) => {
  const [toggle, setToggle] = useState(showShippingDropDown);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setToggle(showShippingDropDown);
  }, [showShippingDropDown]);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const [mode, setMode] = useState<null | ShippingMode>(null);

  return (
    <View style={{ position: 'absolute', width: '100%', display: 'flex', alignItems: 'center', height: '100%', backgroundColor: theme.brandColor.iconn_white }}>
      <View style={{ zIndex: 0, width: '100%' }}>
        <Touchable
          onPress={() => {
            setToggle(current => {
              return !current;
            });
          }}
        >
          <Container style={{ paddingVertical: 20, paddingHorizontal: 10, display: 'flex', justifyContent: 'space-between' }} row>
            {mode === null && <CustomText text={'¿Cómo quieres recibir tus productos?'} fontBold />}
            {defaultSeller && mode === ShippingMode.PICKUP && (
              <Container style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.image} source={ICONN_STO} />
                <CustomText fontSize={16} text={'Tienda: '} fontBold />
                <Container>
                  <CustomText text={defaultSeller.Tienda as string} fontSize={16} fontBold underline textColor={theme.brandColor.iconn_green_original} />
                </Container>
              </Container>
            )}
            {mode === ShippingMode.DELIVERY && (
              <Container style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.image} source={ICONN_SCOOT} />
                <CustomText fontSize={16} text={'A domicilio: '} fontBold />
                <Container>
                  {defaultAddress ? (
                    <CustomText text={`${defaultAddress.addressName} - ${defaultAddress.city}, ${defaultAddress.street}`} fontSize={16} />
                  ) : (
                    <CustomText text={`Agrega dirección`} fontSize={16} />
                  )}
                </Container>
              </Container>
            )}
            {toggle ? <Icon name="up" size={18} color={theme.fontColor.dark_grey} /> : <Icon name="down" size={18} color={theme.fontColor.dark_grey} />}
          </Container>
        </Touchable>
      </View>

      <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Container>
          <Container>
            <AnimatedCarousel items={principalItems} onPressItem={onPressCarouselItem} />
          </Container>
          <Container style={{ marginTop: 16 }}>
            <AnimatedCarousel items={homeOptions} onPressItem={onPressCarouselItem} />
          </Container>
          <Container style={{ marginTop: 16 }}>
            <AnimatedCarousel items={secondItems} onPressItem={onPressCarouselItem} />
          </Container>
          <Container height={342} style={{ marginTop: 16 }} backgroundColor={theme.brandColor.iconn_background}>
            <Container row space="between" style={{ margin: 16 }}>
              <TextContainer text="Recomendados para ti" fontBold typography="h4" />
              <TouchableText underline textColor={theme.brandColor.iconn_accent_principal} text="Ver todo" typography="h5" fontBold onPress={() => {}} />
            </Container>
          </Container>
          <Container style={{ marginTop: 16 }}>
            <TextContainer text="Promoción del día" marginLeft={16} fontBold typography="h4" />
            <AnimatedCarousel items={dayPromotionItems} onPressItem={onPressCarouselItem} />
          </Container>
          <Container height={342} style={{ marginTop: 16 }} backgroundColor={theme.brandColor.iconn_background}>
            <Container row space="between" style={{ margin: 16 }}>
              <TextContainer text={`Otros productos`} fontBold typography="h4" />
              <TouchableText underline textColor={theme.brandColor.iconn_accent_principal} text="Ver todo" typography="h5" fontBold onPress={() => {}} />
            </Container>
          </Container>
          <Container style={{ marginTop: 16, marginBottom: 16 }}>
            <TextContainer text="Promociones" marginLeft={16} fontBold typography="h4" />
            <AnimatedCarousel items={allPromotionsItems} onPressItem={onPressCarouselItem} />
          </Container>
        </Container>

        <Container flex style={{ paddingHorizontal: 16 }}>
          <Button round onPress={onPressInvoice} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
            Facturación
          </Button>
          <Button round onPress={onPressShowAddressesModal} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
            Modal con direcciones
          </Button>
          <Button round onPress={onPressAddNewAddress} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
            Boton para agregar nueva direccion
          </Button>
          <Button round onPress={onPressShopCart} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
            Carrito de compras
          </Button>
          <Button round onPress={onPressProducts} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
            Pedidos
          </Button>
        </Container>
      </ScrollView>
      {toggle && <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%', zIndex: 1, position: 'absolute', top: 60 }} />}
      {toggle && (
        <View style={{ zIndex: 2, position: 'absolute', top: 60, width: '100%' }}>
          <ShippingDropdown
            mode={mode}
            handleMode={mode => {
              setMode(mode);
            }}
            onPressAddAddress={onPressAddNewAddress}
            onPressShowAddressesModal={onPressShowAddressesModal}
            address={defaultAddress}
            onPressToogle={() => setToggle(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: 24, height: 24, marginRight: 3 }
});

export default HomeScreen;
