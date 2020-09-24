import { Dispatch } from 'redux';
import axios from 'axios';
import { keccak256 } from 'js-sha3';

// import { requestPresentation, receivePresentation } from './actions';
import { CredentialTypes } from '../../Providers/Issuers';
import { getEndpoint } from '../../Providers/Endpoints';
import { agent, dbConnection } from '../../daf/dafSetup';
import { AESSecretBox } from '../../daf/AESSecretBox';
import { serviceAuthenticationFactory } from 'je-id-core/lib/operations/authentication'
import 'text-encoding-polyfill'
import {
  deleteCredentialFactory,
  receiveCredentialFactory,
} from 'jesse-rif-id-core/lib/operations/credentials';
import {
  deleteIssuedCredentialRequestFactory,
  issueCredentialRequestFactory,
  setIssuedCredentialRequestStatusFactory,
} from 'jesse-rif-id-core/lib/operations/credentialRequests';
import { IssuedCredentialRequest } from 'jesse-rif-id-core/lib/reducers/issuedCredentialRequests';
import { Callback } from 'jesse-rif-id-core/lib/operations/util';
import {
  dataVaultKeys,
  putInDataVault,
  findCredentialAndDelete,
} from '../../Providers/IPFSPinnerClient';
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';
import { findOneCredentialRequest } from 'jesse-rif-id-core/lib/entities/CredentialRequest';

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
 * Sends a request to the Credential Server.
 * @param metaData metaData in the credential
 */
export const sendRequestToServer = (did: string, metadata: any, callback: Callback<any>) => async (
  dispatch: Dispatch<any>,
) =>
  getEndpoint('issuer').then((endpoint: string) => {
    const claims = createClaim(metadata);
    const issueCredentialRequest = issueCredentialRequestFactory(agent);
    dispatch(
      issueCredentialRequest(
        did,
        'did:ethr:rsk:testnet:0xdcbe93e98e0dcebe677c39a84f5f212b85ba7ef0',
        claims,
        'pending',
        endpoint + '/requestCredential',
        callback,
      ),
    );
  });

/**
 * Request Status of Credential from the server.
 * @param hash string DataVault hash to be requested.
 */
export const checkStatusOfCredential = (hash: string) =>
  getEndpoint('issuer').then(url =>
    axios
      .get(`${url}/receiveCredential/?hash=${hash}`)
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
) => (dispatch: Dispatch<any>) => {
  const setIssuedCredentialStatus = setIssuedCredentialRequestStatusFactory(agent);
  const deleteIssuedCredential = deleteIssuedCredentialRequestFactory(agent);
  const receiveCredentialRif = receiveCredentialFactory(agent);

  let promiseArray = <Promise<any>[]>[];

  requestedCredentials.forEach(async (request: IssuedCredentialRequest) => {
    if (request.status === 'pending') {
      promiseArray.push(
        new Promise(resolve => {
          getHashByRequestId(request.id)
            .then(hash => {
              checkStatusOfCredential(hash)
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

/**
 * Create presentation of a VC using the JWT and the identityManger in the agent.
 * @param jwt JWT of the credential to be presented
 */
export const createPresentation = (jwt: string, serviceToken: string) => async (dispatch: Dispatch) => {
  dispatch(requestPresentation());
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
      .then(jwt => uploadPresentation(jwt, serviceToken)(dispatch))
      .then(uri => dispatch(receivePresentation(uri)))
      .catch((err) => { console.log(err); dispatch(errorReceivePresentation()) })
  });
};

const validateCid = async (encrypted: string, actual: string) => {
  // TODO: should calculate the encrypted hash and compare it with the actual one. The must be equals
}

const doUpload = async (vpJwt: string, serviceToken: string, conveyUrl: string) => {
  const key = await AESSecretBox.createSecretKey()
  const secretBox = new AESSecretBox(key)
  const encrypted = await secretBox.encrypt(vpJwt)

  const resp = await axios.post(`${conveyUrl}/file`, { file: encrypted }, { headers: { 'Authorization': serviceToken }})

  // await validateCid(encrypted, resp.data.cid)

  return `${resp.data.url}#${key}`
}

const uploadPresentation = (vpJwt: string, serviceToken: string) => async (dispatch: Dispatch) => {
  const conveyUrl = await getEndpoint('convey')

  if (!serviceToken) {
    const conveyDid = await getEndpoint('conveyDid')
    const identities = await agent.identityManager.getIdentities()

    const doConveyServiceAuth = serviceAuthenticationFactory(agent)
    serviceToken = await doConveyServiceAuth(conveyUrl, conveyDid, identities[0].did)(dispatch)
  }

  return doUpload(vpJwt, serviceToken!, conveyUrl)
}
