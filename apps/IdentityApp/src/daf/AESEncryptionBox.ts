import { AbstractSecretBox } from 'daf-core';
import '../../shim.js'
import crypto from 'crypto'

export class AESEcryptionBox extends AbstractSecretBox {
  constructor(private secretKey: string) {
    super();
    if (!secretKey) {
      throw Error('Secret key is required');
    }
  }

  static async createSecretKey(): Promise<string> {
    return crypto.randomBytes(32).toString('hex')
  }

  // NOTE:
  // crypto.createCipher is deprecated, it suggests to use createCipheriv
  // This class uses the deprecated method because is the one supported by react-native-crypto: https://www.npmjs.com/package/react-native-crypto/v/2.2.0
  async encrypt(message: string): Promise<string> {
    const iv = crypto.randomBytes(12)
    const key = crypto.createCipher('aes-256-cbc', this.secretKey);
    let encrypted = key.update(message, 'utf8', 'hex')
    encrypted += key.final('hex');

    return encrypted
  }

  async decrypt(encryptedData: any): Promise<string> {
    const key = crypto.createDecipher('aes-256-gcm', this.secretKey);
    let decrypted = key.update(encryptedData, 'hex', 'utf8')
    decrypted += key.final('utf8');

    return decrypted
  }
}
