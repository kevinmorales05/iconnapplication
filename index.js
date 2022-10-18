/**
 * @format
 */

import { AppRegistry, LogBox, Text } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import './global.js';

//disable ios accesibility font autoscaling
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);

//export { default } from './storybook';
