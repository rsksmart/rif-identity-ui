# Holder App

To run start Android studio, open up the ADB Manager and start an emulated Android device. Or connect an Android device and confirm that it is connected by typing: `adb devices`.


## config file

Modify the ./src/config.json file as needed.

**Example:**

```
{
  "ISSUER_NAME": "RIFOS",
  "ISSUER_ENDPOINT": "https://identity-credentials.testnet.rifos.org",
  "TINYQR_ENDPOINT": "https://identity-tiny-qr.testnet.rifos.org",
  "IPFS_GATEWAY_ENDPOINT": "https://ipfs.io/ipfs",
  "DATA_VAULT_ENDPOINT": "https://identity-data-vault.testnet.rifos.org",
  "RSK_NODE": "https://did.testnet.rsk.co:4444",
  "CONVEY_URL": "",
  "CONVEY_DID: ""
}
```

## Install
```
yarn install
```

Start a credential issuer-server and set the URL in `src/providers/index`. In future versions, this URL may be located somewhere else. On Windows, using localhost failed, try using the IP address of your machine.

## react-native-os modification

The DataVault uses RIF-Storage which needs access to the `os` variable which is nodified by `react-native-os`. This package requires a slight modification that needs to be made for React Native to run. Remove `@Override`, the code on line 31, from this file: `node_modules\react-native-os\android\src\main\java\com\peel\react\RNSModule.java`.

## Run
```
yarn android
```

It will take a bit of time on first launch.