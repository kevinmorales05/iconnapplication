import React from 'react';
import { SearchBar } from 'components';
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

describe('Testing on <SearchBar />', () => {
  test('should match with the snapshot as input text', () => {
    const snap = renderer
      .create(
        <SearchBar
          onChangeTextSearch={() => {}}
          onPressSearch={() => {}}
          isButton={false}
          onEndWriting={() => {}}
          textSearch="something"
          placeHolderText="placeholder"
        />
      )
      .toJSON();

    expect(snap).toMatchSnapshot();
  });
  test('should match with the snapshot as button', () => {
    const snap = renderer.create(<SearchBar onChangeTextSearch={() => {}} onPressSearch={() => {}} isButton={true} />).toJSON();

    expect(snap).toMatchSnapshot();
  });
});
