/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import './global.js';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
//disable ios accesibility font autoscaling
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// Important setup. If you dont add this gestureHandlerRootHOC wrap to App, then gesture doesnt work for android.
messaging().setBackgroundMessageHandler(async remoteMessage => {});
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
