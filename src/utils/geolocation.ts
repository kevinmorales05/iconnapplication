import { SellerInterface } from 'rtk';

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
