import React, { useState } from 'react';
import {
  ICONN_BRANCHES_FILTERS_BINOMIAL,
  ICONN_BRANCHES_ICON_7ELEVEN,
  ICONN_BRANCHES_ICON_ATM,
  ICONN_BRANCHES_ICON_CARNET,
  ICONN_BRANCHES_ICON_DRIVE_THRU,
  ICONN_BRANCHES_ICON_EDENRED,
  ICONN_BRANCHES_ICON_GAS,
  ICONN_BRANCHES_ICON_POKEMON,
  ICONN_BRANCHES_ICON_RESTROOM,
  ICONN_BRANCHES_ICON_SIVALE,
  ICONN_BRANCHES_ICON_TRUCK,
  ICONN_BRANCHES_ICON_WIFI,
  PETRO_LOGO,
  SEVEN_LOGO
} from 'assets/images';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TextContainer, Container, Touchable, SafeArea, Checkbox, Button } from 'components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import Icon from 'react-native-vector-icons/Entypo';
import { PointFilteringDetailInterface, RootState, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';

interface Props {
  cleanFilters: () => void;
  filterObject: PointFilteringDetailInterface;
  goBack: () => void;
  setFiltering: (key: string, value: boolean) => void;
  showResults: () => void;
}

const BranchesFiltersScreen: React.FC<Props> = ({ cleanFilters, filterObject, goBack, setFiltering, showResults }) => {
  const insets = useSafeAreaInsets();
  const [sevenToggled, setSevenToggled] = useState(true);
  const [petroToggled, setPetroToggled] = useState(true);
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={true} barStyle="dark" childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <Container style={{ marginTop: insets.top + 16 }} crossCenter>
        <Container>
          <TextContainer text="Filtrar" fontSize={22} fontBold textAlign="center" />
        </Container>
        <Container style={{ position: 'absolute', right: 0 }}>
          <Touchable
            onPress={() => {
              goBack();
              if (filterObject === undefined) {
                showResults();
              }
              logEvent('sucCloseFilters', {
                id: user.id,
                description: 'Botón de cerrar filtros'
              });
            }}
            rounded
            marginHorizontal={16}
          >
            <AntDesign name="close" size={28} color="black" />
          </Touchable>
        </Container>
      </Container>
      <Container style={{ paddingHorizontal: 16, borderTopWidth: 1, marginTop: 12, borderTopColor: theme.brandColor.iconn_light_grey }} />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <TextContainer text="Tipo de tienda" typography="h5" fontBold marginTop={16} marginHorizontal={16} />
        <Container row space="between" style={styles.containerLogos}>
          <TouchableOpacity onPress={() => setFiltering('info_seven', !filterObject?.info_seven)}>
            <Container style={filterObject?.info_seven ? styles.containerLogoSelect : styles.containerLogo}>
              <Image style={styles.image} source={SEVEN_LOGO} resizeMode={'contain'} />
            </Container>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFiltering('info_petro', !filterObject?.info_petro)}>
            <Container style={filterObject?.info_petro ? styles.containerLogoSelect : styles.containerLogo}>
              <Image style={styles.image} source={PETRO_LOGO} resizeMode={'contain'} />
            </Container>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFiltering('info_binomial', !filterObject?.info_binomial)}>
            <Container style={filterObject?.info_binomial ? styles.containerLogoSelect : styles.containerLogo}>
              <Image style={styles.image} source={ICONN_BRANCHES_FILTERS_BINOMIAL} resizeMode={'contain'} />
            </Container>
          </TouchableOpacity>
        </Container>

        {!filterObject?.info_petro && (
          <>
            <Container backgroundColor={theme.brandColor.iconn_warm_grey} style={{ height: 4, marginTop: 16 }} />
            <Touchable
              onPress={() => {
                setSevenToggled(sevenToggle => {
                  if (!sevenToggle) {
                    logEvent('sucOpenScrollFilters', {
                      id: user.id,
                      description: 'Botón de abrir filtros',
                      type: 'seven'
                    });
                  } else {
                    logEvent('sucCloseScrollFilters', {
                      id: user.id,
                      description: 'Botón de cerrar filtros',
                      type: 'seven'
                    });
                  }
                  return !sevenToggle;
                });
              }}
            >
              <Container row center space="between" style={{ marginTop: 20, marginBottom: 16, paddingHorizontal: theme.layoutSpace.medium }}>
                <TextContainer textColor={theme.fontColor.dark} typography="h5" fontBold text="Servicios 7-Eleven" />
                {sevenToggled ? (
                  <Icon name="chevron-up" size={24} color={theme.fontColor.dark_grey} />
                ) : (
                  <Icon name="chevron-down" size={24} color={theme.fontColor.dark_grey} />
                )}
              </Container>
            </Touchable>

            {sevenToggled && (
              <>
                <Container style={{ marginHorizontal: 16 }}>
                  <TextContainer text="Comida" typography="h5" fontBold />
                  <Container style={{ marginTop: 8 }}>
                    <Checkbox
                      color={filterObject?.info_seven_food_foodArea ? 'iconn_green_original' : 'iconn_med_grey'}
                      checked={filterObject?.info_seven_food_foodArea}
                      onPress={() => setFiltering('info_seven_food_foodArea', !filterObject?.info_seven_food_foodArea)}
                    >
                      Área para comer
                    </Checkbox>
                    <Checkbox
                      color={filterObject?.info_seven_food_bakeInStore ? 'iconn_green_original' : 'iconn_med_grey'}
                      checked={filterObject?.info_seven_food_bakeInStore}
                      onPress={() => setFiltering('info_seven_food_bakeInStore', !filterObject?.info_seven_food_bakeInStore)}
                    >
                      Pan recién horneado
                    </Checkbox>
                    <Checkbox
                      color={filterObject?.info_seven_food_PizzaTurbochef ? 'iconn_green_original' : 'iconn_med_grey'}
                      checked={filterObject?.info_seven_food_PizzaTurbochef}
                      onPress={() => setFiltering('info_seven_food_PizzaTurbochef', !filterObject?.info_seven_food_PizzaTurbochef)}
                    >
                      Pizza recién horneada
                    </Checkbox>
                    <Checkbox
                      color={filterObject?.info_seven_food_Taquiza ? 'iconn_green_original' : 'iconn_med_grey'}
                      checked={filterObject?.info_seven_food_Taquiza}
                      onPress={() => setFiltering('info_seven_food_Taquiza', !filterObject?.info_seven_food_Taquiza)}
                    >
                      Taquiza
                    </Checkbox>
                  </Container>
                </Container>
                <Container style={{ marginTop: 16, width: '100%' }}>
                  <TextContainer text="Otros" typography="h5" fontBold marginHorizontal={16} />
                  <Container row space="between" style={{ marginTop: 16, paddingHorizontal: 16 }}>
                    <Container width={'47%'}>
                      <TouchableOpacity onPress={() => setFiltering('info_seven_others_atm', !filterObject?.info_seven_others_atm)}>
                        <Container
                          center
                          style={
                            filterObject?.info_seven_others_atm
                              ? { ...styles.containerLogoSelect, ...styles.containerSevenOtherSelect }
                              : { ...styles.containerLogo, ...styles.containerSevenOtherSelect }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_ATM} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                          <TextContainer text={'Cajero\nautomático'} marginTop={6} typography="h5" textAlign="center" />
                        </Container>
                      </TouchableOpacity>
                    </Container>
                    <Container width={'47%'}>
                      <TouchableOpacity onPress={() => setFiltering('info_seven_others_wifi', !filterObject?.info_seven_others_wifi)}>
                        <Container
                          center
                          style={
                            filterObject?.info_seven_others_wifi
                              ? { ...styles.containerLogoSelect, ...styles.containerSevenOtherSelect }
                              : { ...styles.containerLogo, ...styles.containerSevenOtherSelect }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_WIFI} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                          <TextContainer text={'Wi-fi gratis'} marginTop={6} typography="h5" textAlign="center" />
                        </Container>
                      </TouchableOpacity>
                    </Container>
                  </Container>
                  <Container row space="between" style={{ marginTop: 16, paddingHorizontal: 16 }}>
                    <Container width={'47%'}>
                      <TouchableOpacity onPress={() => setFiltering('info_seven_others_gas', !filterObject?.info_seven_others_gas)}>
                        <Container
                          center
                          style={
                            filterObject?.info_seven_others_gas
                              ? { ...styles.containerLogoSelect, ...styles.containerSevenOtherSelect }
                              : { ...styles.containerLogo, ...styles.containerSevenOtherSelect }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_GAS} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                          <TextContainer text={'Gasolinera\nPetro seven'} marginTop={6} typography="h5" textAlign="center" />
                        </Container>
                      </TouchableOpacity>
                    </Container>
                    <Container width={'47%'}>
                      <TouchableOpacity onPress={() => setFiltering('info_seven_others_drive_thru', !filterObject?.info_seven_others_drive_thru)}>
                        <Container
                          center
                          style={
                            filterObject?.info_seven_others_drive_thru
                              ? { ...styles.containerLogoSelect, ...styles.containerSevenOtherSelect }
                              : { ...styles.containerLogo, ...styles.containerSevenOtherSelect }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_DRIVE_THRU} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                          <TextContainer text={'Drive-thru'} marginTop={6} typography="h5" textAlign="center" />
                        </Container>
                      </TouchableOpacity>
                    </Container>
                  </Container>
                </Container>

                <Container style={{ marginTop: 16, width: '100%' }}>
                  <TextContainer text="Extra" typography="h5" fontBold marginHorizontal={16} />
                  <TouchableOpacity onPress={() => setFiltering('info_seven_extra_pokemon', !filterObject?.info_seven_extra_pokemon)}>
                    <Container row style={{ paddingHorizontal: 16, marginVertical: -10 }} center alignment="start">
                      <Checkbox
                        color={filterObject?.info_seven_extra_pokemon ? 'iconn_green_original' : 'iconn_med_grey'}
                        checked={filterObject?.info_seven_extra_pokemon}
                        onPress={() => setFiltering('info_seven_extra_pokemon', !filterObject?.info_seven_extra_pokemon)}
                      >
                        Gimnasio
                      </Checkbox>
                      <Image resizeMode="contain" source={ICONN_BRANCHES_ICON_POKEMON} style={{ width: 105, marginLeft: 4 }} />
                    </Container>
                  </TouchableOpacity>
                </Container>
              </>
            )}
          </>
        )}

        {!filterObject?.info_seven && (
          <>
            <Container backgroundColor={theme.brandColor.iconn_warm_grey} style={{ height: 4, marginTop: 16 }} />
            <Touchable
              onPress={() => {
                setPetroToggled(petroToggle => {
                  if (!petroToggle) {
                    logEvent('sucOpenScrollFilters', {
                      id: user.id,
                      description: 'Botón de abrir filtros',
                      type: 'petro'
                    });
                  } else {
                    logEvent('sucCloseScrollFilters', {
                      id: user.id,
                      description: 'Botón de cerrar filtros',
                      type: 'petro'
                    });
                  }
                  return !petroToggle;
                });
              }}
            >
              <Container row center space="between" style={{ marginVertical: 20, paddingHorizontal: theme.layoutSpace.medium }}>
                <TextContainer textColor={theme.fontColor.dark} typography="h5" fontBold text="Servicios Petro Seven" />
                {petroToggled ? (
                  <Icon name="chevron-up" size={24} color={theme.fontColor.dark_grey} />
                ) : (
                  <Icon name="chevron-down" size={24} color={theme.fontColor.dark_grey} />
                )}
              </Container>
            </Touchable>

            {petroToggled && (
              <>
                <Container style={{ marginHorizontal: 16 }}>
                  <TextContainer text="Productos complementarios" typography="h5" fontBold />
                  <Container style={{ marginTop: 8 }}>
                    <Checkbox
                      color={filterObject?.info_petro_complementaryProducts_oil ? 'iconn_green_original' : 'iconn_med_grey'}
                      checked={filterObject?.info_petro_complementaryProducts_oil}
                      onPress={() => setFiltering('info_petro_complementaryProducts_oil', !filterObject?.info_petro_complementaryProducts_oil)}
                    >
                      Venta de aceites y aditivos
                    </Checkbox>
                    <Checkbox
                      color={filterObject?.info_petro_complementaryProducts_urea ? 'iconn_green_original' : 'iconn_med_grey'}
                      checked={filterObject?.info_petro_complementaryProducts_urea}
                      onPress={() => setFiltering('info_petro_complementaryProducts_urea', !filterObject?.info_petro_complementaryProducts_urea)}
                    >
                      Urea disponible (aditivo)
                    </Checkbox>
                  </Container>
                </Container>
                <Container style={{ marginTop: 16, width: '100%' }}>
                  <Container>
                    <TextContainer text="Otros" typography="h5" fontBold marginHorizontal={16} />
                    <Container row space="between" style={{ marginTop: 16, paddingHorizontal: 16 }}>
                      <TouchableOpacity onPress={() => setFiltering('info_petro_others_restroom', !filterObject?.info_petro_others_restroom)}>
                        <Container
                          center
                          style={
                            filterObject?.info_petro_others_restroom
                              ? { ...styles.containerLogoSelect, height: verticalScale(68) }
                              : { ...styles.containerLogo, height: verticalScale(68) }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_RESTROOM} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                          <TextContainer text={'Baños'} marginTop={6} typography="h5" textAlign="center" />
                        </Container>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setFiltering('info_petro_others_parking', !filterObject?.info_petro_others_parking)}>
                        <Container
                          center
                          style={
                            filterObject?.info_petro_others_parking
                              ? { ...styles.containerLogoSelect, height: verticalScale(68) }
                              : { ...styles.containerLogo, height: verticalScale(68) }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_TRUCK} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                          <TextContainer text={'Parking\npara trailers'} marginTop={6} typography="h5" textAlign="center" />
                        </Container>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setFiltering('info_petro_others_7eleven', !filterObject?.info_petro_others_7eleven)}>
                        <Container
                          center
                          style={
                            filterObject?.info_petro_others_7eleven
                              ? { ...styles.containerLogoSelect, height: verticalScale(68) }
                              : { ...styles.containerLogo, height: verticalScale(68) }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_7ELEVEN} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                          <TextContainer text={'Tienda\n7-Eleven'} marginTop={6} typography="h5" textAlign="center" />
                        </Container>
                      </TouchableOpacity>
                    </Container>
                  </Container>

                  <Container style={{ marginTop: 16, marginHorizontal: 16 }}>
                    <TextContainer text="Formas de pago" typography="h5" fontBold />
                    <Container style={{ marginTop: 8 }}>
                      <Checkbox
                        color={filterObject?.info_petro_payMethods_dollars ? 'iconn_green_original' : 'iconn_med_grey'}
                        checked={filterObject?.info_petro_payMethods_dollars}
                        onPress={() => setFiltering('info_petro_payMethods_dollars', !filterObject?.info_petro_payMethods_dollars)}
                      >
                        Dólares
                      </Checkbox>
                      <Checkbox
                        color={filterObject?.info_petro_payMethods_cards ? 'iconn_green_original' : 'iconn_med_grey'}
                        checked={filterObject?.info_petro_payMethods_cards}
                        onPress={() => setFiltering('info_petro_payMethods_cards', !filterObject?.info_petro_payMethods_cards)}
                      >
                        Tarjetas
                      </Checkbox>
                      <Checkbox
                        color={filterObject?.info_petro_payMethods_applePay ? 'iconn_green_original' : 'iconn_med_grey'}
                        checked={filterObject?.info_petro_payMethods_applePay}
                        onPress={() => setFiltering('info_petro_payMethods_applePay', !filterObject?.info_petro_payMethods_applePay)}
                      >
                        ApplePay
                      </Checkbox>
                      <Checkbox
                        color={filterObject?.info_petro_payMethods_contacLess ? 'iconn_green_original' : 'iconn_med_grey'}
                        checked={filterObject?.info_petro_payMethods_contacLess}
                        onPress={() => setFiltering('info_petro_payMethods_contacLess', !filterObject?.info_petro_payMethods_contacLess)}
                      >
                        Contactless
                      </Checkbox>
                    </Container>
                  </Container>

                  <Container style={{ marginTop: 16 }}>
                    <TextContainer text="Vales electrónicos de gasolina" typography="h5" fontBold marginHorizontal={16} />
                    <Container row space="between" style={{ marginTop: 16, paddingHorizontal: 16 }}>
                      <TouchableOpacity onPress={() => setFiltering('info_petro_evouchers_carnet', !filterObject?.info_petro_evouchers_carnet)}>
                        <Container
                          center
                          style={
                            filterObject?.info_petro_evouchers_carnet
                              ? { ...styles.containerLogoSelect, height: verticalScale(68) }
                              : { ...styles.containerLogo, height: verticalScale(68) }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_CARNET} style={{ width: 74, height: 54, resizeMode: 'contain' }} />
                        </Container>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setFiltering('info_petro_evouchers_edenred', !filterObject?.info_petro_evouchers_edenred)}>
                        <Container
                          center
                          style={
                            filterObject?.info_petro_evouchers_edenred
                              ? { ...styles.containerLogoSelect, height: verticalScale(68) }
                              : { ...styles.containerLogo, height: verticalScale(68) }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_EDENRED} style={{ width: 84, height: 54, resizeMode: 'contain' }} />
                        </Container>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setFiltering('info_petro_evouchers_sivale', !filterObject?.info_petro_evouchers_sivale)}>
                        <Container
                          center
                          style={
                            filterObject?.info_petro_evouchers_sivale
                              ? { ...styles.containerLogoSelect, height: verticalScale(68) }
                              : { ...styles.containerLogo, height: verticalScale(68) }
                          }
                        >
                          <Image source={ICONN_BRANCHES_ICON_SIVALE} style={{ width: 94, height: 64, resizeMode: 'contain' }} />
                        </Container>
                      </TouchableOpacity>
                    </Container>
                  </Container>

                  <Container style={{ marginTop: 16, marginHorizontal: 16 }}>
                    <TextContainer text="Beneficios" typography="h5" fontBold />
                    <Container style={{ marginTop: 8, marginBottom: 24 }}>
                      <Checkbox
                        color={filterObject?.info_petro_benefits_cinemaOrCombos ? 'iconn_green_original' : 'iconn_med_grey'}
                        checked={filterObject?.info_petro_benefits_cinemaOrCombos}
                        onPress={() => setFiltering('info_petro_benefits_cinemaOrCombos', !filterObject?.info_petro_benefits_cinemaOrCombos)}
                      >
                        Boletos de cine o combos
                      </Checkbox>
                      <Checkbox
                        color={filterObject?.info_petro_benefits_carWashing ? 'iconn_green_original' : 'iconn_med_grey'}
                        checked={filterObject?.info_petro_benefits_carWashing}
                        onPress={() => setFiltering('info_petro_benefits_carWashing', !filterObject?.info_petro_benefits_carWashing)}
                      >
                        Paquetes de autolavado en promoción
                      </Checkbox>
                    </Container>
                  </Container>
                </Container>
              </>
            )}
          </>
        )}

        <Container backgroundColor={theme.brandColor.iconn_warm_grey} style={{ height: 4 }} />
      </ScrollView>
      <Container>
        <Container
          style={{
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 1,
            shadowColor: theme.brandColor.iconn_med_grey,
            shadowOpacity: 3.2,
            borderTopWidth: 0.48,
            borderTopColor: theme.brandColor.iconn_med_grey,
            height: 2,
            backgroundColor: theme.brandColor.iconn_white
          }}
        />
        <Container row space="between" style={{ marginVertical: 16, marginHorizontal: 16 }}>
          <Container width={'42%'}>
            <Button
              length="long"
              round
              onPress={cleanFilters}
              fontSize="h4"
              fontBold
              outline
              style={{ borderRadius: 12, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
              color="iconn_dark_grey"
            >
              Limpiar todo
            </Button>
          </Container>
          <Container width={'54%'}>
            <Button length="long" round onPress={showResults} fontSize="h4" fontBold>
              Mostrar resultados
            </Button>
          </Container>
        </Container>
      </Container>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  containerLogos: {
    marginTop: moderateScale(16),
    marginHorizontal: moderateScale(16)
  },
  containerLogoSelect: {
    width: moderateScale(104),
    height: verticalScale(54),
    borderRadius: moderateScale(10),
    backgroundColor: theme.brandColor.iconn_green_original_opacity,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_green_original,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerLogo: {
    width: moderateScale(104),
    height: verticalScale(54),
    borderRadius: moderateScale(10),
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_med_grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '80%',
    height: '60%'
  },
  containerSevenOtherSelect: {
    width: '100%',
    height: verticalScale(68)
  }
});

export default BranchesFiltersScreen;
