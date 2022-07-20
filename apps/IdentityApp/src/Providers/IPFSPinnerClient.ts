import axios from 'axios';
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { agent, secretBox } from '../daf/dafSetup';
import { getAllEndpoints } from './Endpoints';

export enum dataVaultKeys {
  CREDENTIALS = 'CREDENTIALS',
  DECLARATIVE_DETAILS = 'DECLARATIVE_DETAILS',
}



export const putInDataVault = (key: any, value: string) => {};

export const getFromDataVault = (key: any) => {};

export const deleteFromDataVault = (key: dataVaultKeys, cid: string) =>{};

export const findCredentialAndDelete = (raw: string) =>{};
