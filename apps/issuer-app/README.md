<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle">Issuer - Credentials Request manager </h3>
<p align="middle">
    RIF Self-sovereign identity
</p>

Application that serves as the credential request manager. It allows to grant-deny requests or revoke existing credentials.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run

### Configure

1. Create a .env file with the following keys

```
REACT_APP_BACKOFFICE=
```

Example:

```
REACT_APP_BACKOFFICE=http://localhost:5101
```

### Run locally

To install:

```
yarn
```

To run:

```
yarn start
```

It will serve the project in `http://localhost:3000`

### Run with Docker

```
docker build -t issuer-app .
```

```
docker run -id -p 3000:3000 issuer-app:latest
```

Then go to `http://localhost:300` and will see the Credential Manager
