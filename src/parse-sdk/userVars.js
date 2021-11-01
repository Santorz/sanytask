// Parse SDK
// Import Parse minified version
// import Parse from 'parse/dist/parse.min.js';
import { PARSE_APPLICATION_ID } from '../parse-sdk/config';

export const isLocalUserPresentFunc = () => {
  let user = localStorage.getItem(`Parse/${PARSE_APPLICATION_ID}/currentUser`);
  return user !== null && user !== undefined;
};
export const getCurrentLocalUser = () => {
  let user = localStorage.getItem(`Parse/${PARSE_APPLICATION_ID}/currentUser`);
  if (user) {
    return Object(
      JSON.parse(
        localStorage.getItem(`Parse/${PARSE_APPLICATION_ID}/currentUser`)
      )
    );
  } else {
    return null;
  }
};
