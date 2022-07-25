import axios from 'axios';
import DataVaultWebClient, { AuthManager, AsymmetricEncryptionManager } from '@rsksmart/ipfs-cpinner-client'
import { agentWithUserMnemonic, mnemonicStore, secretBox } from '../daf/dafSetup';
import { getAllEndpoints } from './Endpoints';
import { IAuthManager } from '@rsksmart/ipfs-cpinner-client-types';


export enum dataVaultKeys {
  CREDENTIALS = 'CREDENTIALS',
  DECLARATIVE_DETAILS = 'DECLARATIVE_DETAILS',
}

const address = "0x1884BdD2Cef75BcAe1f2FfB36F5c9505e74f4a35";
const privatekey = "29739248cad1bd1a0fc4d9b75cd4d2990de535baf5caadfdf8d8f86664aa830c";






const getPinner = async () => {

  const agent = await agentWithUserMnemonic();

  const personalSign = (data: any) => agent.handleAction({ type: 'sign.sdr.jwt', data });
  const getEncryptionPublicKey = async () => address;

  const decrypt = async (raw: string) => (await agent.handleMessage({ raw, save: false, metaData: [] })).raw!;

  const mnemonic = await mnemonicStore.get();

  const { did } = (await agent.identityManager.getIdentities())[0];
  const { dataVault } = await getAllEndpoints();
  const client = new DataVaultWebClient({
    serviceUrl: dataVault,
    authManager: new AuthManager({ did, serviceUrl: dataVault, personalSign }) as IAuthManager,
    encryptionManager: new AsymmetricEncryptionManager({ getEncryptionPublicKey, decrypt })
  });

  return client;
}



export const putInDataVault = (key: any, value: string) =>
  getPinner().then((pinner: DataVaultWebClient) => pinner.create({ key, content: value }));

export const getFromDataVault = (key: any) =>
  getPinner().then((pinner: DataVaultWebClient) => pinner.get(key));

export const deleteFromDataVault = (key: dataVaultKeys, cid: string) =>
  getPinner().then((pinner: DataVaultWebClient) => pinner.delete({ key, id: cid }));

export const findCredentialAndDelete = (raw: string) =>
  getFromDataVault(dataVaultKeys.CREDENTIALS)
    .then(credentials =>
      credentials.find(
        (cred) => JSON.parse(cred.content) === raw,
      ),
    )
    .then(credential => deleteFromDataVault(dataVaultKeys.CREDENTIALS, credential!.id));
