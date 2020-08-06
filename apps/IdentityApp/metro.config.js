/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path')

const watchFolders = [
  path.resolve(__dirname + '/../../packages/rif-theme'),
  path.resolve(__dirname + '/../../packages/Languages'),
];
const extraNodeModules = {
  '@rsksmart/rif-theme': path.resolve(__dirname + '/../../packages/rif-theme'),
};
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules,
  },
  watchFolders,
};
