import React from 'react';
import { PointItem } from 'components';
import { PointInterface } from 'rtk';
import renderer from 'react-test-renderer';

jest.mock('react-native-device-info', () => {
  return {
    getVersion: () => 4,
    hasNotch: () => true,
    getModel: () => 'iPhone 8 Plus'
  };
});
jest.mock('@react-native-google-signin/google-signin', () => {});
jest.mock('@react-native-async-storage/async-storage', () => {});
jest.mock('react-native-permissions', () => {});
jest.mock('@react-native-community/netinfo', () => {});
jest.mock('react-native-blob-util', () => {});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers)
  };
});

describe('Testing on <PointItem />', () => {
  test('should match with the snapshot', () => {
    const snap = renderer
      .create(
        <PointItem
          onPress={() => {}}
          point={
            {
              address: 'string',
              googleMapsLink: 'string',
              id: 123,
              info: {},
              isActive: true,
              isUpdated: true,
              kmDistance: 'string',
              latitude: 345,
              longitude: 345,
              mallNumber: 1234,
              postalCode: 1234,
              shopName: 'string',
              shopNumber: 123,
              type: '7eleven'
            } as PointInterface
          }
          pointFound={false}
        />
      )
      .toJSON();

    expect(snap).toMatchSnapshot();
  });
});
