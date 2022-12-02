import { Location } from 'rtk';
import { useEffect, useRef, useState } from 'react';
import { usePermissions } from 'context';
import Geolocation from 'react-native-geolocation-service';

export const useLocation = () => {
  const { permissions, askLocationPermission } = usePermissions();
  const [hasLocation, setHasLocation] = useState(false);
  const [initialUserLocation, setInitialUserLocation] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>();
  const watchId = useRef<number>();

  useEffect(() => {
    if (permissions.locationStatus === 'granted') {
      getCurrentLocation().then(location => {
        setInitialUserLocation(location);
        setUserLocation(location);
        setHasLocation(true);
      });
    } else if (permissions.locationStatus === 'denied') {
      askLocationPermission();
    }
  }, [permissions.locationStatus]);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude
          });
        },
        err => {
          reject({ err });
        },
        {
          enableHighAccuracy: true
        }
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
      },
      undefined,
      {
        enableHighAccuracy: true,
        distanceFilter: 10
      }
    );
  };

  const stopTrackingUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return { hasLocation, initialUserLocation, getCurrentLocation, followUserLocation, userLocation, stopTrackingUserLocation };
};
