import React, { Ref, useState } from 'react';
import { Button, TextContainer } from '../../molecules';
import { Container, Touchable } from 'components/atoms';
import {
  ICONN_BRANCHES_ARROW_DOWN,
  ICONN_BRANCHES_ARROW_UP,
  ICONN_BRANCHES_BINOMIAL,
  ICONN_BRANCHES_ICON_7ELEVEN,
  ICONN_BRANCHES_ICON_APPLEPAY,
  ICONN_BRANCHES_ICON_ARRIVE,
  ICONN_BRANCHES_ICON_ATM,
  ICONN_BRANCHES_ICON_BOTTLE_GLASS,
  ICONN_BRANCHES_ICON_BREAD,
  ICONN_BRANCHES_ICON_CARDS,
  ICONN_BRANCHES_ICON_CARNET,
  ICONN_BRANCHES_ICON_CARWASH,
  ICONN_BRANCHES_ICON_CASH,
  ICONN_BRANCHES_ICON_CINEMA,
  ICONN_BRANCHES_ICON_CONTACTLESS,
  ICONN_BRANCHES_ICON_CUTLERY,
  ICONN_BRANCHES_ICON_DRIVE_THRU,
  ICONN_BRANCHES_ICON_EDENRED,
  ICONN_BRANCHES_ICON_GAS,
  ICONN_BRANCHES_ICON_GAS_CAN,
  ICONN_BRANCHES_ICON_PIZZA,
  ICONN_BRANCHES_ICON_POKEMON,
  ICONN_BRANCHES_ICON_RESTROOM,
  ICONN_BRANCHES_ICON_SIVALE,
  ICONN_BRANCHES_ICON_TACO,
  ICONN_BRANCHES_ICON_TRUCK,
  ICONN_BRANCHES_ICON_WIFI,
  ICONN_BRANCHES_LOCATION_PIN,
  ICONN_BRANCHES_PETRO,
  ICONN_BRANCHES_SEVEN,
  ICONN_ERROR_CROSS
} from 'assets/images';
import { AnimatedCarouselWithBorder } from '../AnimatedCarouselWithBorder';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'react-native';
import { PointInterface, TabItem } from 'rtk';
import { TabTwoElements } from '../TabTwoElements';
import Octicons from 'react-native-vector-icons/Octicons';
import theme from 'components/theme/theme';

interface Props {
  bottomSheetRef: Ref<BottomSheetModal>;
  marker: PointInterface;
  onPressHowToGet: () => void;
  onPressShowLess: () => void;
  onPressShowMore: () => void;
  onPressTab: (item: TabItem) => void;
  snapPoints: any[];
  tabSelected: number;
}

