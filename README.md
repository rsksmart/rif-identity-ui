<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>rif-identity-ui</code></h3>
<p align="middle">
    RIF Self-sovereign identity UI library.
</p>

## Development

Install dependencies

```
yarn
yarn lerna bootstrap
```

Link packages

```
yarn link
```

Start Holder App server

```
cd apps/HolderApp
yarn start
```

And the app

```
yarn android
```

To run ios

```
cd ios
pod install
```

Also

```
cd ../../../../packages/RIFIdReactNative/ios
pod install
```

Shared stuff to be refactored:
- Custom logger
- Styles
- IdentityApp/Libraries
- LoadingComponent
- Secure storage provider
- Language files

