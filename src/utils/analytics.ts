import analytics from '@react-native-firebase/analytics';

export const logEvent = async (name: string, params?: { [key: string]: any }) => {
  analytics().logEvent(name, params);
};