const PointDetailSheet: React.FC<Props> = ({
  bottomSheetRef,
  marker,
  onPressHowToGet,
  onPressShowLess,
  onPressShowMore,
  onPressTab,
  snapPoints,
  tabSelected
}) => {
  const [pointDetailVisible, setPointDetailVisible] = useState(false);

  const getSevenOtherItems = () => {
    if (marker.info.seven.others) {
      const nArr: any[] = marker.info.seven.others.map(other => {
        if (other.isActive) {
          return {
            icon:
              other.type === 'atm'
                ? ICONN_BRANCHES_ICON_ATM
                : other.type === 'wifi'
                ? ICONN_BRANCHES_ICON_WIFI
                : other.type === 'gas'
                ? ICONN_BRANCHES_ICON_GAS
                : other.type === 'drive-thru'
                ? ICONN_BRANCHES_ICON_DRIVE_THRU
                : ICONN_ERROR_CROSS,
            serviceName: other.slug,
            onPressItem: () => {}
          };
        }
      });
      const nArrFiltered = nArr.filter(other => {
        if (other) {
          return other;
        }
      });
      return nArrFiltered;
    }
  };

  const getPetroOtherItems = () => {
    if (marker.info.petro.others) {
      const nArr: any[] = marker.info.petro.others.map(other => {
        if (other.isActive) {
          return {
            icon:
              other.type === 'restroom'
                ? ICONN_BRANCHES_ICON_RESTROOM
                : other.type === 'parking'
                ? ICONN_BRANCHES_ICON_TRUCK
                : other.type === '7eleven'
                ? ICONN_BRANCHES_ICON_7ELEVEN
                : ICONN_ERROR_CROSS,
            serviceName: other.slug,
            onPressItem: () => {}
          };
        }
      });
      const nArrFiltered = nArr.filter(other => {
        if (other) {
          return other;
        }
      });
      return nArrFiltered;
    }
  };

  const getPetroPayMethods = () => {
    if (marker.info.petro.payMethods) {
      const nArr: any[] = marker.info.petro.payMethods.map(pm => {
        if (pm.isActive) {
          return {
            icon:
              pm.type === 'dollars'
                ? ICONN_BRANCHES_ICON_CASH
                : pm.type === 'cards'
                ? ICONN_BRANCHES_ICON_CARDS
                : pm.type === 'applePay'
                ? ICONN_BRANCHES_ICON_APPLEPAY
                : pm.type === 'contacLess'
                ? ICONN_BRANCHES_ICON_CONTACTLESS
                : ICONN_ERROR_CROSS,
            serviceName: pm.slug,
            onPressItem: () => {}
          };
        }
      });
      const nArrFiltered = nArr.filter(pm => {
        if (pm) {
          return pm;
        }
      });
      return nArrFiltered;
    }
  };

  const getPetroEvouchers = () => {
    if (marker.info.petro.evouchers) {
      const nArr: any[] = marker.info.petro.evouchers.map(e => {
        if (e.isActive) {
          return {
            icon:
              e.type === 'carnet'
                ? ICONN_BRANCHES_ICON_CARNET
                : e.type === 'edenred'
                ? ICONN_BRANCHES_ICON_EDENRED
                : e.type === 'sivale'
                ? ICONN_BRANCHES_ICON_SIVALE
                : ICONN_ERROR_CROSS,
            serviceName: e.slug,
            onPressItem: () => {}
          };
        }
      });
      const nArrFiltered = nArr.filter(e => {
        if (e) {
          return e;
        }
      });
      return nArrFiltered;
    }
  };

  return (
    <BottomSheetModal
      backgroundStyle={{ borderRadius: 0, backgroundColor: theme.brandColor.iconn_white }}
      enablePanDownToClose={true}
      handleComponent={null}
      onChange={i => {
        if (i === 1) {
          setPointDetailVisible(true);
        } else {
          setPointDetailVisible(false);
        }
      }}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      stackBehavior="push"
    >
      {pointDetailVisible && (
        <Container row space="between" style={{ marginHorizontal: 16, height: 25 }} middle>
          <Octicons name="share-android" size={theme.iconSize.small} color={theme.brandColor.iconn_dark_grey} />
          <Container row>
            <Touchable onPress={onPressShowLess}>
              <Container row middle>
                <TextContainer
                  fontBold
                  marginRight={8}
                  text="Mostrar menos"
                  textAlign="center"
                  textColor={theme.brandColor.iconn_green_original}
                  typography="h5"
                  underline
                />
                <Image resizeMode="contain" source={ICONN_BRANCHES_ARROW_DOWN} style={{ width: 25, height: 25 }} />
              </Container>
            </Touchable>
          </Container>
        </Container>
      )}

      <BottomSheetScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Container style={{ marginHorizontal: 10, marginTop: !pointDetailVisible ? 25 : 0 }}>
          <Image
            resizeMode="contain"
            source={
              marker
                ? marker.type === 'binomial'
                  ? ICONN_BRANCHES_BINOMIAL
                  : marker.type === 'petro'
                  ? ICONN_BRANCHES_PETRO
                  : ICONN_BRANCHES_SEVEN
                : undefined
            }
            style={{
              width: marker ? (marker.type === 'binomial' ? 240 : marker.type === 'petro' ? 120 : 120) : undefined,
              height: marker ? 40 : undefined
            }}
          />
        </Container>

        <Container flex space="between" style={{ paddingVertical: 0 }}>
          <Container>
            {marker && marker.type === 'binomial' && (
              <>
                <Container style={{ paddingHorizontal: 16, marginTop: 24 }}>
                  <TextContainer text={`TIENDA DE CONVENIENCIA #${marker.shopNumber}`} fontBold textColor={theme.fontColor.placeholder} />
                  <TextContainer text={`ESTACIÓN DE SERVICIO #${marker.info.petro.CC}`} fontBold textColor={theme.fontColor.placeholder} />
                </Container>
              </>
            )}

            {marker && marker.type === 'petro' && (
              <>
                <Container style={{ paddingHorizontal: 16, marginTop: 24 }}>
                  <TextContainer text={`ESTACIÓN DE SERVICIO #${marker.info.petro.CC}`} fontBold textColor={theme.fontColor.placeholder} />
                </Container>
              </>
            )}

            {marker && marker.type === '7eleven' && (
              <>
                <Container style={{ paddingHorizontal: 16, marginTop: 24 }}>
                  <TextContainer text={`TIENDA DE CONVENIENCIA #${marker.shopNumber}`} fontBold textColor={theme.fontColor.placeholder} />
                </Container>
              </>
            )}

            <Container row style={{ paddingRight: 42, marginHorizontal: 16, marginTop: 16, height: 76 }}>
              <Image resizeMode="contain" source={ICONN_BRANCHES_LOCATION_PIN} style={{ width: 25, height: 25 }} />
              <TextContainer text={marker?.address} numberOfLines={4} marginLeft={4} />
            </Container>
            {!pointDetailVisible && (
              <Container row alignment="end" style={{ marginTop: 16, marginHorizontal: 16 }}>
                <Touchable onPress={onPressShowMore}>
                  <Container row middle>
                    <TextContainer
                      fontBold
                      marginRight={8}
                      text="Mostrar más"
                      textAlign="center"
                      textColor={theme.brandColor.iconn_green_original}
                      typography="h5"
                      underline
                    />
                    <Image resizeMode="contain" source={ICONN_BRANCHES_ARROW_UP} style={{ width: 25, height: 25 }} />
                  </Container>
                </Touchable>
              </Container>
            )}

            {pointDetailVisible && (
              <Container width="100%" backgroundColor={theme.brandColor.iconn_white} style={{ marginTop: 16 }}>
                <TabTwoElements
                  items={
                    marker.type === 'binomial'
                      ? ([
                          { id: 1, name: 'Servicios 7-Eleven' },
                          { id: 2, name: 'Servicios Petro Seven' }
                        ] as unknown as TabItem[])
                      : marker.type === '7eleven'
                      ? ([
                          { id: 1, name: 'Servicios 7-Eleven' },
                          { id: -1, name: '' }
                        ] as unknown as TabItem[])
                      : ([
                          { id: 1, name: 'Servicios Petro Seven' },
                          { id: -1, name: '' }
                        ] as unknown as TabItem[])
                  }
                  onPressItem={onPressTab}
                  idSelected={tabSelected}
                />

                {/* STARTS SEVEN */}

                {((marker && marker.type === '7eleven') || (marker && marker.type === 'binomial' && tabSelected === 1)) && (
                  <>
                    {marker.info.seven.food && (
                      <Container style={{ marginHorizontal: 16, marginTop: 16 }}>
                        <TextContainer text="Comida" fontBold typography="h5" />
                        {marker.info.seven.food.map((food, i) => {
                          if (food.isActive) {
                            return (
                              <Container key={i} row style={{ marginTop: 16 }} center>
                                <Image
                                  resizeMode="contain"
                                  source={
                                    food.type === 'foodArea'
                                      ? ICONN_BRANCHES_ICON_CUTLERY
                                      : food.type === 'bakeInStore'
                                      ? ICONN_BRANCHES_ICON_BREAD
                                      : food.type === 'Pizza/Turbochef'
                                      ? ICONN_BRANCHES_ICON_PIZZA
                                      : food.type === 'Taquiza'
                                      ? ICONN_BRANCHES_ICON_TACO
                                      : ICONN_ERROR_CROSS
                                  }
                                  style={{ width: 25, height: 25, left: -4 }}
                                />
                                <TextContainer text={food.slug} numberOfLines={1} marginLeft={0} />
                              </Container>
                            );
                          }
                        })}
                      </Container>
                    )}

                    <Container>
                      <TextContainer text="Otros" fontBold fontSize={16} marginTop={24} marginBottom={16} marginLeft={16} />
                      <Container style={{ paddingHorizontal: 10, alignItems: 'flex-start' }}>
                        <AnimatedCarouselWithBorder
                          items={getSevenOtherItems()}
                          style={{ backgroundColor: theme.brandColor.iconn_background, height: 112, paddingBottom: 22, paddingTop: 22 }}
                        />
                      </Container>
                    </Container>

                    {marker.info.seven.extra && (
                      <Container style={{ marginHorizontal: 16, marginTop: 16 }}>
                        <TextContainer text="Extra" fontBold typography="h5" />
                        {marker.info.seven.extra.map((extra, i) => {
                          if (extra.isActive) {
                            return (
                              <Container key={i} row style={{ marginVertical: 16 }} center>
                                <TextContainer text={extra.slug} numberOfLines={1} marginLeft={0} />
                                <Image
                                  resizeMode="contain"
                                  source={extra.type === 'pokemon' ? ICONN_BRANCHES_ICON_POKEMON : ICONN_ERROR_CROSS}
                                  style={{ width: 105, height: 24, right: -4 }}
                                />
                              </Container>
                            );
                          }
                        })}
                      </Container>
                    )}
                  </>
                )}

                {/* STARTS PETRO */}

                {((marker && marker.type === 'petro') || (marker && marker.type === 'binomial' && tabSelected === 2)) && (
                  <>
                    {marker.info.petro.complementaryProducts && (
                      <Container style={{ marginHorizontal: 16, marginTop: 16 }}>
                        <TextContainer text="Productos complementarios" fontBold typography="h5" />
                        {marker.info.petro.complementaryProducts.map((product, i) => {
                          if (product.isActive) {
                            return (
                              <Container key={i} row style={{ marginTop: 16 }} center>
                                <Image
                                  resizeMode="contain"
                                  source={
                                    product.type === 'oil'
                                      ? ICONN_BRANCHES_ICON_GAS_CAN
                                      : product.type === 'urea'
                                      ? ICONN_BRANCHES_ICON_BOTTLE_GLASS
                                      : ICONN_ERROR_CROSS
                                  }
                                  style={{ width: 25, height: 25, left: -4 }}
                                />
                                <TextContainer text={product.slug} numberOfLines={1} marginLeft={0} />
                              </Container>
                            );
                          }
                        })}
                      </Container>
                    )}

                    {marker.info.petro.others && (
                      <Container>
                        <TextContainer text="Otros" fontBold fontSize={16} marginTop={24} marginBottom={16} marginLeft={16} />
                        <Container style={{ paddingHorizontal: 10, alignItems: 'flex-start' }}>
                          <AnimatedCarouselWithBorder
                            items={getPetroOtherItems()}
                            style={{ backgroundColor: theme.brandColor.iconn_background, height: 112, paddingBottom: 22, paddingTop: 22 }}
                          />
                        </Container>
                      </Container>
                    )}

                    {marker.info.petro.payMethods && (
                      <Container>
                        <TextContainer text="Formas de pago" fontBold fontSize={16} marginTop={24} marginBottom={16} marginLeft={16} />
                        <Container style={{ paddingHorizontal: 10, alignItems: 'flex-start' }}>
                          <AnimatedCarouselWithBorder
                            items={getPetroPayMethods()}
                            style={{ backgroundColor: theme.brandColor.iconn_background, height: 112, paddingBottom: 22, paddingTop: 22 }}
                          />
                        </Container>
                      </Container>
                    )}

                    {marker.info.petro.evouchers && (
                      <Container>
                        <TextContainer text="Vales electrónicos de gasolina" fontBold fontSize={16} marginTop={24} marginBottom={8} marginLeft={16} />
                        <Container style={{ paddingHorizontal: 8, alignItems: 'flex-start' }}>
                          <AnimatedCarouselWithBorder
                            items={getPetroEvouchers()}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 80,
                              width: 92,
                              paddingBottom: 22,
                              paddingTop: 22,
                              marginRight: 4,
                              marginLeft: 4,
                              marginVertical: 8,
                              borderWidth: 0.16,
                              shadowOffset: { width: 1, height: 1 },
                              shadowOpacity: 0.09,
                              elevation: 5,
                              borderRadius: 0
                            }}
                            slug={false}
                            imgStyle={{ height: 70, width: 84, alignSelf: 'center' }}
                          />
                        </Container>
                      </Container>
                    )}

                    {marker.info.petro.benefits && (
                      <Container style={{ marginHorizontal: 16, marginTop: 16 }}>
                        <TextContainer text="Beneficios" fontBold typography="h5" />
                        {marker.info.petro.benefits.map((benefit, i) => {
                          if (benefit.isActive) {
                            return (
                              <Container key={i} row style={{ marginTop: 16 }} center>
                                <Image
                                  resizeMode="contain"
                                  source={
                                    benefit.type === 'cinemaOrCombos'
                                      ? ICONN_BRANCHES_ICON_CINEMA
                                      : benefit.type === 'carWashing'
                                      ? ICONN_BRANCHES_ICON_CARWASH
                                      : ICONN_ERROR_CROSS
                                  }
                                  style={{ width: 25, height: 25, left: -4 }}
                                />
                                <TextContainer text={benefit.slug} numberOfLines={1} marginLeft={0} />
                              </Container>
                            );
                          }
                        })}
                      </Container>
                    )}
                  </>
                )}
              </Container>
            )}
          </Container>

          <Container>
            <Container backgroundColor={theme.brandColor.iconn_warm_grey} style={{ height: 5, paddingHorizontal: 0, marginTop: 8 }} />

            {!pointDetailVisible && (
              <Container row space="between" style={{ marginHorizontal: 16, marginVertical: 16 }} middle>
                <Container style={{ width: '25%' }}>
                  <TextContainer text="DISTANCIA" textAlign="center" textColor={theme.fontColor.placeholder} typography="placeholder" />
                  <TextContainer fontBold text={`${marker?.kmDistance} km`} textAlign="center" typography="h5" marginTop={4} />
                </Container>
                <Container style={{ width: '25%' }} />
                <Container style={{ width: '55%' }} middle>
                  <Button length="short" round onPress={onPressHowToGet} fontSize="h4" fontBold>
                    Cómo llegar
                  </Button>
                </Container>
              </Container>
            )}

            {pointDetailVisible && (
              <Container style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <Container row>
                  <TextContainer text="DISTANCIA" textColor={theme.fontColor.placeholder} typography="placeholder" />
                  <TextContainer fontBold text={`${marker?.kmDistance} km`} typography="h5" marginLeft={8} />
                </Container>
                <Container style={{ marginVertical: 16 }}>
                  <Button
                    length="long"
                    round
                    onPress={onPressHowToGet}
                    fontSize="h4"
                    fontBold
                    rightIcon={<Image source={ICONN_BRANCHES_ICON_ARRIVE} style={{ width: 22, height: 22, left: -8 }} />}
                  >
                    Cómo llegar
                  </Button>
                </Container>
                <Container />
              </Container>
            )}
          </Container>
        </Container>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default PointDetailSheet;
