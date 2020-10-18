## Identity Holder Wallet

The holder wallet is used to store declarative details and credentials of it's users. Built in React Native it can be packaged for both IOS and Android, however, Android is the only officially supported platform. 

## Setting up a local Android Environment

Refer to [Setting up the development environment](https://reactnative.dev/docs/environment-setup) from the official docs on setting up your environment. Use the instructions under React Native CLI Quickstart, NOT Expo.

## Install dependecies
```
yarn
```

## Modify Config

The Holder Application uses a .json file for configuration variables. .env files were not a good solution as the app had to be reset and the cache cleared when a change needed to be made. The initial configuration file can be found at `/src/config` and contains the following variables:

```
{
  "ISSUER_ENDPOINT": "",
  "ISSUER_DID": "",
  "IPFS_GATEWAY_ENDPOINT": "",
  "DATA_VAULT_ENDPOINT": "",
  "RSK_NODE": "",
  "CONVEY_URL": "",
  "CONVEY_DID": ""
}
```

The user can change any of these variables in the advanced settings screen. Once they are set there, this file is ignored until the app is reset.

## Nodify

The Holder app runs React Native which requires packages found in the browser but not on the phone. As such, multiple packages are replaced using nodify. These are installed after the initial yarn command. There are two additional patches that need to be made after the installation process.

### Modify app-root-path:

Navigate to:
```
/node_modules/app-root-path/browser-shim.js
```
Remove or comment out line 3: 
```
// exports.path = require('path').dirname(require.main.filename);
```

### Modify react-native-os:
Navigate to: 
```
node_modules\react-native-os\android\src\main\java\com\peel\react\RNOSModule.java
```

Remove or coment out line 31:
```
//  @Override
```

## Run for Android

Have an android device connected to the computer or an emulator running.

```
yarn android
```

For Development, the following commands are helpful in clearing the cache:

```
./android/gradlew --clean
yarn start --reset-cache
```

## Build Production Version

Make sure `/src/config.json` contains the initial paths and DIDs.

### nodify issue

The `react-native-os` package is using an older build settings and needs to be updated manually. Navigate to `/node_modules/react-native-os/android/build.gradle`, and update the version numbers on line 14 & 15 to the following:
```
  android {
    compileSdkVersion 28
    buildToolsVersion "28.0.1"
```

### build:

```
cd android
./gradlew assemble-release
```
