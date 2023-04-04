import { Location } from 'rtk';
import { GoogleMapsApi } from '../http/google-maps-api';
import config from 'react-native-config';

/**
 * Function to get address by latitude and longitude
 */
async function getGeographicLocationByLatLng(location: Location): Promise<any> {
  const { GOOGLE_MAPS_API_KEY } = config;
  const response = await GoogleMapsApi.getInstance().getRequest(
    `/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&location_type=ROOFTOP&key=${GOOGLE_MAPS_API_KEY}`
  );
  if (response === undefined) return Promise.reject(new Error('getGeographicLocationByLatLng:/maps/api/geocode'));
  const { data } = response;
  return data;
}

export const GoogleMapsServices = {
  getGeographicLocationByLatLng
};
