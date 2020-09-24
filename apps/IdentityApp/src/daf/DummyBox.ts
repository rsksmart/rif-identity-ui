import { AbstractSecretBox } from 'daf-core';

export class SecretBox extends AbstractSecretBox {
  constructor(private secretKey: string) {
    super();
    if (!secretKey) {
      throw Error('Secret key is required');
    }
  }

  static async createSecretKey(): Promise<string> {
    return 'theSecret'
  }

  async encrypt(message: string): Promise<string> {
    return new Promise(resolve => resolve(message));
  }

  async decrypt(encryptedMessageHex: string): Promise<string> {
    return new Promise(resolve => resolve(encryptedMessageHex));
  }
}
