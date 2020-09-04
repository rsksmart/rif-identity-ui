<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>rif-identity-ui</code></h3>
<p align="middle">
    RIF Self-sovereign identity UI library.
</p>

User interface packages and applications enabling RIF Self-sovereign identity models.

<!-- TODO: Explain more about the use case and the apps -->

## Features

<!-- TODO: Go further -->

This repo contains UI libraries and applications

### Libraries

<!-- TODO: Go further -->

- RIF theme
- RIF Identity languages

### Apps

<!-- TODO: Explain all this better -->

- Issuer's app: it opens a _request credential_ service that enables Holder's app user to request for different credentials
- Holder's app: it requests credentials to the issuer's open service and stores them in the _RIF Data vault_. It allows to perform credential presentations using QR codes
- Verifier's app: allows to scan Holder's app presented QRs and verify W3C compliance and that the _issuer's app is the credential issuer_

## Development

This app is designed to work with [RIF identity services](#). First of all you will need to get all this services running, follow the repository's README. Then, before starting any app, install global dependencies and app specific dependencies.

```
yarn
yarn lerna bootstrap
```

> If you add/remove a dependency from any folder inside `./apps` or `./packages`, please install (or re-install) the dependencies with `yarn lerna bootstrap`.

### Holder's app

This is a react native app, you will first need to [set up React Native environment](https://reactnative.dev/docs/environment-setup).

This app is a use case for a citizen that holds credentials such us a _national ID_ or a _driver license_. It uses [RIF Identity services](#) and [RIF Identity Javascript library](#)<sup>1</sup> to enable W3C-compatible SSI features.

Configure the app, complete the `.env` file:

```
ISSUER_NAME= the issuer's name, to show in the UI
ISSUER_ENDPOINT= the issuer's https endpoint for credentials requests
TINYQR_ENDPOINT= the tiny-qr service endpoint to enable tiny-qrs
```

To start Holder's App (metro bundler)

```
cd apps/IdentityApp
yarn start
```

Then run `yarn ios`<sup>2</sup><sup>3</sup> or `yarn android`.

### Verifier's app

This is also a React Native app. Use the same setup explained in [Holder's app](#Holder's-app).

<!--

Configure the app, complete the `.env` file

```
TBD
```

-->

To start Verifier's App (metro bundler)

```
cd apps/W3CVerifier
yarn start
```

Then run `yarn ios`<sup>2</sup> or `yarn android`.

## Open to be refactored

The holder's app and the verifier's app have some thing in common that might be code-duplicated or not imported from packages:

- Custom logger
- Styles
- IdentityApp/Libraries
- LoadingComponent
- Secure storage provider
- Language files

---

1. SSI Library is a WIP
2. Run `cd ios && pod install` first
3. iOS support is a WIP

