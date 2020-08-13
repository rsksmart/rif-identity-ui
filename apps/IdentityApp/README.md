# Holder App

To run start Android studio, open up the ADB Manager and start an emulated Android device. Or connect an Android device and confirm that it is connected by typing: `adb devices`.


**.env file**

Create a .env file with the following settings:

```
ISSUER_NAME=
ISSUER_ENDPOINT=
TINYQR_ENDPOINT=
IPFS_GATEWAY_ENDPOINT=https://ipfs.io/ipfs
DATA_VAULT_ENDPOINT=
```

**Install**
```
npm install
```


Start a credential issuer-server and set the URL in `src/providers/index`. In future versions, this URL may be located somewhere else. On Windows, using localhost failed, try using the IP address of your machine.


**Run**
```
npm run android
```

It will take a bit of time on first launch.