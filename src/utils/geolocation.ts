import { PointInterface } from 'rtk';

/**
 * Function to get nearby points given a point/location.
 * @param location it could be the current user location.
 * @param points branches array.
 * @param kilometers search radius. 1 by default.
 * @returns Nearby points array.
 */
export const getNearbyPoints = (location: number[], points: PointInterface[], kilometers: number = 1) => {
  const filtered = points
    .filter(point => {
      const to = [Number(point.latitude), Number(point.longitude)];
      const extent = distanceInKmBetweenEarthCoordinates(location[0], location[1], to[0], to[1]);
      if (extent < kilometers) {
        point.kmDistance = extent.toFixed(1); // i.e: 0.9966472642351644 to 1.0, 2.1788058118354643 to 2.2
        return point;
      }
    })
    .sort((a, b) => {
      return (a.kmDistance as unknown as number) - (b.kmDistance as unknown as number);
    });

  // console.log('Número de tiendas cercanas a la ubicación:', filtered.length);
  // console.log('Detalle de tiendas cercanas a la ubicación:', JSON.stringify(filtered, null, 3));
  return filtered;
};

/**
 * Converts degrees to radians.
 * @param degrees degrees
 * @returns Radians
 */
const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

/**
 * This function is responsible to calculate the distance between 2 points, given a pair of coordinates.
 * @param lat1 Origin Latitude.
 * @param lon1 Origin Longitude.
 * @param lat2 Destination Latitude.
 * @param lon2 Destination Longitude.
 * @returns distance in kilometers.
 */
export const distanceInKmBetweenEarthCoordinates = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const earthRadiusKm: number = 6371; // https://www.univision.com/explora/cual-es-el-radio-de-la-tierra

  const dLat: number = degreesToRadians(lat2 - lat1);
  const dLon: number = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

// console.log('Example to test', distanceInKmBetweenEarthCoordinates(0, 0, 0, 0));
