import { VerifiedPresentation as W3CVerifiedPresentation } from 'did-jwt-vc'

export const EXPECTED_ISSUER = 'did:ethr:0x16e3Df3c58E42dd92411E0b961e8d3e0C0238e5C'

export interface VerifiedPresentation {
  type?: 'drivers_license' | 'parking_permit' 
  fullName?: string
  dateVerified: Date
  success: boolean
  failureReason?: string
  credentialDetails?: CredentialDetails
  vpJwt?: string
  qrData: string
  presentationIssuanceDate?: Date
  presentationExpirationDate?: Date
}

export interface CredentialDetails {
  expirationDate?: Date
  issuanceDate: Date
  issuer: string // TODO: Type it better
  subject: string // TODO: Type it better
  credentialSubject: any
}

export const mapFromPayload = (presentation: W3CVerifiedPresentation, qrData: string): VerifiedPresentation => {
  const credential = presentation.verifiablePresentation.verifiableCredential[0]
  const type = credential.credentialSubject['type']
  const fullName = credential.credentialSubject['fullName']
  const success = true
  const dateVerified = new Date()
  const presentationIssuanceDate = new Date(parseInt(presentation.verifiablePresentation.issuanceDate!) * 1000)
  const presentationExpirationDate = new Date(parseInt(presentation.verifiablePresentation.expirationDate!) * 1000)
  
  const credentialDetails: CredentialDetails = {
    issuer: credential.issuer.id,
    subject: credential.credentialSubject.id,
    issuanceDate: new Date(credential.issuanceDate),
    expirationDate: credential.expirationDate ? new Date(credential.expirationDate) : undefined,
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
    presentationIssuanceDate,
    presentationExpirationDate
  }
}