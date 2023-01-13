import React, { useEffect, useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import { ICONN_BRANCHES_LOCATION_BINOMIAL, ICONN_BRANCHES_LOCATION_PETRO, ICONN_BRANCHES_LOCATION_SEVEN } from 'assets/images';
import { PointInterface } from 'rtk';
import { useLocation } from 'hooks/useLocation';
import { usePermissions } from 'context';
import MapView, { Details, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import theme from 'components/theme/theme';

interface Props {
  latitudeDelta: number;
  markers?: PointInterface[];
  onChangeRegionComplete: (r: Region, d: Details) => void;
  onPressMarker: (marker: PointInterface) => void;
  onPressOut: () => void;
  onRegionChange: () => void;
}

const CustomMap: React.FC<Props> = ({ latitudeDelta, markers, onChangeRegionComplete, onPressMarker, onPressOut, onRegionChange }) => {
  const mapViewRef = useRef<MapView>();
  const followingRef = useRef<boolean>(true);
  const { followUserLocation, userLocation, stopTrackingUserLocation, initialUserLocation } = useLocation();
  const { permissions, askLocationPermission } = usePermissions();
  const { height, width } = Dimensions.get('window');
  // If you want to set more zoom from the height, set latitudeDelta with a minor decimal number.
  const LONGITUDE_DELTA = latitudeDelta * (width / height);

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
          latitudeDelta: latitudeDelta,
          longitudeDelta: LONGITUDE_DELTA
        }}
        onTouchStart={() => (followingRef.current = false)}
        zoomEnabled
        zoomControlEnabled
        onPress={onPressOut}
        onRegionChangeComplete={(r, d) => onChangeRegionComplete(r, d)}
        onRegionChange={onRegionChange}
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
