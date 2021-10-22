import CryptoJS from 'crypto-js';
import { PARSE_APPLICATION_ID } from '../parse-sdk/config';
import { getCurrentLocalUser } from '../parse-sdk/userVars';

// Vars
const userID = getCurrentLocalUser().objectId;

// <!-- To encrypt -->
export const encrypt = (text) => {
  let b64 = CryptoJS.AES.encrypt(
    text,
    `${PARSE_APPLICATION_ID}${userID}`
  ).toString();

  return b64;
};

// <!-- To decrypt -->
export const decrypt = (data) => {
  let decrypt = CryptoJS.AES.decrypt(data, `${PARSE_APPLICATION_ID}${userID}`);
  let plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
};
