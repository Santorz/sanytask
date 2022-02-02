import { AES, enc } from 'crypto-js';
import { PARSE_APPLICATION_ID } from '../parse-sdk/config';
import { getCurrentLocalUser } from '../src/parse-sdk/userVars';

// <!-- To encrypt -->
export const encrypt = (text: string) => {
  const userID = getCurrentLocalUser().objectId;
  let b64 = AES.encrypt(text, `${PARSE_APPLICATION_ID}${userID}`).toString();
  return b64;
};

// <!-- To decrypt -->
export const decrypt = (data: string) => {
  const userID = getCurrentLocalUser().objectId;
  let decrypt = AES.decrypt(data, `${PARSE_APPLICATION_ID}${userID}`);
  let plain = decrypt.toString(enc.Utf8);
  return plain;
};
