import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import theme from 'components/theme/theme';
import { CustomText, Container, Touchable, ShippingDropdown, AnimatedCarousel, TextContainer, TouchableText, SearchBar } from 'components';
import Icon from 'react-native-vector-icons/AntDesign';
import { Address, CarouselItem, RootState, useAppSelector, ProductInterface } from 'rtk';
import { ICONN_STO, ICONN_SCOOT } from 'assets/images';
import { ShippingMode } from 'components/organisms/ShippingDropdown/ShippingDropdown';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { CounterType } from 'components/types/counter-type';

interface Props {
  onPressShowAddressesModal: () => void;
  onPressAddNewAddress: () => void;
  defaultAddress: Address;
  showShippingDropDown?: boolean;
  principalItems: CarouselItem[];
  homeOptions: CarouselItem[];
  secondItems: CarouselItem[];
  dayPromotionItems: CarouselItem[];
  allPromotionsItems: CarouselItem[];
  onPressCarouselItem: (CarouselItem: CarouselItem) => void;
  homeProducts: ProductInterface[];
  homeOtherProducts: ProductInterface[];
  updateShoppingCartProduct: (type: CounterType, productId: string) => void;
}

const HomeScreen: React.FC<Props> = ({
  onPressSearch,
  onPressShowAddressesModal,
  onPressAddNewAddress,
  defaultAddress,
  showShippingDropDown,
  principalItems,
  homeOptions,
  secondItems,
  dayPromotionItems,
  allPromotionsItems,
  onPressCarouselItem,
  homeProducts,
  homeOtherProducts,
  updateShoppingCartProduct
}) => {
  const [toggle, setToggle] = useState(showShippingDropDown);
  const [visible, setVisible] = useState<boolean>(false);

  const onPressOut = () => {
    setVisible(!visible);
  };

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
          <Container
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              display: 'flex',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: theme.brandColor.iconn_light_grey
            }}
            row
          >
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
        <Container style={{ marginHorizontal: 16, marginTop: 10 }}>
          <SearchBar isButton onPressSearch={onPressSearch} onChangeTextSearch={() => {}} placeHolderText={'Busca en 7-Eleven'} />
        </Container>

        <Container>
          <Container style={{ marginTop: 16 }}>
            <AnimatedCarousel items={principalItems} onPressItem={onPressCarouselItem} onPressOut={onPressOut} />
          </Container>
          <Container style={{ marginTop: 16 }}>
            <AnimatedCarousel items={homeOptions} onPressItem={onPressCarouselItem} onPressOut={onPressOut} />
          </Container>
          <Container style={{ marginTop: 16 }}>
            <AnimatedCarousel items={secondItems} onPressItem={onPressCarouselItem} onPressOut={onPressOut} />
          </Container>
          <Container height={342} style={{ marginTop: 16 }} backgroundColor={theme.brandColor.iconn_background}>
            <Container row space="between" style={{ margin: 16 }}>
              <TextContainer text="Recomendados para ti" fontBold typography="h4" />
              <TouchableText underline textColor={theme.brandColor.iconn_accent_principal} text="Ver todo" typography="h5" fontBold onPress={() => {}} />
            </Container>
            <AnimatedCarousel products={homeProducts} onPressItem={onPressCarouselItem} onPressProduct={updateShoppingCartProduct} onPressOut={onPressOut} />
          </Container>
          <Container style={{ marginTop: 16 }}>
            <TextContainer text="Promoción del día" marginLeft={16} fontBold typography="h4" />
            <AnimatedCarousel items={dayPromotionItems} onPressItem={onPressCarouselItem} onPressOut={onPressOut} />
          </Container>
          <Container height={342} style={{ marginTop: 16 }} backgroundColor={theme.brandColor.iconn_background}>
            <Container row space="between" style={{ margin: 16 }}>
              <TextContainer text={`Otros productos`} fontBold typography="h4" />
              <TouchableText underline textColor={theme.brandColor.iconn_accent_principal} text="Ver todo" typography="h5" fontBold onPress={() => {}} />
            </Container>
            <AnimatedCarousel
              products={homeOtherProducts}
              onPressItem={onPressCarouselItem}
              onPressProduct={updateShoppingCartProduct}
              onPressOut={onPressOut}
            />
          </Container>
          <Container style={{ marginTop: 16, marginBottom: 16 }}>
            <TextContainer text="Promociones" marginLeft={16} fontBold typography="h4" />
            <AnimatedCarousel items={allPromotionsItems} onPressItem={onPressCarouselItem} onPressOut={onPressOut} />
          </Container>
        </Container>
        <AdultAgeVerificationScreen onPressClose={onPressOut} visible={visible} />
      </ScrollView>
      {toggle && <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%', zIndex: 1, position: 'absolute', top: 35 }} />}
      {toggle && (
        <View style={{ zIndex: 2, position: 'absolute', top: 35, width: '100%' }}>
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
