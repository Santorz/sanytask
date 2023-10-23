// Parse SDK
// Import Parse minified version
// import Parse from 'parse/dist/parse.min.js';
import { PARSE_APPLICATION_ID } from './config';

interface LocalUserInterface {
  objectId: string;
}

export const isLocalUserPresentFunc = () => {
  if (typeof window !== 'undefined') {
    let user = localStorage.getItem(
      `Parse/${PARSE_APPLICATION_ID}/currentUser`
    );
    return user !== null && user !== undefined;
  }
};
export const getCurrentLocalUser: () => LocalUserInterface | null = () => {
  if (typeof window !== 'undefined') {
    let user = window.localStorage.getItem(
      `Parse/${PARSE_APPLICATION_ID}/currentUser`
    );
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
};
export const getSessionExpDate: () => string | null = () => {
  if (typeof window !== 'undefined') {
    let expDate = window.localStorage.getItem(`sessionExpDate`);
    if (expDate) {
      return JSON.parse(expDate);
    } else {
      return null;
    }
  }
};

export const setSessionExpMain: (date: string) => void = (date: string) => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('sessionExpDate')) {
      window.localStorage.setItem(
        'sessionExpDate',
        JSON.stringify(date.toString())
      );
    }
  }
};
