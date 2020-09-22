import axios from 'axios';
import {
  CentralizedIPFSPinnerClient,
  ICentralizedIPFSPinnerClient,
} from '@rsksmart/rif-cpinner-client/lib';
import { agent, secretBox } from '../daf/dafSetup';
import { getAllEndpoints } from './Endpoints';

export enum dataVaultKeys {
  CREDENTIALS = 'CREDENTIALS',
  DECLARATIVE_DETAILS = 'DECLARATIVE_DETAILS',
}

const getPinner = () => {
  return new Promise(resolve => {
    agent.identityManager.getIdentities().then(identities => {
      getAllEndpoints().then(endpoints => {
        resolve(
          new CentralizedIPFSPinnerClient({
            baseUrl: endpoints.dataVault,
            signer: {
              identity: identities[0].did,
              signJWT: data => agent.handleAction({ type: 'sign.sdr.jwt', data }),
              decodeJWT: raw => agent.handleMessage({ raw, save: false, metaData: [] }),
            },
            secretBox,
            ipfsGet: (cid: string) =>
              axios.get(endpoints.ipfs + '/' + cid).then(res => JSON.stringify(res.data)),
          }),
        );
      });
    });
  });
};

export const putInDataVault = (key: any, value: string) =>
  getPinner().then((pinner: ICentralizedIPFSPinnerClient) => pinner.put(key, value));

export const getFromDataVault = (key: any) =>
  getPinner().then((pinner: ICentralizedIPFSPinnerClient) => pinner.get(key));

export const deleteFromDataVault = (key: dataVaultKeys, cid: string) =>
  getPinner().then((pinner: ICentralizedIPFSPinnerClient) => pinner.delete(key, cid));

export const findCredentialAndDelete = (raw: string) =>
  getFromDataVault(dataVaultKeys.CREDENTIALS)
    .then(credentials =>
      credentials.find(
        (cred: { content: string; cid: string }) => JSON.parse(cred.content) === raw,
      ),
    )
    .then(credential => deleteFromDataVault(dataVaultKeys.CREDENTIALS, credential.cid));
