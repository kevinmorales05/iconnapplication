import { AddressComponent, GeographicLocation, Location, setAppInitialPreferences, useAppDispatch } from 'rtk';
import { useEffect, useRef, useState } from 'react';
import { usePermissions } from 'context';
import Geolocation from 'react-native-geolocation-service';
import { useToast } from 'context';
import { GoogleMapsServices } from 'services';

export const useLocation = () => {
  const { permissions, askLocationPermission } = usePermissions();
  const [userLocation, setUserLocation] = useState<Location>();
  const [completeGeolocation, setCompleteGeolocation] = useState();
  const watchId = useRef<number>();
  const [geographicLocation, setGeographicLocation] = useState<GeographicLocation | null>();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const remapGeocodingResponse = (geocodingResponse: any) => {
    if (geocodingResponse.status === 'OK') {
      let geographicLocationInfo = {} as GeographicLocation;
      geocodingResponse.results[0].address_components.forEach((address_component: AddressComponent) => {
        const propKey = address_component.types[0];
        switch (propKey) {
          case 'street_number':
            geographicLocationInfo.street_number = address_component.short_name;
            break;
          case 'route':
            geographicLocationInfo.route = address_component.short_name;
            break;
          case 'political':
            geographicLocationInfo.political = address_component.short_name;
            break;
          case 'locality':
            geographicLocationInfo.locality = address_component.short_name;
            break;
          case 'administrative_area_level_1':
            geographicLocationInfo.administrative_area_level_1 = address_component.short_name;
            break;
          case 'country':
            geographicLocationInfo.country = address_component.short_name;
            break;
          case 'postal_code':
            geographicLocationInfo.postal_code = address_component.short_name;
            break;
        }
      });
      return geographicLocationInfo;
    } else {
      let msg: string = '';
      switch (geocodingResponse.status) {
        case 'ZERO_RESULTS':
          msg = 'No se encontró la ubicación en el mapa :(';
          break;
        case 'OVER_QUERY_LIMIT':
          msg = 'Has superado la cuota de peticiones';
          break;
        case 'REQUEST_DENIED':
          msg = 'Api invalida :(';
          break;
        case 'INVALID_REQUEST':
          msg = 'La solicitud esta mal formada';
          break;
        case 'UNKNOWN_ERROR':
          msg = 'Error desconocido :(';
          break;
      }
      toast.show({ message: msg, type: 'warning' });
      return null;
    }
  };

  useEffect(() => {
    if (permissions.locationStatus === 'granted') {
      dispatch(setAppInitialPreferences());
      getCurrentLocation()
        .then(async location => {
          setUserLocation(location);
          const userGeographicLocation = await GoogleMapsServices.getGeographicLocationByLatLng(location);
          setCompleteGeolocation(userGeographicLocation);
          console.log('Geocoding sin remapear', userGeographicLocation);
          console.log('geocoding remapeada => ', JSON.stringify(remapGeocodingResponse(userGeographicLocation), null, 3));
          console.log('La geolocalización exacta es ===>', location);
        })
        .catch(() => {
          // IMPORTANT: If permission is "granted" but "gps" is off, then set default location (monterey). This occurs only on Android.
          setUserLocation({ latitude: 25.675365, longitude: -100.3119196 }); // downtown monterey coordinates
        });
    } else if (permissions.locationStatus === 'denied') {
      askLocationPermission();
    } else if (permissions.locationStatus === 'blocked' || permissions.locationStatus === 'unavailable') {
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

  /**
   * Center de camera to temporal location while the user give the permissions to his real location.
   * @param location location by municipality, is the default location per point in the defaultPoints.json
   */
  const setLocationByMunicipality = (location: Location) => {
    setUserLocation(location);
  };

  return { getCurrentLocation, followUserLocation, userLocation, stopTrackingUserLocation, setLocationByMunicipality, completeGeolocation };
};
