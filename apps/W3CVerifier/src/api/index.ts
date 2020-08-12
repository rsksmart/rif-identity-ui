import { W3CCredential } from 'did-jwt-vc'

export const EXPECTED_ISSUER = 'did:ethr:0x16e3Df3c58E42dd92411E0b961e8d3e0C0238e5C'

export interface VerifiedPresentation {
  type?: 'driver-license' | 'parking-permit' 
  fullName?: string
  dateVerified: Date
  success: boolean
  failureReason?: string
  credentialDetails?: CredentialDetails
  vpJwt?: string
  qrData: string
}

export interface CredentialDetails {
  expirationDate: Date
  issuanceDate: Date
  issuer: string // TODO: Type it better
  subject: string // TODO: Type it better
  credentialSubject: any
}

export const mapFromPayload = (credential: W3CCredential, qrData: string): VerifiedPresentation => {
  const type = 'driver-license'
  const fullName = credential.credentialSubject['name']
  const success = true
  const dateVerified = new Date()

  const credentialDetails: CredentialDetails = {
    issuer: credential.issuer.id,
    subject: credential.credentialSubject.id,
    issuanceDate: new Date(credential.issuanceDate),
    expirationDate: new Date(credential.expirationDate!),
    credentialSubject: credential.credentialSubject
  }

  return {
    type,
    fullName,
    success,
    dateVerified,
    credentialDetails,
    vpJwt: credential['proof'].jwt,
    qrData,
  }
}