const turf = require('turf');

export const distance = async (from: [number, number] = [-95.343, 39.984], to: [number, number] = [-75.534, 39.123]) => {
  var distance = turf.distance(turf.point(from), turf.point(to));
  console.log('distance:', distance);
};
