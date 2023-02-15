import React from 'react';
import { BranchesState, Location, PointDisplayMode, PointFilteringDetailInterface, PointInterface } from 'rtk';
import { Button, Container, CustomMap, CustomText, PointsFound, PointsList, SearchBranch, SearchBranchByState, TextContainer } from 'components';
import { Details, Region } from 'react-native-maps';
import { ICONN_BRANCHES_FILTER_OPTION, ICONN_BRANCHES_LOCATION_BINOMIAL, ICONN_BRANCHES_LOCATION_PETRO, ICONN_BRANCHES_LOCATION_SEVEN } from 'assets/images';
import { Image, Platform, ScrollView } from 'react-native';
import { PermissionsState } from 'context';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import theme from 'components/theme/theme';

interface Props {
  filterObject: PointFilteringDetailInterface;
  isButtonSearchBar: boolean;
  latitudeDelta: number;
  markers: PointInterface[];
  markersFound: PointInterface[];
  onChangeRegionComplete: (r: Region, d: Details) => void;
  onChangeSearchOfRadius: (value: number) => void;
  onChangeTextSearch: (text: string) => void;
  oneMarker: boolean;
  onEndWriting: () => void;
  onPressCancelSearch: () => void;
  onPressMarker: (marker: PointInterface, mode?: PointDisplayMode) => void;
  onPressOut: () => void;
  onPressSearch: () => void;
  onPressSeeList: () => void;
  onPressSeeMap: () => void;
  onPressShowDetails: () => void;
  onPressShowFilters: () => void;
  onRegionChange: () => void;
  onSearchMarkersByArea: () => void;
  onSelectMunicipality: (state: any, municipality: any) => void;
  permissions: PermissionsState;
  pointDisplayMode: PointDisplayMode;
  radiusOfSearch: number;
  search: string;
  searchArea?: Location;
  setMarkerFound: (marker: PointInterface, mode?: PointDisplayMode) => void;
  setSearch: (str: string) => void;
  states: BranchesState[];
  visibleSearchByAreaButton: boolean;
  visibleSearchByDistance: boolean;
  visibleStoreSymbology: boolean;
}

