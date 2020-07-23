import { W3CCredential } from 'did-jwt-vc'

export interface VerifiedPresentation {
  type: 'driver-license' | 'parking-permit' 
  fullName: string
  dateVerified: Date
  success: boolean
  credentialDetails: DriverLicenseDetails | ParkingPermitDetails
  vpJwt: string
}

export interface BaseCredentialDetails {
  expirationDate: Date
  issuanceDate: Date
  issuer: string // TODO: Type it better
  subject: string // TODO: Type it better
  issuanceOffice: string
}

export interface DriverLicenseDetails extends BaseCredentialDetails {
  typeOfVehicle: string[]
  typeOfLicense: 'A1' | 'A2' | 'A3' | 'B1' | 'C1'
  international: boolean
  licenseNumber: string
  firstName: string
  lastName: string
}

export interface ParkingPermitDetails extends BaseCredentialDetails {
  
}

export const mapFromPayload = (credential: W3CCredential, vpJwt: string): VerifiedPresentation => {
  // TODO: Check that credential type
  
  const type = 'driver-license'
  const fullName = `${credential.credentialSubject['firstName']} ${credential.credentialSubject['lastName']}`
  const success = true
  const dateVerified = new Date()

  const credentialDetails: DriverLicenseDetails = {
    issuer: credential.issuer.id,
    subject: credential.credentialSubject.id,
    issuanceDate: new Date(credential.issuanceDate),
    expirationDate: new Date(credential.expirationDate!),
    issuanceOffice: credential.credentialSubject['issuanceOffice'],
    typeOfLicense: credential.credentialSubject['typeOfLicense'],
    typeOfVehicle: credential.credentialSubject['typeOfVehicle'],
    international: credential.credentialSubject['international'],
    licenseNumber: credential.credentialSubject['licenseNumber'],
    firstName: credential.credentialSubject['firstName'],
    lastName: credential.credentialSubject['lastName']
  }

  return {
    type,
    fullName,
    success,
    dateVerified,
    credentialDetails,
    vpJwt
  }
}