import { Location } from 'rtk';
import { useEffect, useRef, useState } from 'react';
import { usePermissions } from 'context';
import Geolocation from 'react-native-geolocation-service';

export const useLocation = () => {
  const { permissions, askLocationPermission } = usePermissions();
  const [initialUserLocation, setInitialUserLocation] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>();
  const watchId = useRef<number>();

  useEffect(() => {
    if (permissions.locationStatus === 'granted') {
      getCurrentLocation().then(location => {
        setInitialUserLocation(location);
        setUserLocation(location);
      });
    } else if (permissions.locationStatus === 'denied') {
      askLocationPermission();
    } else if (permissions.locationStatus === 'blocked') {
      setInitialUserLocation({ latitude: 25.675365, longitude: -100.3119196 }); // downtown monterey coordinates
      setUserLocation({ latitude: 25.675365, longitude: -100.3119196 }); // downtown monterey coordinates
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

  return { initialUserLocation, getCurrentLocation, followUserLocation, userLocation, stopTrackingUserLocation };
};
