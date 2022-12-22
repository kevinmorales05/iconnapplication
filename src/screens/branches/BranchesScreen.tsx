import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, Container, CustomMap, PointsList, TextContainer } from 'components';
import { PointDisplayMode, PointInterface } from 'rtk';
import theme from 'components/theme/theme';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import { ICONN_BRANCHES_FILTER_OPTION, ICONN_BRANCHES_LOCATION_BINOMIAL, ICONN_BRANCHES_LOCATION_PETRO, ICONN_BRANCHES_LOCATION_SEVEN } from 'assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { Details, Region } from 'react-native-maps';

interface Props {
  latitudeDelta: number;
  markers: PointInterface[];
  onChangeRegionComplete: (r: Region, d: Details) => void;
  onChangeSearchOfRadius: (value: number) => void;
  onPressMarker: (marker: PointInterface, mode?: PointDisplayMode) => void;
  onPressOut: () => void;
  onPressSeeList: () => void;
  onPressSeeMap: () => void;
  onPressShowDetails: () => void;
  permissions: {};
  pointDisplayMode: PointDisplayMode;
  visibleSearchByDistance: boolean;
  visibleStoreSymbology: boolean;
}

const BranchesScreen: React.FC<Props> = ({
  latitudeDelta,
  markers,
  onChangeRegionComplete,
  onChangeSearchOfRadius,
  onPressMarker,
  onPressOut,
  onPressSeeList,
  onPressSeeMap,
  onPressShowDetails,
  pointDisplayMode,
  visibleSearchByDistance,
  visibleStoreSymbology
}) => {
  // const [thumbIcon, setThumbIcon] = useState<any>();
  // Icon.getImageSource('pause-circle-filled', 28, theme.brandColor.iconn_med_grey).then(source => setThumbIcon(source));

  return (
    <>
      {/* <TextContainer typography="paragraph" text={JSON.stringify(permissions)} marginTop={23} marginBottom={16} /> */}
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
            onPress={() => {}}
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
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1
        }}
      >
        <>
          <Container flex>
            {pointDisplayMode === 'map' && (
              <CustomMap
                latitudeDelta={latitudeDelta}
                markers={markers}
                onChangeRegionComplete={onChangeRegionComplete}
                onPressMarker={onPressMarker}
                onPressOut={onPressOut}
              />
            )}
            {pointDisplayMode === 'list' && <PointsList markers={markers} onPressMarker={onPressMarker} />}
            {visibleStoreSymbology && pointDisplayMode === 'map' && (
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

            {visibleSearchByDistance && (
              <Container
                height={120}
                backgroundColor={theme.brandColor.iconn_white}
                style={{
                  position: 'absolute',
                  marginLeft: 16,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  left: pointDisplayMode === 'map' ? 131 : 8,
                  bottom: 8
                }}
              >
                <TextContainer text={'Distancia de\nbúsqueda (km)'} textColor={theme.brandColor.iconn_accent_secondary} fontBold numberOfLines={2} />
                <Slider
                  onSlidingComplete={v => onChangeSearchOfRadius(v)}
                  style={{ flex: 1, width: 140, marginVertical: 8 }}
                  minimumValue={1}
                  maximumValue={5}
                  minimumTrackTintColor={theme.brandColor.iconn_green_original}
                  maximumTrackTintColor={theme.brandColor.iconn_med_grey}
                  step={1}
                  value={1}
                  lowerLimit={1}
                  upperLimit={5}
                  tapToSeek={true}
                  thumbTintColor={theme.brandColor.iconn_med_grey}
                />
                <Container row space="between">
                  <TextContainer text="1 km" fontBold typography="h6" />
                  <TextContainer text="5 km" fontBold typography="h6" />
                </Container>
              </Container>
            )}
          </Container>
        </>
      </ScrollView>
    </>
  );
};

export default BranchesScreen;
