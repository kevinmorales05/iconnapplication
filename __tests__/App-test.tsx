/**
 * @format
 */

import 'react-native';
import { distanceInKmBetweenEarthCoordinates } from 'utils/geolocation';

describe('test scan CodeBarFunction', () => {
  it('test otro tipo dato', () => {
    const result = distanceInKmBetweenEarthCoordinates('', '', '', '');
    expect(result).toBe(0);
  });
  it('test solo 0', () => {
    const result = distanceInKmBetweenEarthCoordinates(0, 0, 0, 0);
    expect(result).toBe(0);
  });
  it('test coordenadas al reves', () => {
    const result = distanceInKmBetweenEarthCoordinates(-103.2962813, 20.6877516, 20.5869836, -103.2367576);
    expect(result > 0).toBeTruthy();
  });
  it('test coordenadas correctas', () => {
    const result = distanceInKmBetweenEarthCoordinates(20.6877516, -103.2962813, 20.5869836, -103.2367576);
    expect(result > 0).toBeTruthy();
  });
  it('test coordenadas undefind', () => {
    const result = distanceInKmBetweenEarthCoordinates();
    expect(result).toBeNaN();
  });
});
