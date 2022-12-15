import { PointInterface, SellerInterface } from 'rtk';

const turf = require('turf');

export const distance = (from: number[] = [-95.343, 39.984], to: number[] = [-75.534, 39.123]): number => {
  var distance = turf.distance(turf.point(from), turf.point(to));
  return distance;
};

export const sortByDistance = (position: number[], sellers: SellerInterface[]): SellerInterface[] => {
  return sellers
    .map(seller => {
      const to = [Number(seller.Longitud), Number(seller.Latitud)];

      return { ...seller, distance: distance(position, to) } as SellerInterface;
    })
    .sort((a, b) => {
      return (a.distance as number) - (b.distance as number);
    });
};

export const hasNearbySellers = (position: number[], sellers: SellerInterface[]) => {
  const filtered = sellers.filter(seller => {
    const to = [Number(seller.Longitud), Number(seller.Latitud)];
    const extent = distance(position, to);
    return extent < 8;
  });

  return filtered.length > 0;
};

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
      const extent = distance(location, to);
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
