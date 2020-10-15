export enum CredentialTypes {
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  PARKING_PERMIT = 'PARKING_PERMIT',
  ID = 'ID',
}

export enum declarativeDetails {
  FULL_NAME = 'fullName',
  ID_NUMBER = 'idNumber',
  BIRTHDATE = 'birthdate',
  PHONE = 'phone',
  EMAIL = 'email',
  ADDRESS = 'address',
  CITY = 'city',
  CIVIL_STATUS = 'civilStatus',
  DRIVERS_LICENSE_NUMBER = 'driversLicenseNumber',
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

// name and endpoint are not used, but are here to allow for multiple issuers
export const ISSUERS: serverInterface[] = [
  {
    name: 'Issuer',
    endpoint: 'Temp',
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
