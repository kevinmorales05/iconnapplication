import React from 'react';
import { BranchesState, Location, PointDisplayMode, PointInterface } from 'rtk';
import { Button, Container, CustomMap, PointsFound, PointsList, SearchBranch, SearchBranchByState, TextContainer } from 'components';
import { Details, Region } from 'react-native-maps';
import { ICONN_BRANCHES_FILTER_OPTION, ICONN_BRANCHES_LOCATION_BINOMIAL, ICONN_BRANCHES_LOCATION_PETRO, ICONN_BRANCHES_LOCATION_SEVEN } from 'assets/images';
import { Image, ScrollView } from 'react-native';
import { PermissionsState } from 'context';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import theme from 'components/theme/theme';

interface Props {
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
  visibleSearchByAreaButton: boolean;
  visibleSearchByDistance: boolean;
  visibleStoreSymbology: boolean;
  states: BranchesState[];
}

const BranchesScreen: React.FC<Props> = ({
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
  visibleSearchByAreaButton,
  visibleSearchByDistance,
  visibleStoreSymbology,
  states
}) => {
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
              style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
              size="xsmall"
              length="long"
              width="xxlarge"
              fontColor="dark"
              fontBold
              fontSize="label"
              leftIcon={<Image source={ICONN_BRANCHES_FILTER_OPTION} style={{ left: 8, width: 24, height: 24 }} />}
            >
              Filtrar
            </Button>
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
              <Container style={{ position: 'absolute', top: 65, alignSelf: 'center' }}>
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
