import { ISSUER_ENDPOINT, ISSUER_NAME } from '@env';
export enum CredentialTypes {
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  PARKING_PERMIT = 'PARKING_PERMIT',
  ID = 'ID',
}

export enum declarativeDetails {
  FULL_NAME = 'FULL_NAME',
  ID_NUMBER = 'ID_NUMBER',
  BIRTHDATE = 'BIRTHDATE',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  ADDRESS = 'ADDRESS',
  CITY = 'CITY',
  CIVIL_STATUS = 'CIVIL_STATUS',
  DRIVERS_LICENSE_NUMBER = 'DRIVERS_LICENSE_NUMBER',
}

export interface credentialTypes {
  name: string;
  requirements: declarativeDetails[];
}

export interface serverInterface {
  name: string;
  endpoint: string;
  credentialsOffered?: credentialTypes[];
}

export const ISSUERS: serverInterface[] = [
  {
    name: ISSUER_NAME,
    endpoint: ISSUER_ENDPOINT,
    credentialsOffered: [
      {
        name: 'ID',
        requirements: [
          declarativeDetails.FULL_NAME,
          declarativeDetails.ID_NUMBER,
          declarativeDetails.BIRTHDATE,
          declarativeDetails.PHONE,
          declarativeDetails.EMAIL,
          declarativeDetails.ADDRESS,
          declarativeDetails.CITY,
          declarativeDetails.CIVIL_STATUS,
        ],
      },
      {
        name: 'PARKING_PERMIT',
        requirements: [
          declarativeDetails.FULL_NAME,
          declarativeDetails.ID_NUMBER,
          declarativeDetails.PHONE,
          declarativeDetails.CITY,
          declarativeDetails.DRIVERS_LICENSE_NUMBER,
        ],
      },
      {
        name: 'DRIVERS_LICENSE',
        requirements: [
          declarativeDetails.FULL_NAME,
          declarativeDetails.ID_NUMBER,
          declarativeDetails.BIRTHDATE,
          declarativeDetails.CITY,
        ],
      },
    ],
  },
];
