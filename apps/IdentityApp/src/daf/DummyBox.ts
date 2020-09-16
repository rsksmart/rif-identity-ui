import { AbstractSecretBox } from 'daf-core';

export class SecretBox extends AbstractSecretBox {
  constructor(private secretKey: string) {
    super();
    if (!secretKey) {
      throw Error('Secret key is required');
    }
  }

  async encrypt(message: string): Promise<string> {
    console.log('secretbox.encrypt', message);
    return new Promise(resolve => resolve(message));
  }

  async decrypt(encryptedMessageHex: string): Promise<string> {
    console.log('secretbox.decrypt', encryptedMessageHex);
    return new Promise(resolve => resolve(encryptedMessageHex));
  }
}
