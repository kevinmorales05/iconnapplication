import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'components/atoms';
import { Dimensions, Image, Platform } from 'react-native';
import { ICONN_BRANCHES_LOCATION_BINOMIAL, ICONN_BRANCHES_LOCATION_PETRO, ICONN_BRANCHES_LOCATION_SEVEN } from 'assets/images';
import { Location, PointInterface } from 'rtk';
import { useLocation } from 'hooks/useLocation';
import { usePermissions } from 'context';
import MapView, { Details, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import theme from 'components/theme/theme';

interface Props {
  latitudeDelta: number;
  markers?: PointInterface[];
  onChangeRegionComplete: (r: Region, d: Details) => void;
  oneMarker: boolean;
  onPressMarker: (marker: PointInterface) => void;
  onPressOut: () => void;
  onRegionChange: () => void;
  searchArea?: Location;
}

const CustomMap: React.FC<Props> = ({ latitudeDelta, markers, onChangeRegionComplete, oneMarker, onPressMarker, onPressOut, onRegionChange, searchArea }) => {
  const mapViewRef = useRef<MapView>();
  const followingRef = useRef<boolean>(true);
  const { userLocation } = useLocation();
  const { permissions, askLocationPermission } = usePermissions();
  const { height, width } = Dimensions.get('window');
  // If you want to set more zoom from the height, set latitudeDelta with a minor decimal number.
  const LONGITUDE_DELTA = latitudeDelta * (width / height);

  const [selectedMarker, setSelectedMarker] = useState<{ i: number; selected: boolean }>();

  useEffect(() => {
    if (Platform.OS === 'android' && permissions.locationStatus === 'blocked') {
      askLocationPermission();
    }
  }, [permissions.locationStatus]);

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton
        focusable
        region={{
          latitude:
            markers && markers.length === 1 && oneMarker === true
              ? markers![0].latitude
              : markers?.length! > 1 && searchArea
              ? searchArea!.latitude
              : userLocation
              ? userLocation.latitude
              : 0,
          longitude:
            markers && markers.length === 1 && oneMarker === true
              ? markers![0].longitude
              : markers?.length! > 1 && searchArea
              ? searchArea!.longitude
              : userLocation
              ? userLocation.longitude
              : 0,
          latitudeDelta: latitudeDelta,
          longitudeDelta: LONGITUDE_DELTA
        }}
        onTouchStart={() => (followingRef.current = false)}
        zoomEnabled
        zoomControlEnabled
        zoomTapEnabled
        maxZoomLevel={20}
        onPress={onPressOut}
        onRegionChangeComplete={(r, d) => onChangeRegionComplete(r, d)}
        onPanDrag={onRegionChange}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              tracksViewChanges={Platform.OS === 'android' ? false : true}
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.shopName}
              onPress={() => {
                mapViewRef.current?.animateToRegion({
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: LONGITUDE_DELTA
                });
                onPressMarker(marker)!;
                setSelectedMarker({ i: index, selected: true });
              }}
            >
              {markers.length === 1 || (selectedMarker && selectedMarker.selected && selectedMarker.i === index) ? (
                <Container
                  style={{
                    width: 60,
                    height: 60,
                    alignSelf: 'center',
                    borderRadius: 30,
                    shadowColor: theme.brandColor.iconn_orange_original,
                    shadowOffset: {
                      width: 0,
                      height: 1
                    },
                    shadowOpacity: 1,
                    shadowRadius: 16,
                    overflow: 'hidden',
                    borderWidth: 0.01,
                    borderColor: theme.brandColor.iconn_orange_original
                  }}
                  middle
                >
                  <Image source={ICONN_BRANCHES_LOCATION_PETRO} style={{ width: 44, height: 44 }} />
                </Container>
              ) : (
                <Image
                  source={
                    marker.type === 'binomial'
                      ? ICONN_BRANCHES_LOCATION_BINOMIAL
                      : marker.type === 'petro'
                      ? ICONN_BRANCHES_LOCATION_PETRO
                      : ICONN_BRANCHES_LOCATION_SEVEN
                  }
                  style={{ height: 36, width: 36 }}
                />
              )}
            </Marker>
          ))}
      </MapView>
    </>
  );
};

export default CustomMap;
