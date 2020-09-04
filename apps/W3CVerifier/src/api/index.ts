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
  issuanceDate?: Date
  expirationDate?: Date
  issuer?: string
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
  const issuer = presentation.issuer

  let presentationIssuanceDate, presentationExpirationDate;
  if (presentation.verifiablePresentation.issuanceDate) {
    presentationIssuanceDate = new Date(presentation.verifiablePresentation.issuanceDate!)
  }
  if (presentation.verifiablePresentation.expirationDate) {
    presentationExpirationDate = new Date(presentation.verifiablePresentation.expirationDate)
  }
  
  const credentialDetails: CredentialDetails = {
    issuer: credential.issuer.id,
    subject: credential.credentialSubject.id,
    issuanceDate: new Date(credential.issuanceDate),
    expirationDate: credential.expirationDate ? new Date(credential.expirationDate) : undefined,
    credentialSubject: credential.credentialSubject
  }

  return {
    issuer,
    type,
    fullName,
    success,
    dateVerified,
    credentialDetails,
    vpJwt: credential['proof'].jwt,
    qrData,
    issuanceDate: presentationIssuanceDate,
    expirationDate: presentationExpirationDate
  }
}