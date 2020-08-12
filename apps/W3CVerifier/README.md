# Verifier App

## Setup

Create a `.env` file with

```
ISSUER_DID=
RPC_URL=
DID_REGISTRY_ADDRESS=
```

Example: 
```
ISSUER_DID=did:ethr:rsk:testnet:0x2f4324044cf9c1c0eb7b0df0169253f665a50e2f
RPC_URL=https://did.testnet.rsk.co:4444
DID_REGISTRY_ADDRESS=0xdca7ef03e98e0dc2b855be647c39abe984fcf21b
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
