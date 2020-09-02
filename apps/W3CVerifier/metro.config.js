/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

// react-native >= 0.57

const extraNodeModules = {};
const watchFolders = [];

module.exports = {
  resolver: {
    extraNodeModules,
  },
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
