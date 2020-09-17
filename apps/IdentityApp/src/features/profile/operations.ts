import { Dispatch, AnyAction } from 'redux';
import { agent } from '../../daf/dafSetup';

import { setDeclarativeDetailsFactory } from 'jesse-rif-id-core/lib/operations/declarativeDetails';
import { Callback } from 'jesse-rif-id-core/lib/operations/util';
import { putInDataVault, dataVaultKeys } from '../../Providers/IPFSPinnerClient';

interface Detail {
  type: string;
  value: any;
}
export interface HolderAppDeclarativeDetailsInterface {
  fullName: Detail | undefined;
  birthdate: Detail | undefined;
  idNumber: Detail | undefined;
  driversLicenseNumber: Detail | undefined;
  civilStatus: Detail | undefined;
  address: Detail | undefined;
  city: Detail | undefined;
  phone: Detail | undefined;
  email: Detail | undefined;
}

/**
 * Saves Profile to LocalStorage
 * @param profile Profile to be saved
 */
export const saveProfile = (profile: any, callback: Callback<boolean>) => async (
  dispatch: Dispatch<AnyAction>,
) => {
  agent.identityManager
    .getIdentities()
    .then(identities => identities[0].did)
    .then((did: string) => {
      const detailBuilder = (value: string, type?: string) =>
        value === '' ? undefined : { type: type || 'string', value };

      const declarativeDetails: HolderAppDeclarativeDetailsInterface = {
        fullName: detailBuilder(profile.fullName),
        birthdate: detailBuilder(profile.birthdate, 'date'),
        idNumber: detailBuilder(profile.idNumber, 'number'),
        driversLicenseNumber: detailBuilder(profile.driversLicenseNumber, 'number'),
        civilStatus: detailBuilder(profile.civilStatus, 'string'),
        address: detailBuilder(profile.address),
        city: detailBuilder(profile.city),
        phone: detailBuilder(profile.phone),
        email: detailBuilder(profile.email),
      };

      putInDataVault(
        dataVaultKeys.DECLARATIVE_DETAILS,
        JSON.stringify(declarativeDetails),
      ).then(res => console.log(res));

      const setDeclarativeDetails = setDeclarativeDetailsFactory(agent);
      dispatch(setDeclarativeDetails(did, declarativeDetails, callback));
    });
};
