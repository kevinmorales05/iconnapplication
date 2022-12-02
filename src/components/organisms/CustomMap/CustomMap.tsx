import React, { useEffect, useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import { PointInterface } from 'rtk';
import { useLocation } from 'hooks/useLocation';
import { usePermissions } from 'context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import theme from 'components/theme/theme';
import { ICONN_BRANCHES_LOCATION_BINOMIAL, ICONN_BRANCHES_LOCATION_PETRO, ICONN_BRANCHES_LOCATION_SEVEN } from 'assets/images';

interface Props {
  markers?: PointInterface[];
  onPressMarker: (marker: PointInterface) => void;
}

const CustomMap: React.FC<Props> = ({ markers, onPressMarker }) => {
  const mapViewRef = useRef<MapView>();
  const followingRef = useRef<boolean>(true);
  const { followUserLocation, userLocation, stopTrackingUserLocation, initialUserLocation } = useLocation();
  const { permissions, askLocationPermission } = usePermissions();
  const { height, width } = Dimensions.get('window');
  const LATITUDE_DELTA = 0.28;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  useEffect(() => {
    if (permissions.locationStatus === 'granted') {
      followUserLocation();
    } else if (permissions.locationStatus === 'denied') {
      askLocationPermission();
    }

    return () => {
      stopTrackingUserLocation();
    };
  }, [permissions.locationStatus]);

  useEffect(() => {
    if (!followingRef.current) return;

    mapViewRef.current?.setCamera({
      center: userLocation
    });
  }, [userLocation]);

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
          latitude: initialUserLocation ? initialUserLocation!.latitude : 0,
          longitude: initialUserLocation ? initialUserLocation!.longitude : 0,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        onTouchStart={() => (followingRef.current = false)}
        zoomEnabled
        zoomControlEnabled
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.shopName}
              pinColor={
                marker.type === 'binomial'
                  ? theme.brandColor.iconn_red_original
                  : marker.type === 'petro'
                  ? theme.brandColor.iconn_orange_original
                  : theme.brandColor.iconn_green_original
              }
              onPress={() => onPressMarker(marker)!}
            >
              <Image
                source={
                  marker.type === 'binomial'
                    ? ICONN_BRANCHES_LOCATION_BINOMIAL
                    : marker.type === 'petro'
                    ? ICONN_BRANCHES_LOCATION_PETRO
                    : ICONN_BRANCHES_LOCATION_SEVEN
                }
                style={{ height: 35, width: 35 }}
              />
            </Marker>
          ))}
      </MapView>
    </>
  );
};

export default CustomMap;
