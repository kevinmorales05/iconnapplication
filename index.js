/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

//disable ios accesibility font autoscaling
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);

//export { default } from './storybook';
