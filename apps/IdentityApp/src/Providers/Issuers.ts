export enum CredentialTypes {
  AUTO = 'AUTO',
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
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
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
    name: "Ilan's Credentials",
    endpoint: 'http://decadc45cd5b.ngrok.io',
    credentialsOffered: [
      {
        name: 'AUTO',
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
          declarativeDetails.DRIVERS_LICENSE,
        ],
      },
      {
        name: 'ID',
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
