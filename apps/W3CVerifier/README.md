# Verifier App

## Setup

Create a `env.json` file with

```
ISSUER_DID=expected VC issuer did to mark VPs as valid
RPC_URL=rsk testnet rpc url - the one in the example was tested and works
DID_REGISTRY_ADDRESS=did registry address
DEFAULT_VP_EXPIRATION_SECONDS=if the VP has not expiration time, set a default amount of seconds of validity
CONVEY_URL=convey service url - used to get VPs
CONVEY_DID=used to verify that the authentication is successful
NETWORK=rsk:testnet or rsk
IPFS_GATEWAY=will be used to fetch presentations if no convey present or if the convey does not find the presentation
```

Example: 
```
{
  "ISSUER_DID": "did:ethr:rsk:testnet:0x2f4324044cf9c1c0eb7b0df0169253f665a50e2f",
  "RPC_URL": "https://did.testnet.rsk.co:4444",
  "DID_REGISTRY_ADDRESS": "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b",
  "DEFAULT_VP_EXPIRATION_SECONDS": 120,
  "CONVEY_URL": "http://192.168.0.57:5104",
  "CONVEY_DID": "did:ethr:rsk:testnet:0x4A795Ab98dC3732D1123c6133D3Efdc76D4c91f8",
  "NETWORK": "rsk:testnet",
  "IPFS_GATEWAY": "http://192.168.0.57:8080"
}
```

## Install

```
yarn
```

## Run for iOS simulator

```
cd ios
pod install
yarn ios
```

## Run for Android

Start Android studio, open up the ADB Manager and start an emulated Android device. Or connect an Android device and confirm that it is connected by typing: `adb devices`.

```
yarn android
```
