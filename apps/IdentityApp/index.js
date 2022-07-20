/**
 * @format
 */
import TextEncoder from 'text-encoding-polyfill';
import './shim.js';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
