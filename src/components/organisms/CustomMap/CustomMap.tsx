import React, { useEffect, useRef } from 'react';
import { ActionButton } from '../../atoms/ActionButton';
import { useLocation } from 'hooks/useLocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import theme from 'components/theme/theme';
import { usePermissions } from 'context';

interface Props {
  markers?: typeof Marker[];
}

const CustomMap: React.FC<Props> = () => {
  const mapViewRef = useRef<MapView>();
  const followingRef = useRef<boolean>(true);
  const { getCurrentLocation, followUserLocation, userLocation, stopTrackingUserLocation, initialUserLocation } = useLocation();
  const { permissions, askLocationPermission } = usePermissions();

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

    mapViewRef.current?.animateCamera({
      center: userLocation
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const location = await getCurrentLocation();
    followingRef.current = true;
    mapViewRef.current?.animateCamera({
      center: location
    });
  };

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: initialUserLocation ? initialUserLocation!.latitude : 0,
          longitude: initialUserLocation ? initialUserLocation!.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onTouchStart={() => (followingRef.current = false)}
      >
        {/* {initialPosition && (
          <Marker coordinate={{ latitude: initialPosition!.latitude, longitude: initialPosition!.longitude }} title="My Marker" description="Its description" />
        )} */}
      </MapView>
      <ActionButton
        style={{ position: 'absolute', bottom: 8, right: 8 }}
        icon={<FontAwesome name="location-arrow" size={25} color={theme.brandColor.iconn_accent_principal} />}
        size="medium"
        onPress={centerPosition!}
        color="iconn_white"
        circle
      />
    </>
  );
};

export default CustomMap;
