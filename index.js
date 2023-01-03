/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
// import { LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import './global.js';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

//disable ios accesibility font autoscaling
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// LogBox.ignoreAllLogs();

// Important setup. If you dont add this gestureHandlerRootHOC wrap to App, then gesture doesnt work for android.
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

//export { default } from './storybook';
