import { Injectable } from '@nestjs/common';
import cryptoJS = require('crypto-js');

@Injectable()
export class EncrypterService {
  encrypt(text: string) {
    return cryptoJS.AES.encrypt(text, `${process.env.PASSPHRASE}`).toString();
  }

  decrypt(ciphertext: string) {
    const bytes = cryptoJS.AES.decrypt(ciphertext, `${process.env.PASSPHRASE}`);
    const originalText = bytes.toString(cryptoJS.enc.Utf8);
    return originalText;
  }
}
