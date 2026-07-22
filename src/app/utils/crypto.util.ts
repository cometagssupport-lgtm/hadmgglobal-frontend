import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

export const encryptPayload = (data: any): string => {
  try {
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, environment.encryptionSecret).toString();
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
};

export const decryptPayload = (cipherText: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, environment.encryptionSecret);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Decryption resulted in empty string');
    }
    
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt payload');
  }
};