const BranchesScreen: React.FC<Props> = ({
  filterObject,
  isButtonSearchBar,
  latitudeDelta,
  markers,
  markersFound,
  onChangeRegionComplete,
  onChangeSearchOfRadius,
  onChangeTextSearch,
  oneMarker,
  onEndWriting,
  onPressCancelSearch,
  onPressMarker,
  onPressOut,
  onPressSearch,
  onPressSeeList,
  onPressSeeMap,
  onPressShowDetails,
  onPressShowFilters,
  onRegionChange,
  onSearchMarkersByArea,
  onSelectMunicipality,
  permissions,
  pointDisplayMode,
  radiusOfSearch,
  search,
  searchArea,
  setMarkerFound,
  setSearch,
  states,
  visibleSearchByAreaButton,
  visibleSearchByDistance,
  visibleStoreSymbology
}) => {
  let nfilterObject: any = { ...filterObject };
  if ('info_seven' in nfilterObject) {
    delete nfilterObject.info_seven;
  }
  if ('info_petro' in nfilterObject) {
    delete nfilterObject.info_petro;
  }
  if ('info_binomial' in nfilterObject) {
    delete nfilterObject.info_binomial;
  }

  if (Object.keys(nfilterObject).length === 0) nfilterObject = undefined;

  return (
    <>
      {/* <TextContainer typography="paragraph" text={JSON.stringify(permissions)} marginTop={23} marginBottom={16} /> */}

      {isButtonSearchBar && (
        <Container row space="between" middle style={{ paddingHorizontal: 16, paddingVertical: 8, width: '100%' }}>
          <Container style={{ width: '30%' }}>
            {pointDisplayMode === 'map' && (
              <Button
                onPress={onPressSeeList}
                color="iconn_white"
                style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
                size="xsmall"
                length="long"
                width="xxlarge"
                fontColor="dark"
                fontBold
                fontSize="label"
                leftIcon={<Foundation name="list-bullet" size={24} color={theme.brandColor.iconn_dark_grey} style={{ left: 8 }} />}
              >
                Ver lista
              </Button>
            )}
            {pointDisplayMode === 'list' && (
              <Button
                onPress={onPressSeeMap}
                color="iconn_white"
                style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
                size="xsmall"
                length="long"
                width="xxlarge"
                fontColor="dark"
                fontBold
                fontSize="label"
                leftIcon={<Ionicons name="map-outline" size={24} color={theme.brandColor.iconn_dark_grey} style={{ left: 8 }} />}
              >
                Ver Mapa
              </Button>
            )}
          </Container>
          <Container style={{ width: '30%' }}>
            <Button
              onPress={onPressShowDetails}
              color="iconn_white"
              style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
              size="xsmall"
              length="long"
              width="xxlarge"
              fontColor="dark"
              fontBold
              fontSize="label"
              leftIcon={<Feather name="layers" size={24} color={theme.brandColor.iconn_dark_grey} style={{ left: 8 }} />}
            >
              Mostrar
            </Button>
          </Container>
          <Container style={{ width: '30%' }}>
            <Button
              onPress={onPressShowFilters}
              color="iconn_white"
              style={{ borderRadius: 4, borderWidth: 1, borderColor: nfilterObject ? theme.brandColor.iconn_green_original : theme.brandColor.iconn_med_grey }}
              size="xsmall"
              length="long"
              width="xxlarge"
              fontColor={nfilterObject ? 'light_green' : 'dark'}
              fontBold
              fontSize="label"
              leftIcon={
                <Image
                  source={ICONN_BRANCHES_FILTER_OPTION}
                  style={{
                    left: 8,
                    width: 24,
                    height: 24,
                    tintColor: nfilterObject ? theme.brandColor.iconn_green_original : theme.brandColor.iconn_dark_grey
                  }}
                />
              }
            >
              Filtrar
            </Button>
            {nfilterObject && (
              <Container
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -5
                }}
              >
                <Container style={{ backgroundColor: theme.brandColor.iconn_green_original, height: 24, width: 24, borderRadius: 12 }} middle>
                  <CustomText
                    fontSize={Object.keys(nfilterObject).length > 9 ? 12 : 16}
                    alignSelf="center"
                    textColor={theme.brandColor.iconn_white}
                    text={String(Object.keys(nfilterObject).length)}
                    fontBold
                  />
                </Container>
              </Container>
            )}
          </Container>
        </Container>
      )}
      {permissions.locationStatus === 'granted' && pointDisplayMode === 'list' ? (
        <Container backgroundColor={isButtonSearchBar ? theme.brandColor.iconn_background : undefined} height={64}>
          <SearchBranch
            isButtonSearchBar={isButtonSearchBar}
            onChangeTextSearch={onChangeTextSearch}
            onEndWriting={onEndWriting}
            onPressCancelSearch={onPressCancelSearch}
            onPressSearch={onPressSearch}
            pointDisplayMode={pointDisplayMode}
            search={search}
            setSearch={setSearch}
          />
        </Container>
      ) : permissions.locationStatus === 'blocked' && pointDisplayMode === 'list' ? (
        <Container backgroundColor={theme.brandColor.iconn_background} height={64}>
          <SearchBranchByState onSelectMunicipality={onSelectMunicipality} states={states} />
        </Container>
      ) : null}

      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1
        }}
      >
        <>
          <Container flex>
            {pointDisplayMode === 'map' && isButtonSearchBar && (
              <CustomMap
                latitudeDelta={latitudeDelta}
                markers={markers}
                onChangeRegionComplete={onChangeRegionComplete}
                onPressMarker={onPressMarker}
                onPressOut={onPressOut}
                onRegionChange={onRegionChange}
                oneMarker={oneMarker}
                searchArea={searchArea}
              />
            )}

            {pointDisplayMode === 'list' && isButtonSearchBar && <PointsList markers={markers} onPressMarker={onPressMarker} />}

            {visibleStoreSymbology && pointDisplayMode === 'map' && isButtonSearchBar && (
              <Container
                height={120}
                backgroundColor={theme.brandColor.iconn_white}
                style={{ paddingVertical: 8, paddingHorizontal: 8, position: 'absolute', bottom: 8, left: 8 }}
              >
                <TextContainer text="Tipo de tienda" fontBold />
                <Container row style={{ marginTop: 12 }}>
                  <Image source={ICONN_BRANCHES_LOCATION_SEVEN} style={{ height: 24, width: 24 }} />
                  <TextContainer text="7-eleven" fontBold textColor={theme.brandColor.iconn_green_original} />
                </Container>
                <Container row>
                  <Image source={ICONN_BRANCHES_LOCATION_PETRO} style={{ height: 24, width: 24 }} />
                  <TextContainer text="Petro Seven" fontBold textColor={theme.brandColor.iconn_orange_original} />
                </Container>
                <Container row>
                  <Image source={ICONN_BRANCHES_LOCATION_BINOMIAL} style={{ height: 24, width: 24 }} />
                  <TextContainer text="Binomio" fontBold textColor={theme.brandColor.iconn_red_original} />
                </Container>
              </Container>
            )}

            {visibleSearchByDistance && pointDisplayMode === 'map' && isButtonSearchBar && (
              <Container
                height={120}
                backgroundColor={theme.brandColor.iconn_white}
                style={{
                  position: 'absolute',
                  marginLeft: 16,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  left: pointDisplayMode === 'map' ? 131 : 0,
                  bottom: 8
                }}
              >
                <TextContainer text={'Distancia de\nbúsqueda (km)'} textColor={theme.brandColor.iconn_accent_secondary} fontBold numberOfLines={2} />
                <Slider
                  lowerLimit={1}
                  maximumTrackTintColor={theme.brandColor.iconn_med_grey}
                  maximumValue={5}
                  minimumTrackTintColor={theme.brandColor.iconn_green_original}
                  minimumValue={1}
                  onSlidingComplete={v => onChangeSearchOfRadius(v)}
                  step={1}
                  style={{ flex: 1, width: 140, marginVertical: 8 }}
                  tapToSeek={true}
                  thumbTintColor={theme.brandColor.iconn_med_grey}
                  upperLimit={5}
                  value={radiusOfSearch}
                />
                <Container row space="between">
                  <TextContainer text="1 km" fontBold typography="h6" />
                  <TextContainer text="5 km" fontBold typography="h6" />
                </Container>
              </Container>
            )}

            {permissions.locationStatus === 'granted' && pointDisplayMode === 'map' ? (
              <SearchBranch
                isButtonSearchBar={isButtonSearchBar}
                onChangeTextSearch={onChangeTextSearch}
                onEndWriting={onEndWriting}
                onPressCancelSearch={onPressCancelSearch}
                onPressSearch={onPressSearch}
                pointDisplayMode={pointDisplayMode}
                search={search}
                setSearch={setSearch}
              />
            ) : permissions.locationStatus === 'blocked' && pointDisplayMode === 'map' ? (
              <SearchBranchByState onSelectMunicipality={onSelectMunicipality} states={states} />
            ) : null}

            {!isButtonSearchBar && (
              <Container style={{ top: pointDisplayMode === 'list' ? 0 : 64 }}>
                <PointsFound markers={markersFound} setMarkerFound={setMarkerFound} />
              </Container>
            )}

            {visibleSearchByAreaButton && isButtonSearchBar && (
              <Container style={{ position: 'absolute', top: Platform.OS === 'android' ? 70 : 65, alignSelf: 'center' }}>
                <Button
                  color="iconn_green_original"
                  fontBold
                  fontSize="h5"
                  length="long"
                  onPress={onSearchMarkersByArea}
                  outline
                  round
                  size="xsmall"
                  style={{ borderRadius: 12, borderColor: theme.brandColor.iconn_green_original, backgroundColor: theme.brandColor.iconn_white }}
                >
                  {'   Buscar en esta área   '}
                </Button>
              </Container>
            )}
          </Container>
        </>
      </ScrollView>
    </>
  );
};

export default BranchesScreen;
