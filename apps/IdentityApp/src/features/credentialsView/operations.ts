import { Dispatch } from 'redux';
import axios from 'axios';
import { keccak256 } from 'js-sha3';

import { CredentialTypes } from '../../Providers/Issuers';
import {
  getAllEndpoints,
  getEndpoint,
  defaults as endpointDefaults,
} from '../../Providers/Endpoints';
import { agent, dbConnection } from '../../daf/dafSetup';
import { AESSecretBox } from '../../daf/AESSecretBox';
import { serviceAuthenticationFactory } from '@rsksmart/rif-id-core/lib/operations/authentication';
import 'text-encoding-polyfill';
import {
  deleteCredentialFactory,
  receiveCredentialFactory,
} from '@rsksmart/rif-id-core/lib/operations/credentials';
import {
  deleteIssuedCredentialRequestFactory,
  setIssuedCredentialRequestStatusFactory,
} from '@rsksmart/rif-id-core/lib/operations/credentialRequests';
import { issueCredentialRequestFactory } from '@rsksmart/rif-id-core/lib/operations/credentialRequests';
import { IssuedCredentialRequest } from '@rsksmart/rif-id-core/lib/reducers/issuedCredentialRequests';
import { Callback } from '@rsksmart/rif-id-core/lib/operations/util';
import {
  dataVaultKeys,
  putInDataVault,
  findCredentialAndDelete,
} from '../../Providers/IPFSPinnerClient';
import { Credential as RifCredential } from '@rsksmart/rif-id-core/src/reducers/credentials';
import { findOneCredentialRequest } from '@rsksmart/rif-id-core/lib/entities/CredentialRequest';

/**
 * Remove an issued credential from the local database and the data vault
 * @param credential the credential that should be removed
 * @param callback function function called after deletion
 */
export const removeIssuedCredential = (
  credential: RifCredential,
  callback: Callback<RifCredential>,
) => (dispatch: Dispatch<any>) =>
  findCredentialAndDelete(credential.raw)
    .then(() => {
      const deleteCredential = deleteCredentialFactory(agent);
      dispatch(deleteCredential(credential.subject, credential.hash, callback));
    })
    .catch(err => console.log('DV error', err));

/**
 * Remove Requested Credential
 * @param request the credential request
 * @param callback function function called after deletion
 */
export const removeRequestedCredential = (
  request: IssuedCredentialRequest,
  callback: Callback<void>,
) => (dispatch: Dispatch<any>) => {
  const deleteCredentialRequest = deleteIssuedCredentialRequestFactory(agent);
  dispatch(deleteCredentialRequest(request.from, request.id, callback));
};

/**
 * Create Claims Data for the different credential types
 * @param metadata metadata from the app
 */
const createClaim = (metadata: any) => {
  const baseClaims = [
    { claimType: 'credentialRequest', claimValue: 'cred1', essential: true },
    { claimType: 'fullName', claimValue: metadata.fullName, essential: true },
    { claimType: 'type', claimValue: metadata.type, essential: true },
    { claimType: 'idNumber', claimValue: metadata.idNumber },
    { claimType: 'city', claimValue: metadata.city },
  ];

  let claims;
  switch (metadata.type) {
    case CredentialTypes.PARKING_PERMIT:
      claims = [
        ...baseClaims,
        { claimType: 'phone', claimValue: metadata.phone },
        { claimType: 'driversLicenseNumber', claimValue: metadata.driversLicenseNumber },
      ];
      break;
    case CredentialTypes.DRIVERS_LICENSE:
      claims = [
        ...baseClaims,
        { claimType: 'birthdate', claimValue: metadata.birthdate },
        { claimType: 'driversLicenseNumber', claimValue: metadata.driversLicenseNumber },
      ];
      break;
    case CredentialTypes.ID:
    default:
      claims = [
        ...baseClaims,
        { claimType: 'phone', claimValue: metadata.phone },
        { claimType: 'birthdate', claimValue: metadata.birthdate },
        { claimType: 'civilStatus', claimValue: metadata.civilStatus },
        { claimType: 'email', claimValue: metadata.email },
        { claimType: 'address', claimValue: metadata.address },
      ];
      break;
  }

  return claims;
};

/**
 * Helper function to get the serviceToken
 * @param url string URL of the service
 * @param serviceDid string DID of the service
 * @param userDid string DID of the user
 * @param callback Function callback function (err, res)
 */
const serviceAuthentication = serviceAuthenticationFactory(agent);
const getServiceToken = (
  url: string,
  serviceDid: string,
  userDid: string,
  callback: Callback<string>,
) => (dispatch: Dispatch<any>) =>
  dispatch(serviceAuthentication(url, serviceDid, userDid, callback));

/**
 * Sends a request to the Credential Server.
 * @param metaData metaData in the credential
 */
export const sendRequestToServer = (
  did: string,
  metadata: any,
  serviceToken: string | undefined,
  callback: Callback<any>,
) => (dispatch: Dispatch<any>) =>
  getAllEndpoints().then((settings: typeof endpointDefaults) => {
    const claims = createClaim(metadata);
    const issueCredentialRequest = issueCredentialRequestFactory(agent);

    const makeRequest = (err: Error | undefined, token: string) =>
      err
        ? callback(new Error(`Endpoint: ${err.message}`))
        : dispatch(
            issueCredentialRequest(
              did,
              settings.issuerDid,
              claims,
              'pending',
              {
                url: `${settings.issuer}/requestCredential`,
                headers: { authorization: token, 'Content-Type': 'text/plain' },
              },
              callback,
            ),
          );

    dispatch(getServiceToken(settings.issuer, settings.issuerDid, did, makeRequest));
  });

/**
 * Request Status of Credential from the server.
 * @param hash string DataVault hash to be requested.
 */
export const checkStatusOfCredential = (hash: string, serviceToken: string) =>
  getEndpoint('issuer').then(url =>
    axios
      .get(`${url}/receiveCredential/?hash=${hash}`, { headers: { Authorization: serviceToken } })
      .then((response: { data: string }) => response.data),
  );

/**
 * Helper function to get the hash of a request
 * @param id id of the credential request
 */
const getHashByRequestId = (id: string) =>
  dbConnection.then(connection =>
    findOneCredentialRequest(connection, id)
      .then(response => (keccak256(response.message.raw) as any).toString('hex'))
      .catch(err => console.log('hash error', err)),
  );

export const checkStatusOfRequestedCredentials = (
  did: string,
  requestedCredentials: IssuedCredentialRequest[],
  serviceToken: string | undefined,
) => (dispatch: Dispatch<any>) => {
  console.log('checking status', did, serviceToken);
  const setIssuedCredentialStatus = setIssuedCredentialRequestStatusFactory(agent);
  const deleteIssuedCredential = deleteIssuedCredentialRequestFactory(agent);
  const receiveCredentialRif = receiveCredentialFactory(agent);

  let promiseArray = <Promise<any>[]>[];

  const makeRequests = (err: Error | undefined, token: string) => {
    if (err) {
      throw err;
    }

    requestedCredentials.forEach(async (request: IssuedCredentialRequest) => {
      if (request.status === 'pending') {
        promiseArray.push(
          new Promise(resolve => {
            getHashByRequestId(request.id)
              .then(hash => {
                checkStatusOfCredential(hash, token)
                  .then((result: any) => {
                    switch (result.status) {
                      case 'DENIED':
                        resolve(dispatch(setIssuedCredentialStatus(did, request.id, 'DENIED')));
                        break;
                      case 'SUCCESS':
                        const callback = (err: Error, res: any) => {
                          if (err) {
                            throw err;
                          }
                          if (res) {
                            putInDataVault(
                              dataVaultKeys.CREDENTIALS,
                              res.payload.credential.raw,
                            ).then((ipfshash: string) => {
                              console.log('data vault success!', ipfshash);
                              resolve(ipfshash);
                            });
                          }
                        };
                        dispatch(receiveCredentialRif(result.payload.raw, callback));
                        dispatch(deleteIssuedCredential(did, request.id));
                        break;
                      default:
                        resolve();
                    }
                  })
                  .catch(err => console.log('check err', err));
              })
              .catch(err => {
                console.log('an error', err);
              });
          }),
        );
      }
    });
    return Promise.all(promiseArray);
  };

  return getAllEndpoints().then((settings: typeof endpointDefaults) =>
    dispatch(getServiceToken(settings.issuer, settings.issuerDid, did, makeRequests)),
  );
};

/**
 * Create presentation of a VC using the JWT and the identityManger in the agent.
 * @param jwt JWT of the credential to be presented
 * @param serviceToken token to access Convey service if available
 */
export const createPresentation = (jwt: string, serviceToken: string) => (
  dispatch: Dispatch<any>,
) => {
  return new Promise((resolve, reject) => {
    agent.identityManager.getIdentities().then(identities => {
      agent
        .handleAction({
          type: 'sign.w3c.vp.jwt',
          data: {
            issuer: identities[0].did,
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiablePresentation'],
            verifiableCredential: [jwt],
            nbf: Math.floor(new Date().getTime() / 1000),
            exp: Math.floor(new Date().getTime() / 1000) + 600,
          },
        })
        .then(sdrJwt => sdrJwt._raw)
        .then(jwt => dispatch(uploadPresentation(jwt, identities[0].did, serviceToken)))
        .then(uri => resolve(uri))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  });
};

const doUpload = (vpJwt: string, serviceToken: string, conveyUrl: string) =>
  AESSecretBox.createSecretKey().then(key => {
    const secretBox = new AESSecretBox(key);
    return secretBox
      .encrypt(vpJwt)
      .then((encrypted: string) =>
        axios.post(
          `${conveyUrl}/file`,
          { file: encrypted },
          { headers: { Authorization: serviceToken } },
        ),
      )
      .then(resp => `${resp.data.url}#${key}`);
  });

const uploadPresentation = (vpJwt: string, did: string, serviceToken: string) => (
  dispatch: Dispatch<any>,
) =>
  getAllEndpoints().then(
    (settings: typeof endpointDefaults) =>
      new Promise(resolve => {
        const callback = (_err: Error | null, token: string) =>
          resolve(doUpload(vpJwt, token!, settings.convey));

        serviceToken
          ? callback(null, serviceToken)
          : dispatch(getServiceToken(settings.convey, settings.conveyDid, did, callback));
      }),
  );
